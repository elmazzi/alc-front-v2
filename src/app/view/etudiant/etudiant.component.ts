import {Component, OnInit} from '@angular/core';
import {MenuService} from '../shared/slide-bar/app.menu.service';
import {AppComponent} from '../../app.component';
import {Role} from '../../enum/role.enum';
import {User} from '../../controller/model/user.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../controller/service/authentication.service';
import {LearnService} from '../../controller/service/learn.service';
import {ReclamationEtudiant} from '../../controller/model/reclamation-etudiant.model';
import {DatePipe} from '@angular/common';
import {ReclamationEtudiantService} from '../../controller/service/reclamation-etudiant.service';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-etudiant',
    templateUrl: './etudiant.component.html',
    styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {
    overlayMenuActive: boolean;
    private user: User = new User();

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    menuClick: boolean;

    userMenuClick: boolean;

    notificationMenuClick: boolean;
    notificationMenuClick2: boolean;

    rightMenuClick: boolean;

    menuHoverActive: boolean;

    topbarUserMenuActive: boolean;

    topbarNotificationMenuActive: boolean;
    topbarNotificationMenuActive2: boolean;

    rightPanelMenuActive: boolean;

    configActive: boolean;

    configClick: boolean;

    profileClick: boolean;

    inlineUserMenuActive = false;
    displayChatDialog: boolean;

    get showTpBar(): boolean {
        return this.menuService.showTpBar;
    }

    set showTpBar(value: boolean) {
        this.menuService.showTpBar = value;
    }


    constructor(private menuService: MenuService,
                private router: Router,
                private datePipe: DatePipe,
                private authenticationService: AuthenticationService,
                private reclamationService: ReclamationEtudiantService,
                private messageService: MessageService,
                private learnService: LearnService,
                public app: AppComponent) {
    }

    get showAppMenu(): boolean {
        return this.learnService.showAppMenu;
    }

    set showAppMenu(value: boolean) {
        this.learnService.showAppMenu = value;
    }

    onLayoutClick() {
        if (!this.userMenuClick) {
            this.topbarUserMenuActive = false;
        }

        if (!this.notificationMenuClick) {
            this.topbarNotificationMenuActive = false;
        }
        if (!this.notificationMenuClick2) {
            this.topbarNotificationMenuActive2 = false;
        }
        if (!this.rightMenuClick) {
            this.rightPanelMenuActive = false;
        }

        if (!this.profileClick && this.isSlim()) {
            this.inlineUserMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.menuService.reset();
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
            this.unblockBodyScroll();
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        this.configClick = false;
        this.userMenuClick = false;
        this.rightMenuClick = false;
        this.notificationMenuClick = false;
        this.notificationMenuClick2 = false;
        this.menuClick = false;
        this.profileClick = false;
    }


    isHorizontal() {
        return this.app.layoutMode === 'horizontal';
    }

    isSlim() {
        return this.app.layoutMode === 'slim';
    }


    hideOverlayMenu() {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }


    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    ngOnInit(): void {
        this.user = this.authenticationService.getUserFromLocalCache();
        if (this.user === null) {
            this.router.navigate(['#/']);
        } else {
            // @ts-ignore
            if (this.user.role === Role.ADMIN || this.user.role === Role.PROF
                || this.user.authorities.length === 0) {
                this.router.navigate([' ']);
            }
            this.findReclamation();
        }
    }

    private findReclamation() {
        this.reclamationService.findReclamationByEtudiantId(this.user.id).subscribe(
            data => {
                if (data != null) {
                    this.reclamationList = data;
                }
            }
        );
    }

// Reclamation
    reclamation: ReclamationEtudiant = new ReclamationEtudiant();
    reclamationList: Array<ReclamationEtudiant> = new Array<ReclamationEtudiant>();
    public role = Role;
    public img: null | File;
    displayImgDialog: boolean;
    position: string;
    reader = new FileReader();
    selectedImgUrl: string;
    showOverLayImg: boolean;


    sendReclamation() {
        this.reclamation.etudiant = this.authenticationService.getConnectedStudent();
        this.reclamation.setFrom = this.authenticationService.getConnectedStudent().role;
        this.reclamation.dateReclamation = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
        this.reclamation.traite = false;
        this.reclamation.typeReclamationEtudiant = null;
        this.displayImgDialog = false;
        this.reclamation.file = this.img;
        this.reclamationService.send(this.reclamation).subscribe(data => {
            if (this.img !== null) {
                const formData = new FormData();
                formData.append('id', data.id.toString());
                formData.append('img', this.img);
                this.reclamationService.updateImg(formData).subscribe(
                    dataFinal => {
                        console.log(dataFinal);
                        this.reclamationList.push({...dataFinal});
                    }
                );
            } else {
                this.reclamationList.push({...data});
            }
        }, error => {
            this.messageService.add({severity: 'error', life: 3000, detail: error?.error?.message});

        });
    }

    getData() {
        this.displayChatDialog = true;
        this.findReclamation();
    }

    getValueOfBadge(): number {
        return this.reclamationList.filter(r => r.setFrom === Role.ADMIN).length;
    }

    showChatDialog() {
        this.displayChatDialog = true;
        this.findReclamation();
    }

    onBasicUpload(event: any) {
        this.img = (event.files as FileList)[0];
        this.reader.readAsDataURL(this.img);
        this.showPositionDialog('bottom-right');
    }

    showPositionDialog(position: string) {
        this.position = position;
        this.displayImgDialog = true;
    }


    cancel() {
        this.displayImgDialog = false;
        this.img = null;
    }
    showImage(img: string) {
        this.selectedImgUrl = img;
        this.showOverLayImg = true;
    }
}


