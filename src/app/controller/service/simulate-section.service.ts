import {Injectable} from '@angular/core';
import {WebSocketService} from './web-socket.service';
import {ConfirmationService, MenuItem, MessageService, TreeNode} from 'primeng/api';
import {Router} from '@angular/router';
import {DictionaryService} from './dictionary.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ParcoursService} from './parcours.service';
import {HttpClient} from '@angular/common/http';
import {QuizEtudiantService} from './quiz-etudiant.service';
import {LoginService} from './login.service';
import {VocabularyService} from './vocabulary.service';
import {EtudiantReviewService} from './etudiant-review.service';
import {SectionItemService} from './section-item.service';
import {SessionCoursService} from './session-cours.service';
import {HomeworkService} from './homework.service';
import {HomeWorkEtudiantServiceService} from './home-work-etudiant-service.service';
import {Dictionary} from '../model/dictionary.model';
import {EtudiantCours} from '../model/etudiant-cours.model';
import {Quiz} from '../model/quiz.model';
import {Etudiant} from '../model/etudiant.model';
import {QuizEtudiant} from '../model/quiz-etudiant.model';
import {Cours} from '../model/cours.model';
import {HomeWork} from '../model/home-work.model';
import {Section} from '../model/section.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {LearnService} from './learn.service';
import {SessionCours} from '../model/session-cours.model';

@Injectable({
    providedIn: 'root'
})
export class SimulateSectionService {
    private _showLesson = true;
    private _showSummary = false;
    private _data: any;
    private _finishedAdditionalSection = 0;
    private _finishedSection = 0;
    private _showRatingLessonTemplate = false;

    constructor(private messageService: MessageService,
                private router: Router,
                private dictionnaryService: DictionaryService,
                private sanitizer: DomSanitizer,
                private confirmationService: ConfirmationService,
                private service: ParcoursService,
                private http: HttpClient,
                private learnService: LearnService,
                private quizService: QuizEtudiantService,
                private loginService: LoginService,
                private vocab: VocabularyService,
                private review: EtudiantReviewService,
                private sectionItemService: SectionItemService,
                private sessioncoursservice: SessionCoursService,
                private homeWorkService: HomeworkService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService) {
    }


    get showRatingLessonTemplate(): boolean {
        return this._showRatingLessonTemplate;
    }

    set showRatingLessonTemplate(value: boolean) {
        this._showRatingLessonTemplate = value;
    }

    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }

    get finishedAdditionalSection(): number {
        return this._finishedAdditionalSection;
    }

    set finishedAdditionalSection(value: number) {
        this._finishedAdditionalSection = value;
    }

    get finishedSection(): number {
        return this._finishedSection;
    }

    set finishedSection(value: number) {
        this._finishedSection = value;
    }

    get showLesson(): boolean {
        return this._showLesson;
    }

    set showLesson(value: boolean) {
        this._showLesson = value;
    }

    get showSummary(): boolean {
        return this._showSummary;
    }

    set showSummary(value: boolean) {
        this._showSummary = value;
    }

    get quizExist(): boolean {
        return this._quizExist;
    }

    set quizExist(value: boolean) {
        this._quizExist = value;
    }

    get coursecomplited(): boolean {
        return this.review.coursecomplited;
    }

    set coursecomplited(value: boolean) {
        this.review.coursecomplited = value;

    }

    get viewDialog(): boolean {
        return this.review.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.review.viewDialog = value;
    }

    get contenuSection(): Array<string> {
        return this.service.contenuSection;
    }

    set contenuSection(value: Array<string>) {
        this.service.contenuSection = value;
    }

    get selected(): Dictionary {
        return this.dictionnaryService.selected;
    }

    set selected(value: Dictionary) {
        this.dictionnaryService.selected = value;
    }

    get itemsDict(): Array<Dictionary> {
        return this.dictionnaryService.itemsDict;
    }

    set itemsDict(value: Array<Dictionary>) {
        this.dictionnaryService.itemsDict = value;
    }

    get image(): string {
        return this.service.image;
    }

    set image(value: string) {
        this.service.image = value;
    }

    get selectedDict(): Dictionary {
        return this.dictionnaryService.selectedDict;
    }

    set selectedDict(value: Dictionary) {
        this.dictionnaryService.selectedDict = value;
    }

    get selectedEtudiantCours(): EtudiantCours {
        return this.service.selectedEtudiantCours;
    }

    set selectedEtudiantCours(value: EtudiantCours) {
        this.service.selectedEtudiantCours = value;
    }

    get itemsEtudiantCours(): Array<EtudiantCours> {
        return this.service.itemsEtudiantCours;
    }

    set itemsEtudiantCours(value: Array<EtudiantCours>) {
        this.service.itemsEtudiantCours = value;
    }

    get submittedDictEdit(): boolean {
        return this.dictionnaryService.submittedDictEdit;
    }

    set submittedDictEdit(value: boolean) {
        this.dictionnaryService.submittedDictEdit = value;
    }

    get editDialogDict(): boolean {
        return this.dictionnaryService.editDialogDict;
    }

    set editDialogDict(value: boolean) {
        this.dictionnaryService.editDialogDict = value;
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

    get progress(): number {
        return this.service.progress;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set progress(value: number) {
        this.service.progress = value;
    }

    get selectedsection(): Section {
        return this.service.selectedsection;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set selectedsection(value: Section) {
        this.service.selectedsection = value;
    }

    get section(): Section {
        return this.quizService.section;
    }

    set section(value: Section) {
        this.quizService.section = value;
    }

    get selectedQuiz(): Quiz {
        return this.quizService.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.quizService.selectedQuiz = value;
    }

    get etudiant(): Etudiant {
        return this.loginService.etudiant;
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
        return this.service.selectedcours;
    }

    set selectedcours(value: Cours) {
        this.service.selectedcours = value;
    }

    get itemssection2(): Array<Section> {
        return this.service.itemssection2;
    }

    set itemssection2(value: Array<Section>) {
        this.service.itemssection2 = value;
    }

    get sectionStandard(): Array<Section> {
        return this.service.sectionStandard;
    }


    get sectionAdditional(): Array<Section> {
        return this.service.sectionAdditional;
    }

    set sectionAdditional(value: Array<Section>) {
        this.service.sectionAdditional = value;
    }

    get selectessection(): Array<Section> {
        return this.service.selectessection;
    }

    set selectessection(value: Array<Section>) {
        this.service.selectessection = value;
    }

    get homeWorkList(): Array<HomeWork> {
        return this.homeWorkService.homeWorkList;
    }

    set homeWorkList(homeWorklist: Array<HomeWork>) {
        this.homeWorkService.homeWorkList = homeWorklist;
    }

    get showVocabulary(): boolean {
        return this.sectionItemService.showVocabulary;
    }

    set showVocabulary(value: boolean) {
        this.sectionItemService.showVocabulary = value;
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


    set TranslateSynonymeDialog(value: boolean) {
        this.dictionnaryService.TranslateSynonymeDialog = value;
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

    nodes: TreeNode[];
    menu: MenuItem[];
    srcImg: string;
    translate: any;
    textSeleted: string;
    filteredDict: any[];
    synonym: any[];
    value = 0;
    word: string;
    wordDict: any;
    j: number;
    private profUrl = environment.profUrl;
    private synchronizationUrl = 'synchronization';
    private _quizExist: boolean;

    private sessionCour: SessionCours = new SessionCours();

    Vocab(section: Section) {
        this.sectionItemService.sectionSelected = section;

        this.sectionItemService.getSectionItems().subscribe(data => {
            this.sectionItemService.sectionSelected.sectionItems = data;
            console.log(data);
            this.showVocabulary = true;
        });

    }

    public updateCurrentSection(id: number, section: Section) {
        this.http.post<number>(this.profUrl + this.synchronizationUrl + '/update/' + id, section).subscribe(
            data => {
                if (data > 0) {
                    console.log('CurrentSection updated');
                } else {
                    console.log('section not updated');
                }
            }, error => {
                console.log('problem while updating current section');
            }
        );
    }


    public goToSummary() {
        let index = 0;
        for (const item of this.sessionCour.sections) {
            if (item.id === this.selectedsection.id) {
                index = -2;
            }
        }
        if (index === 0) {
            this.sessionCour.sections.push({...this.selectedsection});
        }

        this.showLesson = false;
        this.showSummary = true;

        for (const item of this.sessionCour.sections) {
            for (const sec of this.sectionAdditional) {
                if (item.id === sec.id) {
                    this.finishedAdditionalSection += 1;
                }
            }
        }
        for (const item of this.sessionCour.sections) {
            for (const sec of this.sectionStandard) {
                if (item.id === sec.id) {
                    this.finishedSection += 1;
                }
            }
        }
        const keySections = (this.finishedSection / this.sectionStandard?.length) * 100;
        const keySectionsRest = 100 - keySections;
        const keySectionsAdditional = (this.finishedAdditionalSection / this.sectionAdditional?.length) * 100;
        const keySectionsRestAdditional = 100 - keySectionsAdditional;


        this.data = {
            labels: ['Finished', 'Not Finished'],
            datasets: [
                {
                    data: [keySections, keySectionsRest],
                    backgroundColor: [
                        '#FF6384',
                        '#f4f4f4'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#f4f4f4'
                    ]
                },
                {
                    data: [keySectionsAdditional, keySectionsRestAdditional],
                    backgroundColor: [
                        '#FFCE56',
                        '#f4f4f4'
                    ],
                    hoverBackgroundColor: [
                        '#FFCE56',
                        '#f4f4f4'
                    ],

                }
            ]
        };
    }


    public nextSection(id: number, type: string) {
        for (let i = 0; i < this.itemssection2.length; i++) {
            if (id === this.itemssection2[i].id) {
                if (i !== 0 && (type === 'NEXT')) {
                    let index = 0;
                    for (const item of this.sessionCour.sections) {
                        if (item.id === this.itemssection2[i - 1].id) {
                            index = -2;
                        }
                    }
                    if (index === 0) {
                        this.sessionCour.sections.push({...this.itemssection2[i - 1]});
                    }
                }
                this.selectedsection = this.itemssection2[i];
            }
        }

        if (this.selectedsection.categorieSection.libelle === 'Vocabulary') {
            this.Vocab(this.selectedsection);
        } else {
            this.showVocabulary = false;
        }

        this.quizService.findQuizBySectionId(this.selectedsection).subscribe(
            data => {
                this.selectedQuiz = data;

                this.quizService.findQuizEtudanitByEtudiantIdAndQuizId(this.loginService.etudiant, this.selectedQuiz).subscribe(
                    data1 => {
                        this.quizEtudiantList = data1;
                        console.log(this.quizEtudiantList);
                        if (this.quizEtudiantList.id !== 0) {
                            this.quizView = true;
                        } else {
                            this.quizView = false;
                        }
                    }, error => {
                        this.passerQuiz = 'Take Quiz';
                        console.log(error);
                        this.quizView = false;
                    }
                );
            },
        );

    }


    public dict() {
        const selection = window.getSelection();
        this.textSeleted = selection.toString();
        this.selected = new Dictionary();

        this.dictionnaryService.FindByWord(this.textSeleted).subscribe(
            data => {
                this.selected = data;
                this.wordDict = '';
                this.listSynonymes = new Array<any>();
                // tslint:disable-next-line:triple-equals no-unused-expression
                if (this.textSeleted.length != 0 && this.selected.word == null) {
                    this.dictionnaryService.Translate(this.textSeleted).subscribe(
                        data => {
                            this.Synonymes = data;
                            console.log(this.Synonymes);
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
                    this.selected.word = this.textSeleted;
                    this.submittedDict = false;
                    this.TranslateSynonymeDialog = true;
                    // tslint:disable-next-line:triple-equals
                } else if (this.textSeleted.length != 0 && this.selected.word != null) {
                    this.selected.word = this.textSeleted;
                    this.submittedDictEdit = false;
                    this.editDialogDict = true;
                    // console.log(this.selected.word);
                }
            });
    }

    public dictEdit(dict: Dictionary) {
        this.selected = dict;
        if (this.selected.word != null) {
            this.submittedDictEdit = false;
            this.editDialogDict = true;
        }
    }


    public findSectionOneByOne(cour: Cours): Section {
        this.selectedcours = cour;
        let i = 0;
        i = i + 1;
        this.service.affichelistSection().subscribe(
            data => {
                this.itemssection2 = data;
                this.service.sectionAdditional = [];
                this.service.sectionStandard = [];
                this.itemssection2 = data;
                console.log(this.itemssection2);
                for (let _i = 0; _i < data.length; _i++) {
                    if (data[_i].categorieSection.superCategorieSection.libelle === 'Obligatory') {
                        this.sectionStandard.push({...data[_i]});
                    } else if (data[_i].categorieSection.superCategorieSection.libelle === 'Additional') {
                        this.sectionAdditional.push({...data[_i]});
                    }
                }
                console.log('===========================Standra 1=========================');
                console.log(this.sectionStandard);
                console.log(this.sectionAdditional);
                console.log('====================================================');

            });
        this.service.image = '';
        if (this.loginService.prof !== null) {
            this.service.afficheOneSection().subscribe(
                data => {
                    this.selectedsection = data;
                    if (data.categorieSection.libelle === 'Vocabulary') {
                        this.Vocab(data);
                    } else {
                        this.showVocabulary = false;
                    }
                    this.quizService.findQuizBySection(this.selectedsection.id).subscribe(
                        dataQuiz => {
                            this.selectedQuiz = dataQuiz;
                            this.quizService.findQuizEtudanitByEtudiantIdAndQuizId(this.loginService.etudiant, this.selectedQuiz).subscribe(
                                data1 => {
                                    this.quizEtudiantList = data1;
                                    console.log(this.quizEtudiantList);
                                    if (this.quizEtudiantList.id !== 0) {
                                        this.quizView = true;
                                    } else {
                                        this.quizView = false;
                                    }
                                }, error => {
                                    this.passerQuiz = 'Take Quiz';
                                    console.log(error);
                                    this.quizView = false;
                                }
                            );
                        });
                    console.log(this.service.image);
                    this.service.image = this.selectedsection.urlImage;
                    this.quizService.section.id = this.selectedsection.id;
                    this.quizService.findQuizSection().subscribe(dataQuiz => this.selectedQuiz = dataQuiz);
                });
        }
        console.log(this.selectedsection);
        return this.selectedsection;
    }

    public goToSection(libelle: string) {
        this.service.afficheSection(libelle).subscribe(
            data => {
                this.selectedsection = data;
                if (data.categorieSection.libelle === 'Vocabulary') {
                    this.Vocab(data);
                } else {
                    this.showVocabulary = false;
                }
                this.quizService.findQuizBySectionId(this.selectedsection).subscribe(
                    data => {
                        this.selectedQuiz = data;
                        this.quizService.findQuizEtudanitByEtudiantIdAndQuizId(this.loginService.etudiant, this.selectedQuiz).subscribe(
                            data1 => {
                                this.quizEtudiantList = data1;
                                console.log(this.quizEtudiantList);
                                if (this.quizEtudiantList.id !== 0) {
                                    this.quizView = true;
                                } else {
                                    this.quizView = false;
                                }
                            }, error => {
                                this.passerQuiz = 'Take Quiz';
                                console.log(error);
                                this.quizView = false;
                            }
                        );
                    },
                );
            }, error => console.log('erreeeeeeeeeeeeeeeeur'));
    }

    findSectionOneByCoursId(cours: Cours) {
        return this.http.get<Array<Section>>(this.profUrl + 'section/cours/id/' + cours.id).subscribe(
            data => {
                this.itemssection2 = data;
                if (cours.numeroOrder === 0) {
                    this.itemssection2.splice(1, 1);
                }
                this.selectedsection = data[0];
                this.quizService.findQuizBySectionId(this.selectedsection).subscribe(data12 => {
                    this.quizExist = true;
                    this.selectedQuiz = data12;
                    this.quizService.findQuizEtudanitByEtudiantIdAndQuizId(this.loginService.etudiant, this.selectedQuiz).subscribe(
                        data1 => {
                            this.quizEtudiantList = data1;
                            console.log(this.quizEtudiantList);
                            if (this.quizEtudiantList.id !== 0) {
                                this.quizView = true;
                            } else {
                                this.quizView = false;
                            }
                        }, error => {
                            this.passerQuiz = 'Take Quiz';
                            console.log(error);
                            this.quizView = false;
                        }
                    );
                }, error => {
                    this.quizExist = false;
                });
                if (this.selectedsection.categorieSection.libelle === 'Vocabulary') {
                    this.Vocab(this.selectedsection);
                } else {
                    this.showVocabulary = false;
                }
                this.service.sectionAdditional = new Array<Section>();
                this.service.sectionStandard = new Array<Section>();
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
                console.log(this.selectedsection);
                for (let _i = 0; _i < data.length; _i++) {
                    if (data[_i].categorieSection.superCategorieSection.libelle === 'Obligatory') {
                        if (data[_i].categorieSection.numeroOrder === 2 && cours.numeroOrder === 0) {

                        } else {
                            this.sectionStandard.push({...data[_i]});
                        }
                    } else if (data[_i].categorieSection.superCategorieSection.libelle === 'Additional') {
                        this.sectionAdditional.push({...data[_i]});
                    }
                }
            }
        );
    }

    sectionIsFinished(section: Section): boolean {
        if (this.sessionCour.sections.length > 0) {
            for (const sec of this.sessionCour.sections) {
                if (section.id === sec.id) {
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    finishLesson() {
        this.showRatingLessonTemplate = true;
    }
}
