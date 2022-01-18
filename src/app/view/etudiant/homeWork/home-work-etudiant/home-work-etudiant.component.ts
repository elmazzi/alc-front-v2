import {Component, OnInit} from '@angular/core';
import {HomeWOrkEtudiant} from '../../../../controller/model/home-work-etudiant.model';
import {HomeWorkEtudiantServiceService} from '../../../../controller/service/home-work-etudiant-service.service';
import {ReponseEtudiantHomeWork} from '../../../../controller/model/reponse-etudiant-home-work.model';
import {HomeWork} from '../../../../controller/model/home-work.model';
import {HomeWorkQST} from '../../../../controller/model/home-work-qst.model';
import {HoweWorkQSTReponse} from '../../../../controller/model/howe-work-qstreponse.model';
import {Dictionary} from '../../../../controller/model/dictionary.model';
import {Reponse} from '../../../../controller/model/reponse.model';
import {MenuItem, TreeNode} from 'primeng/api';
import {DictionaryService} from '../../../../controller/service/dictionary.service';
import {Section} from '../../../../controller/model/section.model';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {HomeworkService} from '../../../../controller/service/homework.service';
import {HomeWorkReponse} from '../../../../controller/model/home-work-reponse.model';
import {newArray} from '@angular/compiler/src/util';
import {LoginService} from '../../../../controller/service/login.service';
import {Router, RouterModule} from '@angular/router';
import {Quiz} from "../../../../controller/model/quiz.model";
import {Etudiant} from "../../../../controller/model/etudiant.model";
import {QuizEtudiant} from "../../../../controller/model/quiz-etudiant.model";
import {Cours} from "../../../../controller/model/cours.model";
import {SectionItemService} from "../../../../controller/service/section-item.service";

@Component({
    selector: 'app-home-work-etudiant',
    templateUrl: './home-work-etudiant.component.html',
    styleUrls: ['./home-work-etudiant.component.scss']
})
export class HomeWorkEtudiantComponent implements OnInit {

    textSeleted: string;

    synonym: any[];
    value = 0;

    wordDict: any;
    selectedsection = new Section();
    hasprevious = false;
    private etudiantreponseList = new Array<ReponseEtudiantHomeWork>();

    constructor(private sectionItemService: SectionItemService, private router: Router, private loginservice: LoginService, private homeworkservice: HomeworkService, private quizService: QuizEtudiantService, private parcoursservice: ParcoursService, private homeworkEtudiantservice: HomeWorkEtudiantServiceService, private dictionnaryService: DictionaryService) {
    }

    private selectedValue: number;
    private _selectedValueCheckbox: Array<Reponse>;
    private _type: string;
    private _button: string;
    private _radio: string;
    private _checkbox: string;
    private _noteQst: number;
    private _noteQuiz: number;
    private _noteCheckbox: number;
    private _numeroCheckBox: number;
    private _numeroQuestion: number;
    question1 = '';
    question2 = '';
    debutBlink = 0;
    finBlink = 0;
    debutPlaceholder = 0;
    finPlaceholder = 0;
    answer = '_____';
    trueorFalse = false;
    answerCorrect = '';
    isSelected: boolean;
    correctMistakeAnswer: string;
    private _disable: boolean;
    myAnswerCorrectMistake: string;
    trueAnswerCorrectMistake: string;
    image: string;
    ref: string;
    private _myanswers = new Array<string>();
    private _correctanswers: Array<string>;
    private _questionanswers: Array<string>;
    private _numberofword: Array<string>;
    word = '';
    correctMistakeNumber: number;
    j: number;
    k: number;
    private _answerCorrectOrFalse: Array<boolean>;
    isChecked: boolean;
    next: boolean;
    translate: string;
    question = '';
    wordDictionnary: string;
    filteredDict: any[];
    nodes: TreeNode[];
    menu: MenuItem[];
    resultat: string;
    on_off: boolean;
    totalNote = 0;
    placeholderTypeInput: string;
    reponseInput: string;
    disableInput = true;
    input_true_false = true;
    string_input = '';
    son = '';
    disable = false;
    numberofword: any;
    public i: number;
    hasNext = false;
    disableToggleButton = false;
    showCheckButton = false;
    questionSideLeft: string;
    questionSideRight: string;
    answerSelected: string;
    inputAnswer: string;

    substractQuestionT4(){
        this.questionSideLeft = this.homeWorkQuestion.libelle.substring(0, this.homeWorkQuestion.libelle.indexOf('@'));
        this.questionSideRight = this.homeWorkQuestion.libelle.substring(this.homeWorkQuestion.libelle.lastIndexOf('@') + 1);
        this.inputAnswer = this.homeWorkQuestion.libelle.substring(this.homeWorkQuestion.libelle.indexOf('@') + 1,
            this.homeWorkQuestion.libelle.lastIndexOf('@'));
    }
    ngOnInit(): void {
        this.correctanswers = new Array<HomeWorkReponse>();
        this.homeworkEtudiantservice.result = 0;
        console.log(this.homeWorkList);
        this.findbyetudiantIdAndHomeWorkID();
        console.log(this.homeworkEtudiantservice.isUpdate);
        console.log(this.homeWorkEtudiant);
        this.homeworkEtudiantservice.findQuestions().subscribe(
            data => {
                if (data.length > 1) {
                    this.hasNext = true;
                }
                this.homeWork.questions = data;
                this.homeWorkQuestion = data[0];
                this.i = 0;
                if (this.homeWorkQuestion.typeDeQuestion.ref =='t4'){
                    this.substractQuestionT4();
                }
                const correctreponseforqst = this.findReponseByQuestion(this.homeWorkQuestion.id);
                    for (let _j = 0 ; _j < correctreponseforqst.length; _j++){
                        if (correctreponseforqst[_j].etatReponse === 'true'){
                            this.correctanswers.push(correctreponseforqst[_j]);
                        }
                    }
            }
        );
        this.selectedsection = this.sectionStandard[0];
        this.menu = [
            {
                icon: 'pi pi-list', command: (event) => {
                    this.parcoursservice.affichelistSection().subscribe(
                        data => {
                            this.itemssection2 = data;
                            // tslint:disable-next-line:no-shadowed-variable
                        });
                    document.getElementById('word').style.visibility = 'hidden';
                    document.getElementById('homeWork').style.visibility = 'hidden';
                    document.getElementById('word').style.height = '0px';

                    document.getElementById('categoriess').style.visibility = 'visible';

                    document.getElementById('categoriess').style.width = '100%';
                    document.getElementById('categoriess').style.height = '100%';
                    document.getElementById('categ').style.height = '100%';
                    document.getElementById('chat').style.visibility = 'hidden';
                }
            }, {
                icon: 'pi pi-fw pi-comments', command: (event) => {
                    document.getElementById('categoriess').style.visibility = 'hidden';
                    document.getElementById('homeWork').style.visibility = 'hidden';
                    document.getElementById('categoriess').style.height = '0px';
                    document.getElementById('word').style.visibility = 'hidden';
                    document.getElementById('word').style.height = '0px';
                    document.getElementById('chat').style.visibility = 'visible';
                }
            },
            {
                icon: 'pi pi-book', style: {width: '50%'}, command: (event) => {
                    this.dictionnaryService.FindAllWord().subscribe(
                        data => {
                            this.itemsDict = data;
                        });
                    document.getElementById('categoriess').style.visibility = 'hidden';
                    document.getElementById('homeWork').style.visibility = 'hidden';
                    document.getElementById('categoriess').style.height = '0px';
                    document.getElementById('word').style.visibility = 'visible';
                    document.getElementById('word').style.width = '100%';
                    document.getElementById('word').style.height = '100%';
                    document.getElementById('wrd').style.height = '100%';
                    document.getElementById('chat').style.visibility = 'hidden';
                }
            }, {
                icon: 'pi pi-sliders-h', style: {width: '50%'}, command: (event) => {
                    this.dictionnaryService.FindAllWord().subscribe(
                        data => {
                            this.itemsDict = data;
                        });
                    document.getElementById('categoriess').style.visibility = 'hidden';
                    document.getElementById('categoriess').style.height = '0px';
                    document.getElementById('homeWork').style.visibility = 'visible';
                    document.getElementById('chat').style.visibility = 'hidden';
                    document.getElementById('word').style.visibility = 'hidden';
                }
            },
        ];
    }

    get sectionStandard(): Array<Section> {
        return this.parcoursservice.sectionStandard;
    }

    set sectionStandard(value: Array<Section>) {
        this.parcoursservice.sectionStandard = value;
    }

    get sectionAdditional(): Array<Section> {
        return this.parcoursservice.sectionAdditional;
    }

    set sectionAdditional(value: Array<Section>) {
        this.parcoursservice.sectionAdditional = value;
    }

    get correctanswers(): Array<HomeWorkReponse> {
        return this.homeworkservice.correctAnswers;
    }

    set correctanswers(value: Array<HomeWorkReponse>) {
        this.homeworkservice.correctAnswers = value;
    }

    get homeWorkList(): Array<HomeWork> {
        return this.homeworkservice.homeWorkList;
    }

    set homeWorkList(value: Array<HomeWork>) {
        this.homeworkservice.homeWorkList = value;
    }

    get listSynonymes(): Array<any> {
        return this.dictionnaryService.listSynonymes;
    }

    set listSynonymes(value: Array<any>) {
        this.dictionnaryService.listSynonymes = value;
    }

    get Synonymes(): Array<any> {
        return this.dictionnaryService.Synonymes;
    }

    set Synonymes(value: Array<any>) {
        this.dictionnaryService.Synonymes = value;
    }

    get homeWorkQstReponses(): Array<HoweWorkQSTReponse> {
        return this.homeworkEtudiantservice.homeWorkQstReponses;
    }

    set homeWorkQstReponses(value) {
        this.homeworkEtudiantservice.homeWorkQstReponses = value;
    }

    get section(): Section {
        return this.quizService.section;
    }

    set section(value: Section) {
        this.quizService.section = value;
    }

    get homeWorkQuestion(): HomeWorkQST {
        return this.homeworkEtudiantservice.homeWorkQuestion;
    }

    set homeWorkQuestion(value: HomeWorkQST) {
        this.homeworkEtudiantservice.homeWorkQuestion = value;
    }

    get homeWorkEtudiant(): HomeWOrkEtudiant {
        return this.homeworkEtudiantservice.homeWorkEtudiant;
    }

    set homeWorkEtudiant(value: HomeWOrkEtudiant) {
        this.homeworkEtudiantservice.homeWorkEtudiant = value;
    }

    get HomeWorkEtudiantReponse(): ReponseEtudiantHomeWork {
        return this.homeworkEtudiantservice.HomeWorkEtudiantReponse;
    }

    set HomeWorkEtudiantReponse(value: ReponseEtudiantHomeWork) {
        this.homeworkEtudiantservice.HomeWorkEtudiantReponse = value;
    }

    get homeWork(): HomeWork {
        return this.homeworkEtudiantservice.homeWork;
    }

    set homeWork(value: HomeWork) {
        this.homeworkEtudiantservice.homeWork = value;
    }

    get etudiantReponse(): HoweWorkQSTReponse {
        return this.homeworkEtudiantservice.etudiantReponse;
    }

    set etudiantReponse(val) {
        this.homeworkEtudiantservice.etudiantReponse = val;
    }

    get selectedDict(): Dictionary {
        return this.dictionnaryService.selectedDict;
    }

    set selectedDict(value: Dictionary) {
        this.dictionnaryService.selectedDict = value;
    }

    get itemsDict(): Array<Dictionary> {
        return this.dictionnaryService.itemsDict;
    }

    set itemsDict(value: Array<Dictionary>) {
        this.dictionnaryService.itemsDict = value;
    }

    get submittedDict(): boolean {
        return this.dictionnaryService.submittedDict;
    }

    set submittedDict(value: boolean) {
        this.dictionnaryService.submittedDict = value;
    }

    get createDialogDict(): boolean {
        return this.dictionnaryService.createDialogDict;
    }

    set createDialogDict(value: boolean) {
        this.dictionnaryService.createDialogDict = value;
    }

    get submittedDictEdit(): boolean {
        return this.dictionnaryService.submittedDictEdit;
    }

    set submittedDictEdit(value: boolean) {
        this.dictionnaryService.submittedDictEdit = value;
    }

    get TranslateSynonymeDialog(): boolean {
        return this.dictionnaryService.TranslateSynonymeDialog;
    }

    set TranslateSynonymeDialog(value: boolean) {
        this.dictionnaryService.TranslateSynonymeDialog = value;
    }

    get editDialogDict(): boolean {
        return this.dictionnaryService.editDialogDict;
    }

    set editDialogDict(value: boolean) {
        this.dictionnaryService.editDialogDict = value;
    }

    set itemssection2(value: Array<Section>) {
        this.parcoursservice.itemssection2 = value;
    }

    get itemssection2(): Array<Section> {
        return this.parcoursservice.itemssection2;
    }

    get selectedDictionnary(): Dictionary {
        return this.dictionnaryService.selected;
    }

    set selectedDictionnary(value: Dictionary) {
        this.dictionnaryService.selected = value;
    }
    get selectedQuiz(): Quiz {
        return this.quizService.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.quizService.selectedQuiz = value;
    }

    get etudiant(): Etudiant {
        return this.loginservice.etudiant;
    }



    get quizEtudiantList(): QuizEtudiant {
        return this.quizService.quizEtudiantList;
    }

    set quizEtudiantList(value: QuizEtudiant) {
        this.quizService.quizEtudiantList = value;
    }

    get passerQuiz(): string {
        return this.quizService.passerQuiz;
    }

    set passerQuiz(value: string) {
        this.quizService.passerQuiz = value;
    }

    get quizView(): boolean {
        return this.quizService.quizView;
    }

    set quizView(value: boolean) {
        this.quizService.quizView = value;
    }

    get selectedcours(): Cours {
        return this.parcoursservice.selectedcours;
    }

    set selectedcours(value: Cours) {
        this.parcoursservice.selectedcours = value;
    }
    get showVocabulary(): boolean {
        return this.sectionItemService.showVocabulary;
    }

    set showVocabulary(value: boolean) {
        this.sectionItemService.showVocabulary = value;
    }
    sendhomeWork(homeWork: HomeWork) {
        this.homeworkEtudiantservice.result = 0;
        this.correctanswers = new Array<HomeWorkReponse>();
        this.hasNext = false;
        this.hasprevious = false;
        console.log(homeWork);
        this.homeWork = homeWork;
        this.homeworkEtudiantservice.findQuestions().subscribe(
            data => {
                if (data.length > 1) {
                    this.hasNext = true;
                }
                this.homeWork.questions = data;
                this.homeWorkQuestion = data[0];
                this.disable = false;
                this.etudiantReponse = new HoweWorkQSTReponse();

                this.findReponseByQuestion(this.homeWorkQuestion.id);

                document.getElementById('myAnswer').style.visibility = 'hidden';
            }
        );

        this.findbyetudiantIdAndHomeWorkID();
        //  this.homeWorkEtudiantService.homeWorkQuestion = ;
    }

    public save() {
        console.log('hani f save');
        this.homeworkEtudiantservice.save().subscribe(
            data => {
            }
        );
    }

    public findReponseByQuestion(id: number): Array<HomeWorkReponse>{
        this.homeworkEtudiantservice.findReponsesByQuestionId(id).subscribe(
            data => {
                this.homeWorkQstReponses = data;
            }
        );
        return this.homeWorkQstReponses;
    }
    Vocab(section: Section) {
        this.sectionItemService.sectionSelected = section;

        this.sectionItemService.getSectionItems().subscribe(data => {
            this.sectionItemService.sectionSelected.sectionItems = data;
            console.log(data);
            this.showVocabulary = true;
        });

    }
    public Section(libelle: string) {
        this.parcoursservice.afficheSection(libelle).subscribe(
            data => {
                this.selectedsection = data;
                if (data.categorieSection.libelle === 'Vocabulary') {
                    this.Vocab(data);
                } else {
                    this.showVocabulary = false;
                }
                this.quizService.findQuizBySectionId(this.selectedsection).subscribe(
                    // tslint:disable-next-line:no-shadowed-variable
                    data => {
                        this.selectedQuiz = data;
                        this.quizService.findQuizEtudanitByEtudiantIdAndQuizId(this.loginservice.etudiant, this.selectedQuiz).subscribe(
                            // tslint:disable-next-line:no-shadowed-variable
                            data => {
                                this.quizEtudiantList = data;
                                console.log(this.quizEtudiantList);
                                this.quizService.findAllQuestions(this.selectedQuiz.ref).subscribe(
                                    dataQuestions => {
                                        if (data.questionCurrent > dataQuestions.length) {
                                            this.passerQuiz = 'View Quiz';
                                            this.quizView = true;
                                        } else {
                                            this.passerQuiz = 'Continue Quiz';
                                            this.quizView = false;
                                        }
                                    }
                                );
                            }, error => {
                                this.passerQuiz = 'Take Quiz';
                                this.quizView = false;
                            }
                        );
                    },
                );
                this.router.navigate(['etudiant/etudiant-simulate-sections']);
            }, error => console.log('erreeeeeeeeeeeeeeeeur'));
    }

    public dictEdit(dict: Dictionary) {
        this.selectedDictionnary = dict;
        if (this.selectedDictionnary.word != null) {
            this.submittedDictEdit = false;
            this.editDialogDict = true;
        }
    }

    public findbyetudiantIdAndHomeWorkID() {
        return this.homeworkEtudiantservice.findbyetudiantIdAndHomeWorkID().subscribe(
            data => {
                this.homeworkEtudiantservice.isUpdate = true;
                this.homeWorkEtudiant = data;
            }
        );
    }

    findquestion(quetions: any) {
        this.homeWorkQuestion = quetions;
        this.etudiantReponse = new HoweWorkQSTReponse();
        this.disable = false;
        document.getElementById('myAnswer').style.visibility = 'hidden';
    }

    public findByWord() {
        this.dictionnaryService.FindByWord(this.wordDictionnary).subscribe(
            data => {
                this.selectedDict = data;
                //document.getElementById('dictionary').style.visibility = 'visible';
            }, error => console.log('erreeeeeeeeeeeeeeeeur'));
        //document.getElementById('dictionary').style.visibility = 'visible';
    }

    public openCreateDict() {
        this.submittedDict = false;
        this.createDialogDict = true;
        this.selectedDict = new Dictionary();
    }

    filterDict(event) {
        const filtered: any[] = [];
        const query = event.query;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.itemsDict.length; i++) {
            const dict = this.itemsDict[i];
            // tslint:disable-next-line:triple-equals
            if (dict.word.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(dict);
            }
        }

        this.filteredDict = filtered;
    }

    public dict() {
        const selection = window.getSelection();
        this.textSeleted = selection.toString();
        this.dictionnaryService.selected = new Dictionary();

        this.dictionnaryService.FindByWord(this.textSeleted).subscribe(
            data => {
                this.dictionnaryService.selected = data;
                this.wordDict = '';
                this.dictionnaryService.listSynonymes = new Array<any>();
                // tslint:disable-next-line:triple-equals no-unused-expression
                if (this.textSeleted.length != 0 && this.dictionnaryService.selected.word == null) {
                    this.dictionnaryService.Translate(this.textSeleted).subscribe(
                        data => {
                            this.dictionnaryService.Synonymes = data;
                            this.wordDict = '';
                            this.j = 0;
                            this.listSynonymes = new Array<any>();
                            for (let i = this.j; i < this.Synonymes.length; i++) {
                                // tslint:disable-next-line:triple-equals
                                if (this.Synonymes[i] == '\"') {
                                    this.j = i;
                                    // @ts-ignore
                                    for (let k = this.j + 1; k < this.Synonymes.length; k++) {
                                        // tslint:disable-next-line:triple-equals
                                        if (this.Synonymes[k] != '\"' && this.Synonymes[k] != ',') {
                                            this.wordDict = this.wordDict + this.Synonymes[k];
                                        } else if (this.Synonymes[k] == ',') {
                                            break;
                                        } else {
                                            this.listSynonymes.push(this.wordDict);
                                            this.wordDict = '';
                                            this.j = k + 1;
                                            break;
                                        }
                                    }
                                }
                            }
                        });

                    console.log(this.listSynonymes);
                    this.dictionnaryService.selected.word = this.textSeleted;
                    this.submittedDict = false;
                    this.TranslateSynonymeDialog = true;
                    // tslint:disable-next-line:triple-equals
                } else if (this.textSeleted.length != 0 && this.dictionnaryService.selected.word != null) {
                    this.dictionnaryService.selected.word = this.textSeleted;
                    this.submittedDictEdit = false;
                    this.editDialogDict = true;
                }
            });
    }

    showreponse() {
        console.log(this.etudiantReponse);
        this.disable = true;
        document.getElementById('myAnswer').style.visibility = 'visible';
        if (this.etudiantReponse.etatReponse === 'true') {
            document.getElementById('myAnswer').style.color = 'green';
            document.getElementById('myAnswer').style.textDecoration = 'none';
        } else {
            document.getElementById('tooltiptext').style.visibility = 'visible';
            document.getElementById('myAnswer').style.color = 'red';
            document.getElementById('myAnswer').style.textDecoration = 'line-through';
        }
    }

    showvalueInput() {
        this.disable = true;
        for (let _i = 0; _i < this.homeWorkQstReponses.length; _i++) {
            if (this.homeWorkQstReponses[_i].etatReponse === 'true') {
                this.reponseInput = this.homeWorkQstReponses[_i].lib;
            }
        }
        this.etudiantReponse.lib = (document.getElementById('type-question-input') as HTMLInputElement).value;
        if (this.etudiantReponse.lib === 'i\'m saad') {
            this.etudiantReponse.etatReponse = 'true';
        }
        if (this.etudiantReponse.etatReponse === 'true') {
            document.getElementById('type-question-input').style.color = 'green';
            document.getElementById('type-question-input').style.textDecoration = 'none';
        } else {
            document.getElementById('type-question-input').style.color = 'red';
            document.getElementById('type-question-input').style.textDecoration = 'line-through';
            document.getElementById('tooltiptext-input').style.visibility = 'visible';
        }
    }

    showreponseMultiple() {
        this.correctanswers = new Array<HomeWorkReponse>();
        this.answerCorrect = '';
        this.reponseInput = '';

        for (let _i = 0; _i < this.homeWorkQstReponses.length; _i++) {
            for (let _j = 0; _j < this._myanswers.length; _j++) {
                if (this.homeWorkQstReponses[_i].lib === this._myanswers[_j] && this.homeWorkQstReponses[_i].etatReponse === 'true') {
                    this.answerCorrect += this._myanswers[_j];
                    this.answerCorrect += ', ';
                } else if (this.homeWorkQstReponses[_i].lib === this._myanswers[_j] && this.homeWorkQstReponses[_i].etatReponse === 'false') {
                    this.reponseInput += this._myanswers[_j];
                    this.reponseInput += ', ';
                }
            }
            if (this.homeWorkQstReponses[_i].etatReponse === 'true') {
                this.correctanswers.push(this.homeWorkQstReponses[_i]);
            }
        }


        if (this.answerCorrect !== '') {
            document.getElementById('myAnswer').style.color = 'green';
            document.getElementById('myAnswer').style.textDecoration = 'none';
            this.etudiantReponse.lib = this.answerCorrect;
            document.getElementById('myAnswer').style.visibility = 'visible';

        } else {
            this.etudiantReponse.lib = this.reponseInput;
            document.getElementById('tooltiptext').style.visibility = 'visible';
            document.getElementById('myAnswer').style.color = 'red';
            document.getElementById('myAnswer').style.textDecoration = 'line-through';
            document.getElementById('myAnswer').style.visibility = 'visible';

        }
        this._myanswers = new Array<string>();
        this.disable = true;
    }

    activate(r: HoweWorkQSTReponse) {
        this._myanswers.push(r.lib);
    }

    nextQuestion() {

        this.homeWorkQuestion = this.homeWork.questions[this.i + 1];
        if (this.homeWorkQuestion.typeDeQuestion.ref == 't4'){
            this.substractQuestionT4();
        }
        this.i++;
        this.etudiantReponse = new HoweWorkQSTReponse();
        this.reponseInput = '';
        this.disable = false;

        const correctreponseforqst = this.findReponseByQuestion(this.homeWorkQuestion.id);
        for (let _j = 0 ; _j < correctreponseforqst.length; _j++){
                if (correctreponseforqst[_j].etatReponse === 'true'){
                    this.correctanswers.push(correctreponseforqst[_j]);
                }
            }


        /*    document.getElementById('myAnswer').style.visibility = 'hidden';
            document.getElementById('tooltiptext').style.visibility = 'hidden';*/
        this.hasprevious = true;
        if (this.i === this.homeWork.questions.length - 1) {
            this.hasNext = false;
        }
        console.log(this.hasNext);
    }

    previousQuestion() {
        if (this.i > 0) {
            this.homeWorkQuestion = this.homeWork.questions[this.i - 1];
            this.findReponseByQuestion(this.homeWorkQuestion.id);
            if (this.homeWorkQuestion.typeDeQuestion.ref == 't4'){
                this.substractQuestionT4();
            }
            this.hasNext = true;
            this.disable = false;
            this.etudiantReponse = new HoweWorkQSTReponse();
            this.reponseInput = '';
            /*    document.getElementById('myAnswer').style.visibility = 'hidden';
                document.getElementById('tooltiptext').style.visibility = 'hidden';*/
            this.i--;
        }
        if (this.i === 0) {
            this.hasprevious = false;
        }

    }

    sauvegarderReponse(r: HomeWorkReponse) {
        const etudiantreponse = new ReponseEtudiantHomeWork();
        etudiantreponse.answer = r.lib;
        etudiantreponse.question = this.homeWorkQuestion;
        this.etudiantreponseList.push(etudiantreponse);
    }

    onOffTrue(){
        if(this.trueorFalse === true){
            this.trueorFalse = false;
        }
        else {
            this.trueorFalse = true;
        }
    }
    submithomeWork() {

        const correctreponseforqst = this.findReponseByQuestion(this.homeWorkQuestion.id);
            for (let _j = 0 ; _j < correctreponseforqst.length; _j++){
                if (correctreponseforqst[_j].etatReponse === 'true'){
                    this.correctanswers.push(correctreponseforqst[_j]);
                }
            }

        for (let _i = 0; _i < this.etudiantreponseList.length; _i++) {

            for (let _j = 0; _j < this.correctanswers.length; _j++) {
                if (this.etudiantreponseList[_i].question.id === this.correctanswers[_j].homeWorkQuestion.id){
                    if (this.etudiantreponseList[_i].answer === this.correctanswers[_j].lib) {
                        if (this.correctanswers[_j].etatReponse === 'true') {
                            this.homeworkEtudiantservice.result++;
                        }
                    }
                }
            }
        }
        this.homeWorkEtudiant.homeWork = this.homeWork;
        this.homeWorkEtudiant.etudiant = this.loginservice.etudiant;
        this.homeWorkEtudiant.note = this.homeworkEtudiantservice.result;
        this.homeWorkEtudiant.reponseEtudiantHomeWork = this.etudiantreponseList;
        if(this.homeWorkEtudiant.id == null){
            this.save();
        } else {
            this.homeworkEtudiantservice.update();
        }

        this.router.navigate(['etudiant/homeWorkEtudiantResult']);
        this.correctanswers = new Array<HomeWorkReponse>();


    }

    valider() {
        this.disable = true;
        const etudiantreponse = new ReponseEtudiantHomeWork();
        etudiantreponse.answer = this.etudiantReponse.lib;
        etudiantreponse.question = this.homeWorkQuestion;
        this.etudiantreponseList.push(etudiantreponse);
        this.homeworkEtudiantservice.QstReponseetudiant = this.etudiantreponseList;
        console.log(this.homeworkEtudiantservice.QstReponseetudiant);
    }

    submitOnOff() {
        this.disable = true;
        const etudiantreponse = new ReponseEtudiantHomeWork();
        if (this.trueorFalse){
            etudiantreponse.answer = 'true';
        }else{
            etudiantreponse.answer = 'false';
        }
        etudiantreponse.question = this.homeWorkQuestion;
        this.etudiantreponseList.push(etudiantreponse);
        console.log(this.etudiantreponseList);
    }

    submitMistake() {
        this.disable = true;
        const etudiantreponse = new ReponseEtudiantHomeWork();
        etudiantreponse.question = this.homeWorkQuestion;
        etudiantreponse.answer = this.inputAnswer;
        this.etudiantreponseList.push(etudiantreponse);
    }
}
