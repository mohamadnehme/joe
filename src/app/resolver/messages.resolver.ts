import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../models/Message";
import { AlertifyService } from "../services/alertify.service";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    constructor(private userService:UserService, private authService: AuthService,private router: Router, private alert:AlertifyService){}

    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]>{
        return this.userService.getMessages(this.authService.decodeToken.nameid,this.pageNumber,this.pageSize,this.messageContainer).pipe(
            catchError(error => {
                this.alert.error('Problem retrieving messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}