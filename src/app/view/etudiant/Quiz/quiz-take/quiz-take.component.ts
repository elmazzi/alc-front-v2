import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {LoginService} from '../../../../controller/service/login.service';
import {Reponse} from '../../../../controller/model/reponse.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {Quiz} from '../../../../controller/model/quiz.model';
import {Question} from '../../../../controller/model/question.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {DictionaryService} from '../../../../controller/service/dictionary.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ReponseEtudiantService} from '../../../../controller/service/reponse-etudiant.service';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {QuizReponse} from '../../../../controller/model/quiz-reponse';
import {LearnService} from '../../../../controller/service/learn.service';
import {ChatMessageDto} from '../../../../controller/model/chatMessageDto';
import {Prof} from '../../../../controller/model/prof.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';

@Component({
    selector: 'app-quiz-take',
    templateUrl: './quiz-take.component.html',
    styleUrls: ['./quiz-take.component.scss']
})
export class QuizTakeComponent implements OnInit, OnDestroy
{

    constructor(private service: QuizEtudiantService,
                private learnService: LearnService,
                private reponseEtudiantService: ReponseEtudiantService,
                private login: LoginService,
                private messageService: MessageService,
                private router: Router,
                private dictionnaryService: DictionaryService,
                private sanitizer: DomSanitizer,
                private confirmationService: ConfirmationService,
                public webSocketService: WebSocketService) {
    }

    get questionOptions(): ({ label: string; value: string } | { label: string; value: string })[] {
        return this.learnService.questionOptions;
    }

    set questionOptions(value: ({ label: string; value: string } | { label: string; value: string })[]) {
        this.learnService.questionOptions = value;
    }

    get selectedT12Reponse(): Reponse {
        return this.learnService.selectedT12Reponse;
    }

    set selectedT12Reponse(value: Reponse) {
        this.learnService.selectedT12Reponse = value;
    }

    get dernierSelected(): Reponse {
        return this.learnService.dernierSelected;
    }

    set dernierSelected(value: Reponse) {
        this.learnService.dernierSelected = value;
    }

    get groupeEtudiant(): GroupeEtudiant {
        return this.webSocketService.groupeEtudiant;
    }


    get t12AnswersList(): Array<Reponse> {
        return this.learnService.t12AnswersList;
    }

    set t12AnswersList(value: Array<Reponse>) {
        this.learnService.t12AnswersList = value;
    }

    get correctAnswerT12(): Map<number, string> {
        return this.learnService.studenta_answersT12;
    }

    set correctAnswerT12(value: Map<number, string>) {
        this.learnService.studenta_answersT12 = value;
    }

    get showT12AnswerDiv(): boolean {
        return this.learnService.showT12AnswerDiv;
    }

    set showT12AnswerDiv(value: boolean) {
        this.learnService.showT12AnswerDiv = value;
    }

    get dragAnswersList(): Map<string, number> {
        return this.learnService.dragAnswersList;
    }

    get quizT12AnswersList(): Array<Reponse> {
        return this.learnService.quizT12AnswersList;
    }

    set quizT12AnswersList(value: Array<Reponse>) {
        this.learnService.quizT12AnswersList = value;
    }


    get answersT12List(): Map<number, string> {
        return this.learnService.answersT12List;
    }

    set answersT12List(value: Map<number, string>) {
        this.learnService.answersT12List = value;
    }

    get dragList(): Array<string> {
        return this.learnService.dragList;
    }

    set dragList(value: Array<string>) {
        this.learnService.dragList = value;
    }

    get dragIndex(): number {
        return this.learnService.dragIndex;
    }

    set dragIndex(value: number) {
        this.learnService.dragIndex = value;
    }

    get dragData(): string {
        return this.learnService.dragData;
    }

    set dragData(value: string) {
        this.learnService.dragData = value;
    }

    get nextIndex(): number {
        return this.learnService.nextIndex;
    }

    set nextIndex(value: number) {
        this.learnService.nextIndex = value;
    }


    get showTakeQuiz(): boolean {
        return this.learnService.showTakeQuiz;
    }

    set showTakeQuiz(value: boolean) {
        this.learnService.showTakeQuiz = value;
    }

    get showQuizReview(): boolean {
        return this.learnService.showQuizReview;
    }

    set showQuizReview(value: boolean) {
        this.learnService.showQuizReview = value;
    }


    get answerSelected(): Reponse {
        return this.learnService.answerSelected;
    }

    set answerSelected(value: Reponse) {
        this.learnService.answerSelected = value;
    }

    get inputAnswer(): string {
        return this.learnService.inputAnswer;
    }

    set inputAnswer(value: string) {
        this.learnService.inputAnswer = value;
    }

    get trueOrFalse(): boolean {
        return this.learnService.trueOrFalse;
    }

    set trueOrFalse(value: boolean) {
        this.learnService.trueOrFalse = value;
    }

    get disableToggleButton(): boolean {
        return this.learnService.disableToggleButton;
    }

    set disableToggleButton(value: boolean) {
        this.learnService.disableToggleButton = value;
    }


    get noteQuiz(): number {
        return this.learnService.noteQuiz;
    }


    // List of Question

    get questionList(): Array<Question> {
        return this.service.items;
    }


    get reponses(): Array<Reponse> {
        return this.service.reponses;
    }

    set reponses(value: Array<Reponse>) {
        this.service.reponses = value;
    }


    get answersList(): Map<Question, Reponse> {
        return this.learnService.answersList;
    }


    get correctAnswersList(): Map<number, Array<Reponse>> {
        return this.learnService.correctAnswersList;
    }

    set correctAnswersList(value: Map<number, Array<Reponse>>) {
        this.learnService.correctAnswersList = value;
    }

    get question(): Question {
        return this.learnService.question;
    }

    set question(value: Question) {
        this.learnService.question = value;
    }

    get questionSideLeft(): string {
        return this.learnService.questionSideLeft;
    }


    get questionSideRight(): string {
        return this.learnService.questionSideRight;
    }

    set questionSideRight(value: string) {
        this.learnService.questionSideRight = value;
    }

    get numberOfQuestion(): number {
        return this.learnService.numberOfQuestion;
    }


    get value(): number {
        return this.learnService.value;
    }

    set value(value: number) {
        this.learnService.value = value;
    }

    get index(): number {
        return this.learnService.index;
    }

    set index(value: number) {
        this.learnService.index = value;
    }

    get showCheckButton(): boolean {
        return this.learnService.showCheckButton;
    }

    set showCheckButton(value: boolean) {
        this.learnService.showCheckButton = value;
    }

    get saveDone(): boolean {
        return this.learnService.saveDone;
    }

    set saveDone(value: boolean) {
        this.learnService.saveDone = value;
    }

    get showDontKnowButton(): boolean {
        return this.learnService.showDontKnowButton;
    }

    set showDontKnowButton(value: boolean) {
        this.learnService.showDontKnowButton = value;
    }

    get showNextButton(): boolean {
        return this.learnService.showNextButton;
    }

    set showNextButton(value: boolean) {
        this.learnService.showNextButton = value;
    }

    get disableButtonSon(): boolean {
        return this.learnService.disableButtonSon;
    }

    get translateWord(): string {
        return this.learnService.translateWord;
    }

    get selectedQuiz(): Quiz {
        return this.service.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.service.selectedQuiz = value;
    }

    get answersPointStudent(): Map<Question, string> {
        return this.learnService.answersPointStudent;
    }

    set answersPointStudent(value: Map<Question, string>) {
        this.learnService.answersPointStudent = value;
    }


    get reponseQuiz(): QuizReponse {
        return this.webSocketService.reponseQuiz;
    }

    get prof(): Prof {
        return this.webSocketService.prof;
    }


    get participants(): Map<number, Array<Etudiant>> {
        return this.learnService.participants;
    }

    get grpStudentAnswers(): Map<Etudiant, QuizReponse> {
        return this.webSocketService.grpStudentAnswers;
    }

    set grpStudentAnswers(value: Map<Etudiant, QuizReponse>) {
        this.webSocketService.grpStudentAnswers = value;
    }


    ngOnInit(): void {
        console.log('-------------------------------------------------');
        console.log(this.trueOrFalse);

        this.learnService.onStart(this.selectedQuiz);
        this.trueOrFalse = null;
        this.grpStudentAnswers = new Map<Etudiant, QuizReponse>();
    }


    hidePlaceHolder(type: string) {
        if (type === 'HIDE') {
            this.inputAnswer = '';
            console.log(this.inputAnswer);
        } else {
            this.inputAnswer = this.question.libelle.substring(this.question.libelle.indexOf('@') + 1,
                this.question.libelle.lastIndexOf('@'));
            console.log(type + this.inputAnswer);
        }
    }


    ngOnDestroy(): void {
    }

    sound(question: Question) {
        this.learnService.sound(question);
    }

    answerIsCorrect(answerSelected: Reponse, question: Question) {
        return this.learnService.answerIsCorrect(answerSelected, question);
    }

    saveAnswers(question: Question) {
        let reponse: Reponse;
        if (!this.webSocketService.isInSession) {
            if (question.typeDeQuestion.ref === 't12') {
                this.dernierSelected = new Reponse();
                document.getElementById('showCheckButtonForT12').style.visibility = 'hidden';
                reponse = this.learnService.checkT12Answer(question);
            } else {
                reponse = this.learnService.saveAnswers(question, 'STUDENT_ANSWER');
            }
        } else {
            if (question.typeDeQuestion.ref === 't12') {
                this.dernierSelected = new Reponse();
                document.getElementById('showCheckButtonForT12').style.visibility = 'hidden';
                reponse = this.learnService.checkT12Answer(question);
            } else {
                reponse = this.learnService.saveAnswers(question, 'STUDENT_ANSWER');
            }
            this.reponseQuiz.lib = reponse.lib;
            this.reponseQuiz.etatReponse = reponse.etatReponse;
            this.reponseQuiz.id = reponse.id;
            this.reponseQuiz.question = reponse.question;
            this.reponseQuiz.numero = reponse.numero;
            this.reponseQuiz.type = 'QUIZ';
            this.reponseQuiz.sender = 'STUDENT';
            this.reponseQuiz.student = this.login.getConnectedStudent();
            this.reponseQuiz.etatReponse = reponse.etatReponse;
            const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedStudent().toString(), '', true);
            chatMessageDto.quizReponse = this.reponseQuiz;
            chatMessageDto.prof = this.prof;
            chatMessageDto.type = 'QUIZ';
            this.webSocketService.sendMessage(chatMessageDto, 'STUDENT');
        }

    }

    showAnswers(question: Question) {
        let reponse: Reponse;
        if (question.typeDeQuestion.ref === 't12') {
            this.dernierSelected = new Reponse();
            reponse = this.t12AnswersList.filter(t => t.etatReponse === 'true')[0];
        } else {
            reponse = this.learnService.showAnswers(question);
        }
        if (this.webSocketService.isInSession) {
            this.reponseQuiz.lib = reponse.lib;
            this.reponseQuiz.id = reponse.id;
            this.reponseQuiz.question = reponse.question;
            this.reponseQuiz.numero = reponse.numero;
            this.reponseQuiz.type = 'QUIZ';
            this.reponseQuiz.sender = 'STUDENT_DONT_KNOW';
            this.reponseQuiz.student = this.login.getConnectedStudent();
            this.reponseQuiz.etatReponse = reponse.etatReponse;
            const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedStudent().toString(), '', true);
            chatMessageDto.quizReponse = this.reponseQuiz;
            chatMessageDto.type = 'QUIZ';
            this.webSocketService.sendMessage(chatMessageDto, 'STUDENT');
        }
    }

    nextQuestionFct() {
        this.correctAnswerT12 = new Map<number, string>();
        this.showT12AnswerDiv = false;
        const question = this.learnService.nextQuestionFct();

        if (this.groupeEtudiant?.groupeEtude?.nombreEtudiant === 1) {
            this.followMeFct(question);
        }
    }


    followMeFct(question: Question) {
        const reponseQuiz: QuizReponse = new QuizReponse();
        for (let i = 0; i < this.questionList.length; i++) {
            if (this.questionList[i].id === question.id) {
                reponseQuiz.question = this.questionList[i - 1];
            }
        }
        if (this.webSocketService.isInSession) {
            reponseQuiz.type = 'FOLLOW-QUIZ';
            reponseQuiz.student = this.login.getConnectedStudent();
            const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedStudent().toString(), ' ', false);
            chatMessageDto.quizReponse = reponseQuiz;
            chatMessageDto.type = 'FOLLOW-QUIZ';
            this.webSocketService.sendMessage(chatMessageDto, 'PROF');
        }
    }

    finishQuiz() {
        this.learnService.finishQuiz();
    }


    onClick(reponse: Reponse) {
        if (this.webSocketService.isInSession) {
            if (this.groupeEtudiant.groupeEtude.nombreEtudiant === 1) {
                this.reponseQuiz.lib = reponse.lib;
                this.reponseQuiz.id = reponse.id;
                this.reponseQuiz.question = reponse.question;
                this.reponseQuiz.numero = reponse.numero;
                this.reponseQuiz.type = 'QUIZ';
                this.reponseQuiz.sender = 'STUDENT_CHOICE_T12';
                this.reponseQuiz.student = this.login.getConnectedStudent();
                this.reponseQuiz.etatReponse = reponse.etatReponse;
                const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedStudent().id.toString(),
                    'STUDENT_CHOICE_T12', true);
                chatMessageDto.quizReponse = this.reponseQuiz;
                chatMessageDto.type = 'QUIZ';
                this.webSocketService.sendMessage(chatMessageDto, 'STUDENT');
            } else {
                const chatMessageDto: ChatMessageDto = new ChatMessageDto(reponse.numero.toString(),
                    'STUDENT_CHOICE_T12', true);
                chatMessageDto.type = 'QUIZ';
                chatMessageDto.prof = this.prof;
                this.webSocketService.sendMessage(chatMessageDto, 'STUDENT');
            }
        } else {
            this.learnService.onClickT12(reponse);
        }
    }

    getCorrectAnswerForT12(): string {
        for (const item of this.t12AnswersList) {
            if (item.etatReponse === 'true') {
                return item.lib;
            }
        }
    }

    valueOf(numero: number): number {
        return ((numero / this.questionList.length) * 100);
    }


    //  -------------------------------------- DRAG AND DROP-------------------------------------


    get listOfWords(): Array<string> {
        return this.learnService.listOfWords;
    }

    set listOfWords(value: Array<string>) {
        this.learnService.listOfWords = value;
    }

    get listOfText(): Map<number, string> {
        return this.learnService.listOfText;
    }

    set listOfText(value: Map<number, string>) {
        this.learnService.listOfText = value;
    }

    get dragAndDropData(): string {
        return this.learnService.dragAndDropData;
    }

    set dragAndDropData(value: string) {
        this.learnService.dragAndDropData = value;
    }

    get dragAndDropCorrectAnswersList(): Map<number, string> {
        return this.learnService.dragAndDropCorrectAnswersList;
    }

    set dragAndDropCorrectAnswersList(value: Map<number, string>) {
        this.learnService.dragAndDropCorrectAnswersList = value;
    }

    drag(ev) {
        this.learnService.drag(ev);

    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drop(ev) {
        console.log(ev.target);
        const data = this.dragAndDropData;
        const chatMessage: ChatMessageDto = new ChatMessageDto('T13', 'QUESTION_T13', true);
        chatMessage.prof = this.prof;
        chatMessage.type = 'QUIZ';
        chatMessage.ev = ev.target.id;
        chatMessage.student = this.login.getConnectedStudent();
        chatMessage.quizReponse.question = this.question;
        chatMessage.quizReponse.type = 'T13';
        chatMessage.quizReponse.lib = data;
        if (this.webSocketService.isInSession) {
            console.log('WEB');
            this.webSocketService.sendMessage(chatMessage, 'STUDENT');
            if (this.groupeEtudiant?.groupeEtude?.nombreEtudiant > 1) {
                this.learnService.dropSynch(ev.target.id);
            }
        } else {
            console.log('SANS WEB');
            this.learnService.dropSynch(ev.target.id);
        }
    }

    getCorrectAnswerForT13(key: number): string {
        return this.dragAndDropCorrectAnswersList.get(key);
    }

    showToolTipsT13(key: number) {
        document.getElementById('toolTipT13' + key.toString()).style.visibility = 'visible';
    }

    hideTooltipsT13(key: number) {
        document.getElementById('toolTipT13' + key.toString()).style.visibility = 'hidden';
    }
}
