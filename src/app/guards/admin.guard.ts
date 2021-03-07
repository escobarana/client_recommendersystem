import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let identity = this.userService.getIdentity();

    if(identity!=null && identity.admin){ // exists and it's admin
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }

  }
  
}
