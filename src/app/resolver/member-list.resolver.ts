import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../models/User";
import { AlertifyService } from "../services/alertify.service";
import { UserService } from "../services/user.service";

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    constructor(private userService:UserService, private router: Router, private alert:AlertifyService){}

    pageNumber = 1;
    pageSize = 5;

    resolve(route: ActivatedRouteSnapshot): Observable<User[]>{
        return this.userService.getUsers(this.pageNumber,this.pageSize).pipe(
            catchError(error => {
                this.alert.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}