import { Component, OnInit } from '@angular/core';
import {FormControl, Validators,FormGroup} from '@angular/forms';
import { VerifyEmailPageComponent } from '../verify-email-page/verify-email-page.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  identity;
  token: string;
  status: string;

  loginFormControl: FormGroup;

  isAdmin: boolean;

  constructor(private userService: UserService, 
              private emailDialog: MatDialog, 
              private router: Router) {
    this.user = new User('','','','',false,[],[],[], "newbie");
   }

  ngOnInit(): void { 
    this.loginFormControl = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
   }

  scrollToView(){
    var element = document.getElementsByClassName("register")[0];
    element.scrollIntoView({block: "start", behavior: "smooth"});
  }

  login(){
    if(this.loginFormControl.invalid){
      return;
    }else{
      let email = this.loginFormControl.value.email;
      let password = this.loginFormControl.value.password;
      if(email != "" && password != ""){
        this.user.email = email;
        this.user.password = password;
        this.userService.signup(this.user)
                        .subscribe((res) => {
            this.identity = res.user; // get user logged object
  
              if(!this.identity || !this.identity._id){
                alert('The user is not logged in');
              }else{
                this.identity.password=''; // empty the password field to don't save it on the session
                localStorage.setItem('identity', JSON.stringify(this.identity)); // data persistance
                localStorage.setItem('email', email); // data persistance
                
                // show the identity
                // console.log(this.identity);
    
                // get the token
                this.userService.signup(this.user, true).subscribe( // gettoken = true
                  (res) => {
                    this.token = res.token;
                    // console.log(this.token);
          
                    if(this.token.length <= 0){ 
                      alert('Token not generated');
                    }else{ // show the token
                      localStorage.setItem('token', this.token); // data persistance
                      
                      this.status='success';

                      location.reload(); // Reload page to redirect to the user's page
    
                    }
              },
              err => { console.log(<any>err) });
            }
          },
          err => { 
            var errmsg = <any>err; 
            if(errmsg!=null){
              this.status = 'error';
            }
          });
      }
    } 
  }

  openDialog(): void {
    this.emailDialog.open(VerifyEmailPageComponent, {
      width: '500px',
      height: '300px',
      maxHeight: window.innerHeight + 'px',
      disableClose: false
    });
  }

}
