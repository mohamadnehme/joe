import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router,private alert:AlertifyService){}
  canActivate(next: ActivatedRouteSnapshot): boolean {

    const roles = next.firstChild.data['roles'] as Array<string>;
    if(roles){
      const match = this.auth.roleMatch(roles);
      if(match){
        return true;
      }
      else{
        this.router.navigate(['members']);
        this.alert.error('You are not authorized to access this area');
      }
    }

    if(this.auth.loggedIn()){
      return true;
    }
    this.router.navigate(['/home']);
    this.alert.error("you shall not pass!!!");
    
    return false;
  }
}
