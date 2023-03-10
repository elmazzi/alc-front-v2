import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {InvitedStudent} from '../model/invited-student.model';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {EtudiantService} from './etudiant.service';

@Injectable({
    providedIn: 'root'
})
export class InvitedStudentService {
    public adminInvitedStudentUrl = environment.adminUrl + 'inviteStudentAdmin';
    public etudiantInvitedStudentUrl = environment.etudiantUrl + 'invitedStudentEtudiant';
    private _inviteStudentAdmin: InvitedStudent;
    private _inviteStudentEtudiant: InvitedStudent;
    private _inviteStudentAdminSearch: InvitedStudent;
    private _inviteStudentAdminList: Array<InvitedStudent>;
    private _inviteStudentEtudiantList: Array<InvitedStudent>;

    get inviteStudentEtudiant(): InvitedStudent {
        if (this._inviteStudentEtudiant == null) {
            this._inviteStudentEtudiant = new InvitedStudent();
        }
        return this._inviteStudentEtudiant;
    }

    set inviteStudentEtudiant(value: InvitedStudent) {
        this._inviteStudentEtudiant = value;
    }

    get inviteStudentEtudiantList(): Array<InvitedStudent> {
        if (this._inviteStudentEtudiantList == null) {
            this._inviteStudentEtudiantList = new Array<InvitedStudent>();
        }
        return this._inviteStudentEtudiantList;
    }

    set inviteStudentEtudiantList(value: Array<InvitedStudent>) {
        this._inviteStudentEtudiantList = value;
    }

    get inviteStudentAdminSearch(): InvitedStudent {
        if (this._inviteStudentAdminSearch == null) {
            this._inviteStudentAdminSearch = new InvitedStudent();
        }
        return this._inviteStudentAdminSearch;
    }

    set inviteStudentAdminSearch(value: InvitedStudent) {
        this._inviteStudentAdminSearch = value;
    }

    get inviteStudentAdmin(): InvitedStudent {
        if (this._inviteStudentAdmin == null) {
            this._inviteStudentAdmin = new InvitedStudent();
        }
        return this._inviteStudentAdmin;
    }

    set inviteStudentAdmin(value: InvitedStudent) {
        this._inviteStudentAdmin = value;
    }

    get inviteStudentAdminList(): Array<InvitedStudent> {
        if (this._inviteStudentAdminList == null) {
            this._inviteStudentAdminList = new Array<InvitedStudent>();
        }
        return this._inviteStudentAdminList;
    }

    set inviteStudentAdminList(value: Array<InvitedStudent>) {
        this._inviteStudentAdminList = value;
    }

    public findAll() {
        this.http.get<Array<InvitedStudent>>(this.adminInvitedStudentUrl + '/').subscribe(
            data => {
                if (data != null) {
                    this.inviteStudentAdminList = data;
                }
            }
        );
    }

    public findByEmailAndCode(email: string, code: string) {
        this.http.get<InvitedStudent>(this.etudiantInvitedStudentUrl + '/email/' + email + '/code/' + code).subscribe(
            data => {
                if (data != null) {
                    this.etudiantService.selected.username = email;
                    this.router.navigate(['public/continueInfo']);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Welcome to Platform English  E-Learning',
                        detail: 'Please fill out your Personnel Information '
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Invitation not found',
                        detail: 'we couldn\'t find any invitation with the given code and email '
                    });
                }
            }
        );
    }

    public findAllByStudentId(idStudent) {
        this.http.get<Array<InvitedStudent>>(this.etudiantInvitedStudentUrl + '/' + idStudent).subscribe(
            data => {
                if (data != null) {
                    this.inviteStudentEtudiantList = data;
                    console.log(this.inviteStudentEtudiantList);
                }
            }
        );
    }

    public findAllByCriteria() {
        this.http.post<Array<InvitedStudent>>(this.adminInvitedStudentUrl + '/', this.inviteStudentAdminSearch).subscribe(
            data => {
                if (data != null) {
                    this.inviteStudentAdminList = data;
                }

            }
        );
    }

    public sendInvitation(idStudent: number, emailInvited: string) {
        console.log('eded');
        console.log(idStudent);
        console.log(emailInvited);
        this.http.get(this.etudiantInvitedStudentUrl + '/' + idStudent + '/' + emailInvited).subscribe(
            data => {
                console.log('eded1');
                if (data === 1) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Invitation Sent',
                        detail: 'Invitation Sent successfully'
                    });
                    this.findAllByStudentId(idStudent);
                    this.inviteStudentEtudiant = null;
                }
                if (data === -2) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Invitation Cancel',
                        detail: 'This email is already used'
                    });
                    this.findAllByStudentId(idStudent);
                    this.inviteStudentEtudiant = null;

                }
                if (data === -3) {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Invitation Cancel',
                        detail: 'This email is already invited'
                    });
                }
            }
        );
    }

    constructor(public etudiantService: EtudiantService, public router: Router, private http: HttpClient, private messageService: MessageService) {
    }
}
