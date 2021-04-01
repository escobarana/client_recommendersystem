import { Component, DoCheck, OnInit } from '@angular/core';
import { trigger, style, transition, animate, query, stagger, keyframes } from '@angular/animations'; 
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  textArray: string[] = ["live", "be happy", "laugh", "fly", "smile"]

  isAdmin:boolean;

  public identity;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    console.log('Home page loaded');
    this.identity = this.userService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this.userService.getIdentity();
  }

}
