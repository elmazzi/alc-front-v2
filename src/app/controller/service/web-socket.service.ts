import {Injectable} from '@angular/core';
import {ChatMessageDto} from '../model/chatMessageDto';
import {EtudiantService} from './etudiant.service';
import {Etudiant} from '../model/etudiant.model';
import {LoginService} from './login.service';
import {ProfService} from './prof.service';
import {Prof} from '../model/prof.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

import {User} from '../model/user.model';
import {SimulateSectionService} from './simulate-section.service';
import {AuthenticationService} from './authentication.service';
import {ParcoursService} from './parcours.service';
import {Section} from '../model/section.model';
import {Cours} from '../model/cours.model';
import {Router} from '@angular/router';
import {QuizReponse} from '../model/quiz-reponse';
import {LearnService} from './learn.service';
import {Question} from '../model/question.model';
import {GroupeEtudiant} from '../model/groupe-etudiant.model';
import {GroupeEtudiantService} from './groupe-etudiant-service';
import {MessageService} from 'primeng/api';
import {ScheduleProf} from '../model/calendrier-prof.model';
import {Reponse} from '../model/reponse.model';
import {Role} from '../../enum/role.enum';
import {VocabularyService} from './vocabulary.service';
import {ReponseEtudiantHomeWork} from '../model/reponse-etudiant-home-work.model';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    publicUrl = environment.publicUrl;
    private _prof: Prof = new Prof();
    private _studentsEnLigne: Map<number, User> = new Map<number, User>();
    private socketUrl = environment.socketUrl;
    private baseUrl = environment.baseUrl;
    private profUrl = environment.profUrl;
    private synchronizationUrl = 'synchronization';
    index = 0;
    webSocket: WebSocket;
    chatMessages: ChatMessageDto[] = [];
    private _connectedUsers: any[] = [];
    actionType: Array<string> = new Array<string>();
    students: Etudiant[];
    idprof: number;
    public isInSession = false;
    public sessionHasStarted = false;
    private _selectedSession: ScheduleProf = new ScheduleProf();
    private _groupeEtudiant: GroupeEtudiant = new GroupeEtudiant();
    private _grpStudentAnswers: Map<Etudiant, QuizReponse> = new Map<Etudiant, QuizReponse>();
    private _selectedSchedule: ScheduleProf = new ScheduleProf();
    private _tabViewActiveIndex = 0;
    private numerOft12Qst = -1;
    private _activeIndexForTabView: number;
    private _reponseHomeWorkReviewComponent: ReponseEtudiantHomeWork = new ReponseEtudiantHomeWork(); // used in sync between teacher and student in HomeWorkReviewComponent
    private _lessonStarted: boolean;
    private _minute = 59;
    private _seconde = 59;

    constructor(private serviceetudiant: EtudiantService,
                private authService: AuthenticationService,
                private http: HttpClient,
                private loginservice: LoginService, public serviceprof: ProfService,
                private simulatesectionService: SimulateSectionService,
                private parcoursService: ParcoursService,
                private messageService: MessageService,
                private router: Router,
                private vocabularyService: VocabularyService,
                private groupeEtudiantService: GroupeEtudiantService,
                private learnService: LearnService
    ) {
    }


    get minute(): number {
        return this._minute;
    }

    set minute(value: number) {
        this._minute = value;
    }

    get seconde(): number {
        return this._seconde;
    }

    set seconde(value: number) {
        this._seconde = value;
    }

    get lessonStarted(): boolean {
        return this._lessonStarted;
    }

    set lessonStarted(value: boolean) {
        this._lessonStarted = value;
    }

    get selectedSession(): ScheduleProf {
        return this._selectedSession;
    }

    set selectedSession(value: ScheduleProf) {
        this._selectedSession = value;
    }

    get reponseHomeWorkReviewComponent(): ReponseEtudiantHomeWork {
        return this._reponseHomeWorkReviewComponent;
    }

    set reponseHomeWorkReviewComponent(value: ReponseEtudiantHomeWork) {
        this._reponseHomeWorkReviewComponent = value;
    }

    get activeIndexForTabView(): number {
        return this._activeIndexForTabView;
    }

    set activeIndexForTabView(value: number) {
        this._activeIndexForTabView = value;
    }

    get badgeNrMsg(): number {
        return this.learnService.badgeNrMsg;
    }

    set badgeNrMsg(value: number) {
        this.learnService.badgeNrMsg = value;
    }

    get tabViewActiveIndex(): number {
        return this._tabViewActiveIndex;
    }

    set tabViewActiveIndex(value: number) {
        this._tabViewActiveIndex = value;
    }

    get selectedSchedule(): ScheduleProf {
        return this._selectedSchedule;
    }

    set selectedSchedule(value: ScheduleProf) {
        this._selectedSchedule = value;
    }

    get groupeEtudiant(): GroupeEtudiant {
        return this._groupeEtudiant;
    }

    set groupeEtudiant(value: GroupeEtudiant) {
        this._groupeEtudiant = value;
    }

    get grpStudentAnswers(): Map<Etudiant, QuizReponse> {
        return this._grpStudentAnswers;
    }

    set grpStudentAnswers(value: Map<Etudiant, QuizReponse>) {
        this._grpStudentAnswers = value;
    }

    get studentsEnLigne(): Map<number, User> {
        return this._studentsEnLigne;
    }

    set studentsEnLigne(value: Map<number, User>) {
        this._studentsEnLigne = value;
    }

    get prof(): Prof {
        return this._prof;
    }

    set prof(value: Prof) {
        this._prof = value;
    }

    get reponseQuiz(): QuizReponse {
        return this.learnService.reponseQuiz;
    }

    set reponseQuiz(value: QuizReponse) {
        this.learnService.reponseQuiz = value;
    }


    get participants(): Map<number, Array<Etudiant>> {
        return this.learnService.participants;
    }

    set participants(value: Map<number, Array<Etudiant>>) {
        this.learnService.participants = value;
    }


    get question(): Question {
        return this.learnService.question;
    }

    set question(value: Question) {
        this.learnService.question = value;
    }

    public closeWebSocket(chatMessageDto: ChatMessageDto) {
        this.chatMessages = [];
        if (this.webSocket.readyState === this.webSocket.OPEN) {
            this.webSocket.send(JSON.stringify(chatMessageDto));
        }
        this.isInSession = false;
        this.webSocket.close();
    }

    set dragAndDropData(value: string) {
        this.learnService.dragAndDropData = value;
    }

    public openWebSocket(user: User, prof: Prof, grpEtudiant: GroupeEtudiant, sender: string) {
        this.webSocket = new WebSocket(this.socketUrl);
        this.webSocket.onopen = (event) => {
            console.log('--------------------OPENED-----------------------');
            this.onOpen(prof, grpEtudiant, sender, user);
        };
        this.webSocket.onerror = (event) => {
        };
        this.webSocket.onmessage = (event) => {
            if (this.connectedUsers.filter(d => d.id === this.loginservice.getConnecteUser().id)?.length > 0 ||
                this.loginservice.getConnecteUser().id === prof.id) {
                this.onMessage(event);
            }
        };
        this.webSocket.onclose = (event) => {
            console.log('--------------------CLOSE-----------------------');
            console.log(event.reason);
            if (this.isInSession) {
                if (this.loginservice.getConnectedStudent().role === 'TEACHER') {
                    this.openWebSocket(this.loginservice.getConnectedProf(), this.loginservice.getConnectedProf(),
                        this.groupeEtudiant, 'PROF');
                } else {
                    this.openWebSocket(this.loginservice.getConnectedStudent(), this.groupeEtudiant.prof,
                        this.groupeEtudiant, 'STUDENT');
                }
            }
        };
    }

    private onOpen(prof: Prof, grpEtudiant: GroupeEtudiant, sender: string, user: User) {
        this.isInSession = true;
        this.prof = prof;
        this.groupeEtudiant = grpEtudiant;
        if (sender === 'PROF') {
            this.participants.set(prof.id, this.connectedUsers);
            if (this.studentsEnLigne.get(prof.id) === undefined) {
                this.studentsEnLigne.set(prof.id, prof);
            }
        } else {
            if (this.connectedUsers.filter(s => s.id === user.id).length === 0) {
                this.connectedUsers.push({...user});
            }
            this.participants.set(prof.id, this.connectedUsers);
            if (this.studentsEnLigne.get(prof.id) === undefined) {
                this.studentsEnLigne.set(prof.id, prof);
            }
            const chatMessage: ChatMessageDto = new ChatMessageDto(user.nom, 'join session', true);
            chatMessage.prof = prof;
            chatMessage.student = user;
            chatMessage.type = 'CONNECT';
            chatMessage.quizReponse = null;
            chatMessage.ev = null;
            chatMessage.dateSent = null;
            console.log(chatMessage);
            console.log(this.webSocket.readyState);
            if (this.webSocket.readyState === this.webSocket.OPEN) {
                this.webSocket.send(JSON.stringify(chatMessage));
            } else {
                console.log('OPEN ' + this.webSocket.OPEN);
                console.log('CLOSED ' + this.webSocket.CLOSED);
                console.log('CONNECTING ' + this.webSocket.CONNECTING);
                console.log('CLOSING ' + this.webSocket.CLOSING);
            }
        }
    }

    private onMessage(event: MessageEvent<any>) {
        const data: ChatMessageDto = JSON.parse(event.data);
        if (data.type === 'message') {
            if (this.chatMessages.filter(c =>
                c.user === data.user &&
                c.message === data.message &&
                c.dateSent === data.dateSent).length === 0) {
                this.chatMessages.push({...data});
                if (this.loginservice.getConnecteUser().role === Role.PROF) {
                    if (this.activeIndexForTabView === 2) { // chat Prof
                        this.badgeNrMsg = 0;
                    } else {
                        this.badgeNrMsg = this.chatMessages.length;
                        this.notificationMessageSound();
                    }
                } else {
                    if (this.tabViewActiveIndex === 3) { // chat student
                        this.badgeNrMsg = 0;
                    } else {
                        this.badgeNrMsg = this.chatMessages.length;
                        this.notificationMessageSound();
                    }
                }
            }
        } else if (data.type === 'SECTION') {
            if (data?.user === 'SUMMARY' && data?.message === 'SUMMARY') {
                this.simulatesectionService.goToSummary();
            } else if (data?.user === 'FINISHLESSON' && data?.message === 'FINISHLESSON') {
                this.simulatesectionService.finishLesson();
            } else {
                this.grpStudentAnswers = new Map<Etudiant, QuizReponse>();
                const sectionId = Number(data.message);
                this.simulatesectionService.nextSection(sectionId, data?.user);
            }

        } else if (data.type === 'FOLLOW-QUIZ') {
            this.reponseQuiz = data.quizReponse;
            this.question = this.reponseQuiz?.question;
            this.learnService.nextQuestionFct();
            if (this.question.typeDeQuestion.ref === 't5') {
                document.getElementById('trueFalse').className = 'p-grid trueOrFalseQst';
            }
        } else if (data.type === 'QUIZ') {
            if (this.groupeEtudiant?.groupeEtude?.nombreEtudiant === 1 ||
                data.quizReponse.sender === 'PROF' || data.isStudent === false) {
                this.reponseQuiz = data.quizReponse;
                console.log(this.reponseQuiz);
                if (this.reponseQuiz?.question?.typeDeQuestion?.ref === 't5') {
                    this.trueOrFalse = this.reponseQuiz.lib !== 'false';
                } else if (this.reponseQuiz?.question?.typeDeQuestion?.ref === 't12') {
                    let reponse: Reponse = new Reponse();
                    reponse.lib = this.reponseQuiz.lib;
                    reponse.etatReponse = this.reponseQuiz.etatReponse;
                    reponse.id = this.reponseQuiz.id;
                    reponse.question = this.reponseQuiz.question;
                    reponse.numero = this.reponseQuiz.numero;

                    if (data.message === 'STUDENT_CHOICE_T12' && this.reponseQuiz.sender === 'STUDENT_CHOICE_T12') {
                        this.showCheckButton = this.learnService.onClickT12(reponse);
                    } else {
                        this.learnService.checkT12Answer(reponse.question);
                    }
                } else if (this.reponseQuiz?.question?.typeDeQuestion?.ref === 't13' && data.user === 'T13') {
                    console.log('T13QST');
                    this.dragAndDropData = data.quizReponse.lib;
                    this.learnService.dropSynch(Number(data.ev));
                }
                if (data?.message !== 'QUESTION_T13') {
                    if (this.reponseQuiz.sender === 'PROF') {
                        this.learnService.saveAnswers(this.question, 'TEACHER_ANSWER');
                    } else if (this.reponseQuiz.sender === 'STUDENT') {
                        this.learnService.saveAnswers(this.question, 'STUDENT_ANSWER');
                    } else if (this.reponseQuiz.sender === 'STUDENT_DONT_KNOW') {
                        this.learnService.saveAnswers(this.question, 'STUDENT_DONT_KNOW');
                    }
                }
            } else {
                if (data.message === 'STUDENT_CHOICE_T12') {
                    this.reponseQuiz = data.quizReponse;
                    if (data.quizReponse.sender === 'STUDENT_CHOICE_T12_FOR_GRP') {
                        const reponse: Reponse = new Reponse();
                        reponse.lib = this.reponseQuiz.lib;
                        reponse.etatReponse = this.reponseQuiz.etatReponse;
                        reponse.id = this.reponseQuiz.id;
                        reponse.question = this.reponseQuiz.question;
                        reponse.numero = this.reponseQuiz.numero;
                        this.numerOft12Qst = reponse.numero;
                        this.showCheckButton = this.learnService.onClickT12(reponse);
                    } else if (Number(data.user) > this.numerOft12Qst) {
                        this.numerOft12Qst = Number(data.user);
                        if (data.prof.id === this.loginservice.getConnectedProf().id) {
                            let reponse: Reponse = new Reponse();
                            for (const rep of this.quizT12AnswersList.filter(t => t.numero === Number(data.user))) {
                                if (rep.etatReponse === 'true') {
                                    reponse = rep;
                                }
                            }
                            this.learnService.onClickT12(reponse);
                        }
                    }
                } else {
                    const rpsQuiz = data.quizReponse;
                    // @ts-ignore
                    this.grpStudentAnswers.set(data.student, rpsQuiz);
                }
            }
        } else if (data.user === 'FINISH_QUIZ' && data.type === 'FINISH_QUIZ') {
            if (data.prof.id === this.prof.id) {
                this.learnService.finishQuiz();
            }
        } else if (data?.type === 'CONNECT') {
            const mydata: ChatMessageDto = JSON.parse(event.data);
            const studentList = this.participants.get(this.prof.id);
            for (const student of studentList) {
                if (student.id === mydata.student.id) {
                    if (this.studentsEnLigne.get(student.id) === undefined) {
                        this.studentsEnLigne.set(student.id, student);
                        this.messageService.add({
                            severity: 'success',
                            life: 3000,
                            detail: data?.student?.nom + ' join the classroom'
                        });
                    }
                }
            }
        } else if (data?.type === 'DISCONNECT') {
            if (this.studentsEnLigne.get(data?.student?.id) !== undefined) {
                this.studentsEnLigne.delete(data?.student?.id);
                this.messageService.add({
                    severity: 'warn',
                    life: 4000,
                    detail: data?.student?.nom + ' is out of the classroom'
                });
            }
        } else if (data.type === 'VOC') {
            if (data?.user === 'VOC_FLIP' && data?.message === 'VOC_FLIP') {
                this.vocabularyService.flip();
            } else if (data?.user === 'VOC_NEXT' && data?.message === 'VOC_NEXT') {
                this.vocabularyService.nextItem();
            } else if (data?.user === 'VOC_FINISH' && data?.message === 'VOC_FINISH') {
                this.vocabularyService.endShow();
            }

        } else if (data.type === 'HOME_WORK_REVIEW_NOTES') {
            this.reponseHomeWorkReviewComponent.profNote = data.message;
        } else if (data?.type === 'START_LESSON') {
            this.startLesson();
        }
    }

    get quizT12AnswersList(): Array<Reponse> {
        return this.learnService.quizT12AnswersList;
    }

    get trueOrFalse(): boolean {
        return this.learnService.trueOrFalse;
    }

    set trueOrFalse(value: boolean) {
        this.learnService.trueOrFalse = value;
    }

    get showCheckButton(): boolean {
        return this.learnService.showCheckButton;
    }

    set showCheckButton(value: boolean) {
        this.learnService.showCheckButton = value;
    }

    public sendMessage(chatMessageDto: ChatMessageDto, sender: string) {
        if (this.webSocket.readyState === this.webSocket.OPEN) {
            if (chatMessageDto.type === 'message') {
                this.webSocket.send(JSON.stringify((chatMessageDto)));
            } else if (chatMessageDto?.type === 'START_LESSON') {
                chatMessageDto.quizReponse = null;
                chatMessageDto.dateSent = null;
                chatMessageDto.ev = null;
                this.webSocket.send(JSON.stringify((chatMessageDto)));
            } else {
                chatMessageDto.quizReponse.question.quiz = null;
                chatMessageDto.quizReponse.question.reponses = null;
                const myData = JSON.stringify((chatMessageDto));
                console.log(chatMessageDto);
                console.log(this.webSocket.readyState);
                this.webSocket.send(myData);
            }
        } else {
            console.log(chatMessageDto);
            if (chatMessageDto.type !== 'message') {
                chatMessageDto.quizReponse.question.quiz = null;
                chatMessageDto.quizReponse.question.reponses = null;
            }
            if (sender === 'PROF') {
                this.openWebSocket(this.loginservice.getConnectedProf(), this.loginservice.getConnectedProf(),
                    this.groupeEtudiant, 'PROF');
                this.webSocket.onopen = (event) => {
                    console.log(chatMessageDto);
                    this.webSocket.send(JSON.stringify(chatMessageDto));
                };
            } else {
                this.openWebSocket(this.loginservice.getConnectedStudent(), this.groupeEtudiant.prof,
                    this.groupeEtudiant, 'STUDENT');
                this.webSocket.onopen = (event) => {
                    if (this.webSocket.readyState === this.webSocket.OPEN) {
                        this.webSocket.send(JSON.stringify(chatMessageDto));
                    }
                };
            }
        }
    }


    public findstudentlist(idprof: number): Etudiant[] {
        this.serviceetudiant.findetudiantProf1(idprof).subscribe(
            data => {
                console.log(data);
                this.students = data;
            }, error => {
            }
        );
        this.idprof = idprof;
        return this.students;
    }

    public savechat(prof: Prof) {
        this.serviceprof.savechatmsgs(prof).subscribe(
            data => {
            }, error => {
            }
        );
    }


    public findbynumero(num: number) {
        this.serviceprof.findbyid(num).subscribe(
            data => {
                // this.loginservice.etudiant.prof.chatMessageDto = data.chatMessageDto;
                // this.loginservice.prof = data;
            },
            error => {
            }
        );
    }

    get selectedsection(): Section {
        return this.parcoursService.selectedsection;
    }

    public saveCurrentSection(id: number, section: Section) {
        this.http.post<number>(this.profUrl + this.synchronizationUrl + '/id/' + id, section).subscribe(
            data => {
                if (data > 0) {
                } else {
                }
            }, error => {
            }
        );
    }

    public updateCurrentSection(id: number, section: Section) {
        this.http.post<number>(this.profUrl + this.synchronizationUrl + '/update/' + id, section).subscribe(
            data => {
                if (data > 0) {
                } else {
                }
            }, error => {
                console.log('problem while updating current section');
            }
        );
    }

    public deleteWhenSessionIsfiniched(id: number) {
        this.http.get<number>(this.profUrl + this.synchronizationUrl + '/remove/' + id).subscribe(
            data => {
                if (data > 0) {
                    console.log('CurrentSection removed');
                } else {
                    console.log('section not removed');
                }
            }, error => {
                console.log('problem while removing current section');
            }
        );
    }

    public findCurrentSectionForstudent(cours: Cours, prof: Prof) {
        this.http.get<Section>(this.profUrl + this.synchronizationUrl + '/id/' + prof.id).subscribe(
            async data => {
                if (data !== null) {
                    this.parcoursService.selectedsection = data;
                    this.simulatesectionService.findSectionOneByOne(cours);
                    this.simulatesectionService.goToSection(this.parcoursService.selectedsection.categorieSection.libelle);
                } else {
                    console.log('section not found');
                }
            }, error => {
                console.log('problem while searching for current section');
            }
        );
    }


    get connectedUsers(): any[] {
        if (this._connectedUsers == null) {
            this._connectedUsers = [];
        }
        return this._connectedUsers;
    }

    set connectedUsers(value: any[]) {
        this._connectedUsers = value;
    }


    private groupeEtudiantForThisStudent(prof: Prof): boolean {
        const studentList = this.participants.get(prof.id);
        for (const student of studentList) {
            if (student.id === this.loginservice.getConnecteUser().id) {
                return true;
            }
        }
        return false;
    }

    notificationMessageSound() {
        const audio = new Audio();
        audio.src = './assets/Notification/message-pop-alert.mp3';
        audio.load();
        audio.play();
    }

    private startLesson() {
        this.lessonStarted = true;
        setInterval(() => {
            this.seconde -= 1;
            if (this.seconde === 0) {
                this.minute -= 1;
                this.seconde = 60;
            }
        }, 1000);
    }
}
