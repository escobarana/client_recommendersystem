import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public identity;

  constructor(private router:Router, private userService: UserService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      this.identity = userService.getIdentity();
    iconRegistry.addSvgIcon(
      'person',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/person.svg'));
  }

  scrollToView(el){
    var element;
    if(el === "login"){
      element = document.getElementsByClassName("login")[0];
    }
    else if(el === "register"){
      element = document.getElementsByClassName("register")[0];
    }
    element.scrollIntoView({block: "start", behavior: "smooth"});
  }

  goTo(loc:string){
    if(this.router.url.includes("assign") && loc == 'assign'){
      window.location.reload();
    }
    else if(loc == 'review' && this.router.url.includes("reviewapps")){
      window.location.reload();
    }
    else if(loc == 'final' && this.router.url.includes("finalapps")){
      window.location.reload();
    }
  }

  logOut(){
    localStorage.clear(); // delete all the data from local storage
    this.identity = null;
    location.reload(); // Reload page to redirect to the home page
  }

}
