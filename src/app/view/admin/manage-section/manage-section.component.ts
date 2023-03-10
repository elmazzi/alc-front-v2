import {Component, OnInit} from '@angular/core';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {Parcours} from '../../../controller/model/parcours.model';
import {Cours} from '../../../controller/model/cours.model';
import {Section} from '../../../controller/model/section.model';
import {CategorieSection} from '../../../controller/model/categorie-section.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {QuizService} from '../../../controller/service/quiz.service';
import {QuizEtudiantService} from '../../../controller/service/quiz-etudiant.service';
import {Quiz} from '../../../controller/model/quiz.model';
import {Router} from '@angular/router';
import {LearnService} from '../../../controller/service/learn.service';
import {CategoriesSectionItemEnum} from '../../../enum/CategoriesSectionItemEnum';
import {SectionItemService} from '../../../controller/service/section-item.service';

@Component({
    selector: 'app-manage-section',
    templateUrl: './manage-section.component.html',
    styleUrls: ['./manage-section.component.scss']
})
export class ManageSectionComponent implements OnInit {
    public CategoriesSectionItemEnum = CategoriesSectionItemEnum;
    public parcours: Array<Parcours> = new Array<Parcours>();
    public cours: Array<Cours> = new Array<Cours>();
    public sections: Array<Section> = new Array<Section>();
    public localSectionSelected: Section = new Section();
    public section: Section = new Section();
    visibleSidebar: boolean;
    rows = 10;
    first = 0;

    imgUrl: string;
    showEditDialog: boolean;
    categorieSections: Array<CategorieSection> = new Array<CategorieSection>();

    constructor(private parcoursService: ParcoursService,
                private quizEtudiantService: QuizEtudiantService,
                private quizService: QuizService,
                private confirmationService: ConfirmationService,
                private learnService: LearnService,
                private sectionItemService: SectionItemService,
                private router: Router,
                private messageService: MessageService) {
    }


    get selectedparcours(): Parcours {
        return this.parcoursService.selectedparcours;
    }

    set selectedparcours(value: Parcours) {
        this.parcoursService.selectedparcours = value;
    }

    get selectedcours(): Cours {
        return this.parcoursService.selectedcours;
    }

    set selectedcours(value: Cours) {
        this.parcoursService.selectedcours = value;
    }

    set parcourCurrent(value: Parcours) {
        this.learnService.parcourCurrent = value;
    }


    set sectionCurrent(value: Section) {
        this.learnService.sectionCurrent = value;
    }


    set courseCurrent(value: Cours) {
        this.learnService.courseCurrent = value;
    }


    ngOnInit(): void {
        this.selectedparcours = new Parcours();
        this.selectedcours = new Cours();
        this.parcoursService.FindAllParcours().subscribe(
            data => {
                this.parcours = data;
            }
        );
    }

    getCours() {
        this.parcourCurrent = this.selectedparcours;
        console.log(this.selectedparcours.id);
        if (this.selectedparcours.id !== undefined) {
            this.parcoursService.afficheCours().subscribe(
                data => {
                    this.cours = data;
                });
        }
    }

    getSections() {
        this.courseCurrent = this.selectedcours;
        console.log(this.selectedcours.id);
        if (this.selectedcours.id !== undefined) {
            if (this.selectedparcours.id !== undefined) {
                this.parcoursService.affichelistSection().subscribe(
                    data => {
                        this.sections = data;
                    });
            }
        }
    }

    showImage(imgUrl: string) {
        this.imgUrl = imgUrl;
        this.visibleSidebar = true;
    }

    showEditDialogFct(section: Section) {
        this.localSectionSelected = section;
        this.findAllCategorie();
        this.showEditDialog = true;
    }

    showAddSectionDialog() {
        this.localSectionSelected = new Section();
        this.localSectionSelected.cours = this.selectedcours;
        this.findAllCategorie();
        this.showEditDialog = true;
    }

    findAllCategorie() {
        this.parcoursService.findAllCategorieSection().subscribe(data => {
            this.categorieSections = data;
        });
    }

    findSection() {
        this.section.cours = this.selectedcours;
        this.section.cours.parcours = this.selectedparcours;
        console.log(this.section);
        this.parcoursService.findByCriteria(this.section).subscribe(data => {
            this.sections = data;
        }, error => {
            console.log(error);
        });
    }

    save() {
        this.showEditDialog = false;
        if (this.localSectionSelected.id !== 0) {
            this.parcoursService.updateSection(this.localSectionSelected).subscribe(data => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Successful',
                    detail: 'Section Updated',
                    life: 3000
                });
                for (let i = 0; i < this.sections.length; i++) {
                    if (this.sections[i].id === data.id) {
                        this.sections[i] = data;
                    }
                }
            }, error => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error!',
                    detail: error?.error?.message,
                    life: 3000
                });
            });
        } else {
            this.parcoursService.addSection(this.localSectionSelected).subscribe(data => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Section created',
                    life: 3000
                });
                this.sections.push({...data});

            }, error => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error!',
                    detail: error?.error?.message,
                    life: 3000
                });
            });
        }

    }

    isValidated(section: Section): boolean {
        if (section?.urlImage?.length < 5 && section?.urlVideo?.length < 5) {
            return false;
        } else {
            return section?.contenu?.length >= 5;
        }
    }

    get selectedQuiz(): Quiz {
        return this.quizEtudiantService.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.quizEtudiantService.selectedQuiz = value;
    }

    get sectionSelected(): Section {
        return this.quizService.sectionSelected;
    }

    set sectionSelected(value: Section) {
        this.quizService.sectionSelected = value;
    }

    showQuiz(section: Section) {
        console.log('button clicked');
        this.sectionSelected = section;
        this.sectionCurrent = section;
        this.quizEtudiantService.findQuizBySectionId(section).subscribe(
            data => {
                console.log(data);
                this.selectedQuiz = data;
                if (data === null || data === undefined || data?.id === undefined) {
                    this.router.navigate(['admin/quiz-create']);
                } else {
                    if (this.selectedQuiz?.section?.id == null) {
                        this.router.navigate(['admin/quiz-create']);
                    } else {
                        this.quizService.refQuiz = this.selectedQuiz.ref;
                        console.log(this.quizService.refQuiz);
                        this.router.navigate(['admin/quiz-preview-prof']);
                    }
                }
            }, error => {
                console.log(error);
                // tslint:disable-next-line:no-unused-expression
                this.selectedQuiz == null;
                this.router.navigate(['admin/quiz-create']);

            });
    }

    createVocab(section: Section) {
        this.sectionItemService.sectionSelected = section;

        this.sectionItemService.getSectionItems(section).subscribe(data => {
            this.sectionItemService.sectionSelected.sectionItems = data;
            console.log(data);
            this.router.navigate(['admin/create-section-items']);
        });
    }

    categoryChange() {
        console.log(this.localSectionSelected.categorieSection);
        this.localSectionSelected.numeroOrder = this.localSectionSelected.categorieSection.numeroOrder;
        this.localSectionSelected.libelle = this.localSectionSelected.categorieSection.libelle;
    }

    get selectedsection(): Section {
        return this.parcoursService.selectedsection;
    }

    set selectedsection(value: Section) {
        this.parcoursService.selectedsection = value;
    }

    public delete(section: Section) {
        this.selectedsection = section;
        this.confirmationService.confirm({
            message: 'Are you sure you want to remove this section? This action cannot be undone!',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.parcoursService.deleteSection().subscribe(data => {
                    this.sections = this.sections.filter(val => val.id !== this.selectedsection.id);
                    this.selectedsection = new Section();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Section Deleted',
                        life: 3000
                    });
                }, error => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error?.error?.message || 'Something went wrong, please try again.',
                        life: 3000
                    });
                    console.log(error);
                });
            }
        });
    }
}
