import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {QuizEtudiant} from '../model/quiz-etudiant.model';
import {Reponse} from '../model/reponse.model';
import {HttpClient} from '@angular/common/http';
import {ReponseEtudiant} from '../model/reponse-etudiant.model';
import {Question} from '../model/question.model';
import {Quiz} from '../model/quiz.model';
import {Etudiant} from '../model/etudiant.model';
import {EtudiantClassRoom} from '../model/etudiant-class-room.model';
import {QuizClassRoom} from '../model/quiz-class-room.model';
import {ClassRoom} from '../model/class-room.model';
import {Section} from '../model/section.model';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class QuizEtudiantService {


    get result(): any {
        return this._result;
    }

    set result(value: any) {
        this._result = value;
    }

    get quizItems(): Array<Quiz> {
        if (this._quizItems == null) {
            this._quizItems = new Array<Quiz>();
        }
        return this._quizItems;
    }

    set quizItems(value: Array<Quiz>) {
        this._quizItems = value;
    }

    get section(): Section {
        if (this._section == null) {
            this._section = new Section();
        }
        return this._section;
    }

    set section(value: Section) {
        this._section = value;
    }

    get quizSelct(): Quiz {
        if (this._quizSelct == null) {
            this._quizSelct = new Quiz();
        }
        return this._quizSelct;
    }

    set quizSelct(value: Quiz) {
        this._quizSelct = value;
    }

    get quizView(): boolean {
        return this._quizView;
    }

    set quizView(value: boolean) {
        this._quizView = value;
    }

    get passerQuiz(): string {
        return this._passerQuiz;
    }

    set passerQuiz(value: string) {
        this._passerQuiz = value;
    }

    get correctAnswerView(): Array<Reponse> {
        if (this._correctAnswerView == null) {
            this._correctAnswerView = new Array<Reponse>();
        }
        return this._correctAnswerView;
    }

    set correctAnswerView(value: Array<Reponse>) {
        this._correctAnswerView = value;
    }

    get questionView(): Question {
        if (this._questionView == null) {
            this._questionView = new Question();
        }
        return this._questionView;
    }

    set questionView(value: Question) {
        this._questionView = value;
    }

    get reponsesView(): Array<Reponse> {
        if (this._reponsesView == null) {
            this._reponsesView = new Array<Reponse>();
        }
        return this._reponsesView;
    }

    set reponsesView(value: Array<Reponse>) {
        this._reponsesView = value;
    }

    get reponsesEtudiantView(): Array<ReponseEtudiant> {
        if (this._reponsesEtudiantView == null) {
            this._reponsesEtudiantView = new Array<ReponseEtudiant>();
        }
        return this._reponsesEtudiantView;
    }

    set reponsesEtudiantView(value: Array<ReponseEtudiant>) {
        this._reponsesEtudiantView = value;
    }

    get reponsesEtudiantList(): Array<ReponseEtudiant> {
        if (this._reponsesEtudiantList == null) {
            this._reponsesEtudiantList = new Array<ReponseEtudiant>();
        }
        return this._reponsesEtudiantList;
    }

    set reponsesEtudiantList(value: Array<ReponseEtudiant>) {
        this._reponsesEtudiantList = value;
    }

    get selectedQuizClassroom(): QuizClassRoom {
        if (this._selectedQuizClassroom == null) {
            this._selectedQuizClassroom = new QuizClassRoom();
        }
        return this._selectedQuizClassroom;
    }

    set selectedQuizClassroom(value: QuizClassRoom) {
        this._selectedQuizClassroom = value;
    }

    get selectedClassroom(): EtudiantClassRoom {
        if (this._selectedClassroom == null) {
            this._selectedClassroom = new EtudiantClassRoom();
        }
        return this._selectedClassroom;
    }

    set selectedClassroom(value: EtudiantClassRoom) {
        this._selectedClassroom = value;
    }

    get viewDialogQuiz(): boolean {
        return this._viewDialogQuiz;
    }

    set viewDialogQuiz(value: boolean) {
        this._viewDialogQuiz = value;
    }

    get quizsClassroom(): Array<QuizClassRoom> {
        if (this._quizsClassroom == null) {
            this._quizsClassroom = new Array<QuizClassRoom>();
        }
        return this._quizsClassroom;
    }

    set quizsClassroom(value: Array<QuizClassRoom>) {
        this._quizsClassroom = value;
    }

    get etudiantsClassroom(): Array<EtudiantClassRoom> {
        if (this._etudiantsClassroom == null) {
            this._etudiantsClassroom = new Array<EtudiantClassRoom>();
        }
        return this._etudiantsClassroom;
    }

    set etudiantsClassroom(value: Array<EtudiantClassRoom>) {
        this._etudiantsClassroom = value;
    }

    get quizEtudiantList(): QuizEtudiant {
        if (this._quizEtudiantList == null) {
            this._quizEtudiantList = new QuizEtudiant();
        }
        return this._quizEtudiantList;
    }

    set quizEtudiantList(value: QuizEtudiant) {
        this._quizEtudiantList = value;
    }

    get selectedQuiz(): Quiz {
        if (this._selectedQuiz == null) {
            this._selectedQuiz = new Quiz();
        }
        return this._selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this._selectedQuiz = value;
    }

    get reponsesEtudiant(): Array<ReponseEtudiant> {
        if (this._reponsesEtudiant == null) {
            this._reponsesEtudiant = new Array<ReponseEtudiant>();
        }
        return this._reponsesEtudiant;
    }

    set reponsesEtudiant(value: Array<ReponseEtudiant>) {
        this._reponsesEtudiant = value;
    }

    get myAnswer(): Reponse {
        if (this._myAnswer == null) {
            this._myAnswer = new Reponse();
        }
        return this._myAnswer;
    }

    set myAnswer(value: Reponse) {
        this._myAnswer = value;
    }

    get reponseEtudiant(): ReponseEtudiant {
        if (this._reponseEtudiant == null) {
            this._reponseEtudiant = new ReponseEtudiant();
        }
        return this._reponseEtudiant;
    }

    set reponseEtudiant(value: ReponseEtudiant) {
        this._reponseEtudiant = value;
    }

    get numCorrectAnswers(): number {
        return this._numCorrectAnswers;
    }

    set numCorrectAnswers(value: number) {
        this._numCorrectAnswers = value;
    }

    get correctAnswers(): Array<Reponse> {
        if (this._correctAnswers == null) {
            this._correctAnswers = new Array<Reponse>();
        }
        return this._correctAnswers;
    }

    set correctAnswers(value: Array<Reponse>) {
        this._correctAnswers = value;
    }

    get quizsEtudiant(): Array<QuizEtudiant> {
        if (this._quizsEtudiant == null) {
            this._quizsEtudiant = new Array<QuizEtudiant>();
        }
        return this._quizsEtudiant;
    }

    set quizsEtudiant(value: Array<QuizEtudiant>) {
        this._quizsEtudiant = value;
    }

    get quizEtudiant(): QuizEtudiant {
        if (this._quizEtudiant == null) {
            this._quizEtudiant = new QuizEtudiant();
        }
        return this._quizEtudiant;
    }

    set quizEtudiant(value: QuizEtudiant) {
        this._quizEtudiant = value;
    }

    get numQuestion(): number {
        return this._numQuestion;
    }

    set numQuestion(value: number) {
        this._numQuestion = value;
    }

    get numReponses(): number {
        return this._numReponses;
    }

    set numReponses(value: number) {
        this._numReponses = value;
    }

    get reponses(): Array<Reponse> {
        if (this._reponses == null) {
            this._reponses = new Array<Reponse>();
        }
        return this._reponses;
    }

    set reponses(value: Array<Reponse>) {
        this._reponses = value;
    }

    get items(): Array<Question> {
        if (this._items == null) {
            this._items = new Array<Question>();
        }
        return this._items;
    }

    set items(value: Array<Question>) {
        this._items = value;
    }

    get selected(): Question {
        if (this._selected == null) {
            this._selected = new Question();
        }
        return this._selected;
    }

    set selected(value: Question) {
        this._selected = value;
    }

    get etudiant(): Etudiant {
        if (this._etudiant == null) {
            this._etudiant = new Etudiant();
        }
        return this._etudiant;
    }

    set etudiant(value: Etudiant) {
        this._etudiant = value;
    }


    get quiz(): Quiz {
        if (this._quiz == null) {
            this._quiz = new Quiz();
        }
        return this._quiz;
    }

    set quiz(value: Quiz) {
        this._quiz = value;
    }

    constructor(private http: HttpClient) {
    }

    private adminUrl = environment.adminUrl;
    private profUrl = environment.profUrl;


    private _etudiant: Etudiant;
    private _quiz: Quiz;
    private _section: Section;
    private _quizSelct: Quiz;
    private _quizItems: Array<Quiz>;
    private _items: Array<Question> = new Array<Question>();
    private _selected: Question;
    private _reponses: Array<Reponse>;
    private _quizsEtudiant: Array<QuizEtudiant>;
    private _quizEtudiant: QuizEtudiant;
    private _correctAnswers: Array<Reponse>;
    private _reponseEtudiant: ReponseEtudiant;
    private _reponsesEtudiant: Array<ReponseEtudiant>;
    private _quizEtudiantList: QuizEtudiant;
    private _etudiantsClassroom: Array<EtudiantClassRoom>;
    private _quizsClassroom: Array<QuizClassRoom>;
    private _selectedQuizClassroom: QuizClassRoom;
    private _selectedClassroom: EtudiantClassRoom;
    private _reponsesEtudiantList: Array<ReponseEtudiant>;
    private _questionView: Question;
    private _reponsesView: Array<Reponse>;
    private _reponsesEtudiantView: Array<ReponseEtudiant>;
    private _correctAnswerView: Array<Reponse>;
    private _viewDialogQuiz: boolean;
    private _selectedQuiz: Quiz = new Quiz();
    private _myAnswer: Reponse;
    private _numReponses = 0;
    private _numCorrectAnswers = 0;
    private _numQuestion: number;
    private _passerQuiz: string;
    private _quizView: boolean;
    private _result: any;

    public urlStudent = environment.etudiantUrl;

    public findEtudiant(): Observable<Etudiant> {
        return this.http.get<Etudiant>(this.adminUrl + 'etudiant/ref/e1');
    }

    public findQuizByReference(ref: string): Observable<Quiz> {
        return this.http.get<Quiz>(this.adminUrl + 'quiz/ref/' + ref);
    }

    public findFirstQuestion(): Observable<Question> {
        return this.http.get<Question>(this.adminUrl + 'question/numero/1');
    }

    /////////////////////
    public findQuestion(quiz: string, numero: number): Observable<Question> {
        return this.http.get<Question>(this.adminUrl + 'question/quiz/ref/' + quiz + '/numero/' + numero);
    }

    public findAllQuestions(quiz: string): Observable<Array<Question>> {
        return this.http.get<Array<Question>>(this.adminUrl + 'question/quiz/ref/' + quiz);
    }

    public findReponses(question: number): Observable<Array<Reponse>> {
        return this.http.get<Array<Reponse>>(this.adminUrl + 'reponse/question/id/' + question);
    }

    public findCorrectAnswers(questionId: number): Observable<Array<Reponse>> {
        return this.http.get<Array<Reponse>>(this.adminUrl + 'reponse/criteria/id/' + questionId);
    }

    public findQuizBySection(id: number): Observable<Quiz> {
        return this.http.get<Quiz>(this.adminUrl + 'quiz/section/id/' + id);
    }

    public findQuizEtudiantByQuiz(ref: string): Observable<Array<QuizEtudiant>> {
        return this.http.get<Array<QuizEtudiant>>(this.adminUrl + 'quizEtudiant/quiz/ref/' + ref);
    }

    public findQuizEtudiantByQuizId(id: number): Observable<Array<QuizEtudiant>> {
        return this.http.get<Array<QuizEtudiant>>(this.adminUrl + 'quizEtudiant/quiz/id/' + id);
    }

    public deleteQuizEtudiant(quizEtudiant: QuizEtudiant): Observable<QuizEtudiant> {
        return this.http.delete<QuizEtudiant>(this.adminUrl + 'quizEtudiant/id/' + quizEtudiant.id);
    }

    public findMyAnswerEtudiant(quizEtudiant: QuizEtudiant, question: Question): Observable<Array<ReponseEtudiant>> {
        return this.http.get<Array<ReponseEtudiant>>(this.adminUrl + 'reponseEtudiant/creteria/quizEtudiant/id/' + quizEtudiant.id + '/question/id/' + question.id);
    }

///////////////////
    public findAllQuizEtudiant(): Observable<Array<QuizEtudiant>> {
        return this.http.get<Array<QuizEtudiant>>(this.adminUrl + 'quizEtudiant/');
    }

    public findFirstQuizEtudiant(): Observable<QuizEtudiant> {
        return this.http.get<QuizEtudiant>(this.adminUrl + 'quizEtudiant/ref/qe1');
    }

    public findQuizSection(section: Section): Observable<Quiz> {
        return this.http.get<Quiz>(this.adminUrl + 'quiz/section/id/' + section.id);
    }

    public insertQuizEtudiant(): Observable<QuizEtudiant> {
        return this.http.post<QuizEtudiant>(this.adminUrl + 'quizEtudiant/', this.quizEtudiant);
    }

    public insertReponseEtudiant(reponseEtudiant: ReponseEtudiant): Observable<ReponseEtudiant> {
        return this.http.post<ReponseEtudiant>(this.adminUrl + 'reponseEtudiant/', reponseEtudiant);
    }

    public findAllReponseEtudiant(): Observable<Array<ReponseEtudiant>> {
        return this.http.get<Array<ReponseEtudiant>>(this.adminUrl + 'reponseEtudiant/');
    }

    public findFirstReponseEtudiant(): Observable<ReponseEtudiant> {
        return this.http.get<ReponseEtudiant>(this.adminUrl + 'reponseEtudiant/ref/re1');
    }

    public findMyAnswer(id: number): Observable<Reponse> {
        return this.http.get<Reponse>(this.adminUrl + 'reponse/id/' + id);
    }

    public updateQuizEtudiant(): Observable<QuizEtudiant> {
        return this.http.put<QuizEtudiant>(this.adminUrl + 'quizEtudiant/', this.quizEtudiant);
    }

    public findEtudiantClassRoom(etudiant: Etudiant): Observable<Array<EtudiantClassRoom>> {
        return this.http.get<Array<EtudiantClassRoom>>(this.adminUrl + 'etudiant-classRoom/etudiant/ref/' + etudiant.ref);
    }

    public findQuizClassRoom(classroom: ClassRoom): Observable<Array<QuizClassRoom>> {
        return this.http.get<Array<QuizClassRoom>>(this.adminUrl + 'quiz-classRoom/id/' + classroom.id);
    }



    public findQuizEtudanitByEtudiantIdAndQuizId(etudiant: Etudiant, quiz: Quiz): Observable<QuizEtudiant> {
        return this.http.get<QuizEtudiant>(this.adminUrl + 'quizEtudiant/etudiant/idEtudiant/' + etudiant.id + '/quiz/idQuiz/' + quiz.id);
    }

    public findQuizEtudanitByEtudiantIdAndQuizRef(etudiant: Etudiant, quizRef: string): Observable<QuizEtudiant> {
        return this.http.get<QuizEtudiant>(this.adminUrl + 'quizEtudiant/etudiant/idEtudiant/' + etudiant.id + '/quiz/ref/' + quizRef);
    }

    public findReponseEtudiant(quizEtudiant: QuizEtudiant): Observable<Array<ReponseEtudiant>> {
        return this.http.get<Array<ReponseEtudiant>>(this.adminUrl + 'reponseEtudiant/quizEtudiant/ref/' + quizEtudiant.ref);
    }


    public findReponseEtudiantByQuizEtudiantId(quizEtudiant: QuizEtudiant): Observable<Array<ReponseEtudiant>> {
        return this.http.get<Array<ReponseEtudiant>>(this.profUrl + 'reponseEtudiant/quizEtudiant/id/' + quizEtudiant.id);
    }

    public findMyReponseEtudiant(quizEtudiant: QuizEtudiant, reponse: Reponse): Observable<ReponseEtudiant> {
        // tslint:disable-next-line:max-line-length
        return this.http.get<ReponseEtudiant>(this.adminUrl + 'reponseEtudiant/critere/quizEtudiant/{refQuizEtudiant}/reponse/{refReponse}?refQuizEtudiant=' + quizEtudiant.ref + '&refReponse=' + reponse.ref);
    }

    public findQuestionByNumero(numero: number): Observable<Question> {
        return this.http.get<Question>(this.adminUrl + 'question/numero/' + numero);
    }

    public findReponseByNumero(numero: number): Observable<Array<Reponse>> {
        return this.http.get<Array<Reponse>>(this.adminUrl + 'reponse/question/numero/' + numero);
    }

    public findReponseEtudiantByNumero(quizEtudiant: QuizEtudiant, numero: number): Observable<Array<ReponseEtudiant>> {
        // tslint:disable-next-line:max-line-length
        return this.http.get<Array<ReponseEtudiant>>(this.adminUrl + 'reponseEtudiant/creteria/quizEtudiant/' + quizEtudiant.ref + '/question/' + numero);
    }

    public findCorrectAnswersByNumero(numero: number): Observable<Array<Reponse>> {
        return this.http.get<Array<Reponse>>(this.adminUrl + 'reponse/criteria/numero/' + numero);
    }

    public findQuizBySectionId(section: Section): Observable<Quiz> {
        return this.http.get<Quiz>(this.adminUrl + 'quiz/section/id/' + section.id);
    }

    public findAllQuiz(): Observable<Array<Quiz>> {
        return this.http.get<Array<Quiz>>(this.adminUrl + 'quiz/');
    }

    public translate(word: string): Observable<any> {
        // @ts-ignore
        return this.http.get<string>(this.adminUrl + 'TranslateEnAr/text/' + word, {responseType: 'text'});
    }

    public translateEnFr(word: string): Observable<any> {
        // @ts-ignore
        return this.http.get<string>(this.adminUrl + 'TranslateEnAr/text/en-fr/' + word, {responseType: 'text'});
    }

    save(quizStudent: QuizEtudiant): Observable<QuizEtudiant> {
        return this.http.post<QuizEtudiant>(this.urlStudent + 'quizEtudiant/', quizStudent);
    }


    public findAllQuizByEtudiantId(id: number): Observable<Array<QuizEtudiant>> {
        return this.http.get<Array<QuizEtudiant>>(this.profUrl + 'quizEtudiant/etudiant/id/' + id);
    }
}
