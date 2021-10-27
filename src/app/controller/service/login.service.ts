import {Injectable} from '@angular/core';
import {Prof} from '../model/prof.model';
import {Admin} from '../model/admin.model';
import {Etudiant} from '../model/etudiant.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {MenuItem} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private adminUrl = environment.adminUrl;
    private _prof: Prof;
    private _etudiant: Etudiant;
    private _model: MenuItem[];
    private _admin: Admin;

    constructor(private http: HttpClient) {
    }
    public findProf(username: string, password: string): Observable<Prof> {
        return this.http.get<Prof>(this.adminUrl + 'prof/login/' + username + '/password/' + password);
    }

    public findEtudiant(username: string, password: string): Observable<Etudiant> {
        return this.http.get<Etudiant>(this.adminUrl + 'etudiant/login/' + username + '/password/' + password);
    }

    public findAdmin(username: string, password: string): Observable<Admin> {
        return this.http.get<Admin>(this.adminUrl + 'admin/login/' + username + '/password/' + password);
    }
    get prof(): Prof {
        if (this._prof == null) {
            this._prof = new Prof();
        }
        return this._prof;
    }
    set prof(value: Prof) {
        this._prof = value;
    }
    get admin(): Admin {
        return this._admin;
    }
    set admin(value: Admin) {
        this._admin = value;
    }
    get etudiant(): Etudiant {
        return this._etudiant;
    }
    set etudiant(value: Etudiant) {
        this._etudiant = value;
    }
    get model(): MenuItem[] {
        return this._model;
    }
    set model(value: MenuItem[]) {
        this._model = value;
    }
}
