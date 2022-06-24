/* tslint:disable:variable-name */
import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LoginService} from '../../../controller/service/login.service';
import {Prof} from '../../../controller/model/prof.model';
import {Admin} from '../../../controller/model/admin.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {Router} from '@angular/router';
import {User} from '../../../controller/model/user.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {HeaderType} from '../../../enum/header-type.enum';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {UserService} from '../../../controller/service/user.service';

@Component({
    selector: 'app-login-prof',
    templateUrl: './login-prof.component.html',
    styleUrls: ['./login-prof.component.scss']
})
export class LoginProfComponent implements OnInit {
user: User = new User();
    public showLoading: boolean | undefined;
    private subscriptions: Subscription[] = [];
    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
                private authenticationService: AuthenticationService,
                private userService: UserService,
                private service: LoginService, private router: Router) {

    }





    public onLogin(user: User): void {
        this.showLoading = true;
        this.subscriptions.push(
            this.authenticationService.login(user).subscribe(
                (response: HttpResponse<User>) => {
                    const token = response.headers.get(HeaderType.JWT_TOKEN);
                    this.authenticationService.saveToken(token);
                    this.authenticationService.addUserToLocalCache(response.body);
                    this.service.hasloged = true;
                    this.router.navigate(['prof/home']);
                    this.showLoading = false;
                },
                (errorResponse: HttpErrorResponse) => {
                    console.log(errorResponse.message);
                    this.showLoading = false;
                }
            )
        );
    }



    ngOnInit(): void {

    }

}
