import {Component, OnInit} from '@angular/core';
import {Cours} from '../../../../controller/model/cours.model';
import {Section} from '../../../../controller/model/section.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {EtudiantCours} from '../../../../controller/model/etudiant-cours.model';
import {LoginService} from '../../../../controller/service/login.service';
import {Quiz} from '../../../../controller/model/quiz.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {QuizEtudiant} from '../../../../controller/model/quiz-etudiant.model';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {EtudiantReview} from '../../../../controller/model/etudiant-review.model';
import {EtudiantReviewService} from '../../../../controller/service/etudiant-review.service';
import {SectionItemService} from '../../../../controller/service/section-item.service';
import {HttpClient} from '@angular/common/http';
import {SessionCoursService} from '../../../../controller/service/session-cours.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-etudiant-courses',
    templateUrl: './etudiant-courses.component.html',
    styleUrls: ['./etudiant-courses.component.scss']
})
export class EtudiantCoursesComponent implements OnInit {
    sortKey: any[];
    cols: any[];


    // tslint:disable-next-line:max-line-length
    constructor(private messageService: MessageService,
                private quizService: QuizEtudiantService,
                private loginService: LoginService,
                private review: EtudiantReviewService,
                private confirmationService: ConfirmationService,
                private service: ParcoursService,
                private http: HttpClient,
                private router: Router,
                private sectionItemService: SectionItemService,
                public sessioncoursservice: SessionCoursService
    ) {
    }


    get selectedReview(): EtudiantReview {
        return this.review.selected;
    }

    set selectedReview(value: EtudiantReview) {
        this.review.selected = value;
    }

    get showVocabulary(): boolean {
        return this.sectionItemService.showVocabulary;
    }

    set showVocabulary(value: boolean) {
        this.sectionItemService.showVocabulary = value;
    }

    Vocab(section: Section) {
        this.sectionItemService.sectionSelected = section;

        this.sectionItemService.getSectionItems(section).subscribe(data => {
            this.sectionItemService.sectionSelected.sectionItems = data;
            console.log(data);
            this.showVocabulary = true;
        });

    }

    public FindSectionOneByOne(cour: Cours) {
        this.service.selectedEtudiantCours.dateDebut = new Date();
        this.selectedcours = cour;
        this.sectionItemService.coursofsection = cour;
        let i = 0;
        i = i + 1;
        this.service.affichelistSection().subscribe(
            data => {
                this.service.sectionAdditional = [];
                this.service.sectionStandard = [];
                this.itemssection2 = data;
                console.log(this.itemssection2);
                for (let _i = 0; _i < data.length; _i++) {
                    if (data[_i].categorieSection.superCategorieSection.libelle === 'Obligatory') {
                        this.service.sectionStandard.push(data[_i]);
                    } else if (data[_i].categorieSection.superCategorieSection.libelle === 'Additional') {
                        this.service.sectionAdditional.push(data[_i]);
                    }
                }
                // tslint:disable-next-line:no-shadowed-variable
            });
        this.service.image = '';
        this.service.afficheOneSection().subscribe(
            data => {
                this.selectedsection = data;
                if (data?.categorieSection?.libelle === 'Vocabulary') {
                    this.Vocab(data);
                } else {
                    this.showVocabulary = false;
                }
                //    for (let j = 0; j < 66 ; j++)
                //    {
                this.service.image = this.service.selectedsection.urlImage;
                //    }
                // this.service.image += 'preview';
                this.quizService.findQuizBySectionId(this.selectedsection).subscribe(
                    dataQuiz => {
                        this.selectedQuiz = dataQuiz;
                        if (dataQuiz !== null) {
                            this.quizService.findQuizEtudanitByEtudiantIdAndQuizId(this.loginService.getConnectedStudent(),
                                this.selectedQuiz).subscribe(
                                data => {
                                    this.quizEtudiantList = data;
                                    console.log(this.quizEtudiantList);
                                    this.quizService.findAllQuestions(this.selectedQuiz.ref).subscribe(
                                        dataQuestions => {
                                            if (data === null) {
                                                this.passerQuiz = 'Continue Quiz';
                                                this.quizView = false;
                                            } else {
                                                if (data.questionCurrent > dataQuestions.length) {
                                                    this.passerQuiz = 'View Quiz';
                                                    this.quizView = true;
                                                } else {
                                                    this.passerQuiz = 'Continue Quiz';
                                                    this.quizView = false;
                                                }
                                            }

                                        }
                                    );
                                }, error => {
                                    this.passerQuiz = 'Take Quiz';
                                    this.quizView = false;
                                }
                            );
                        } else {
                            this.quizView = false;
                        }

                    }, error => document.getElementById('quiz').style.visibility = 'hidden'
                );
            });
        this.router.navigate(['etudiant/etudiant-simulate-sections']);
    }


    public saveetudiantcours(idprof: number, idetudiant: number, idcours: number) {
        this.sessioncoursservice.saveetudiantcours(idprof, idetudiant, idcours);
    }

    get itemsEtudiantCours(): Array<EtudiantCours> {
        return this.service.itemsEtudiantCours;
    }

    set itemsEtudiantCours(value: Array<EtudiantCours>) {
        this.service.itemsEtudiantCours = value;
    }

    get selectedEtudiantCours(): EtudiantCours {
        return this.service.selectedEtudiantCours;
    }

    set selectesssection(value: Array<Section>) {
        this.service.selectesssection = value;
    }

    public viewType2() {
        this.viewChooseType2 = true;
    }

    get viewChooseType2(): boolean {
        return this.service.viewChooseType2;
    }

// tslint:disable-next-line:adjacent-overload-signatures
    get itemssection2(): Array<Section> {
        return this.service.itemssection2;
    }

    get selectescours(): Array<Cours> {
        return this.service.selectescours;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set itemssection2(value: Array<Section>) {
        this.service.itemssection2 = value;
    }

    get selectedsection(): Section {
        return this.service.selectedsection;
    }

    set selectedsection(value: Section) {
        this.service.selectedsection = value;
    }

    set selectedEtudiantCours(value: EtudiantCours) {
        this.service.selectedEtudiantCours = value;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set viewChooseType2(value: boolean) {
        this.service.viewChooseType2 = value;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set submittedCours(value: boolean) {
        this.service.submittedCours = value;
    }

    get createDialogCours(): boolean {
        return this.service.createDialogCours;
    }

    set createDialogCours(value: boolean) {
        this.service.createDialogCours = value;
    }

    get editDialogCours(): boolean {
        return this.service.editDialogCours;
    }

    set editDialogCours(value: boolean) {
        this.service.editDialogCours = value;
    }

    get viewDialogCours(): boolean {
        return this.service.viewDialogCours;
    }

    set viewDialogCours(value: boolean) {
        this.service.viewDialogCours = value;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    get itemssection(): Array<Section> {
        return this.service.itemssection;
    }

    get selectedcours(): Cours {
        return this.service.selectedcours;
    }

    set selectedcours(value: Cours) {
        this.service.selectedcours = value;
    }

    get itemscours(): Array<Cours> {
        return this.service.itemscours;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set itemscours(value: Array<Cours>) {
        this.service.itemscours = value;
    }

    get selectesscours(): Array<Cours> {
        return this.service.selectesscours;
    }

    set selectesscours(value: Array<Cours>) {
        this.service.selectesscours = value;
    }

    ngOnInit(): void {
        this.service.afficheCoursStudent().subscribe(
            data => {
                this.selectesscours = data;
            });
        this.review.findReview(this.selectedcours.id).subscribe(
            data => {
                this.selectedReview = data;
            });
        this.initCol();
        this.viewChooseType2 = false;
        this.service.findAllEtudiantCours().subscribe(
            data => this.itemsEtudiantCours = data
        );
    }

    public Console() {
        console.log(this.selectesscours);
    }

    public findAllEtudiantCours(cours: Cours) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.itemsEtudiantCours.length; j++) {
            // tslint:disable-next-line:triple-equals
            if (cours.id == this.itemsEtudiantCours[j].cours.id && this.itemsEtudiantCours[j].etudiant.id == this.loginService.getConnectedStudent().id) {
                return 1;
            } else {
                return null;
            }
        }
    }

    get image(): string {
        return this.service.image;
    }

    set image(value: string) {
        this.service.image = value;
    }

    get selectedQuiz(): Quiz {
        return this.quizService.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.quizService.selectedQuiz = value;
    }

    get etudiant(): Etudiant {
        return this.loginService.getConnectedStudent();
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

    public openCreateCours() {
        this.selectedcours = new Cours();
        this.submittedCours = false;
        this.createDialogCours = true;
    }

    public editCours(cour: Cours) {
        this.selectedcours = {...cour};
        this.editDialogCours = true;
    }

    public FindSection(cour: Cours) {
        this.selectedcours = cour;
        this.service.affichelistSection().subscribe(
            data => {
                this.selectesssection = data;
                // tslint:disable-next-line:prefer-for-of
                for (let n = 0; n < this.selectesssection.length; n++) {
                    for (let j = 0; j < 66; j++) {
                        this.service.image3 += this.selectesssection[n].urlImage[j];
                    }
                    console.log(this.service.image3);
                }
            });
    }

    private initCol() {
        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
            {field: 'description', header: 'Description'},
            {field: 'nombreSectionFinalise', header: 'NombreSectionFinalise'},
            {field: 'image', header: 'Image'},
            {field: 'nombreSectionEnCours', header: 'NombreSectionEnCours'},
            {field: 'nombreLinkEnCours', header: 'NombreLinkEnCours'},
            {field: 'nombreLinkFinalise', header: 'NombreLinkFinalise'},
            {field: 'numeroOrder', header: 'NumeroOrder'},
            {field: 'parcours', header: 'Parcours'}
        ];
    }

}
