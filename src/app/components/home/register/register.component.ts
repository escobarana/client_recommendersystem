import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroup, FormBuilder,FormGroupDirective, NgForm } from '@angular/forms';
import { ValidatorsFormService } from '../../../services/validators-form.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  matcher = new MyErrorStateMatcher();
  registerFormControl: FormGroup;
  status: string;

  constructor(private userService: UserService,
              private validatorForm: ValidatorsFormService,
              private fb: FormBuilder) { 

      this.user = new User('','','','',false,[],[],[], "newbie");
    }

  ngOnInit(): void { 
    this.registerFormControl = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(6)]),
      re_password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    },{validator: this.validatorForm.checkPasswords}); 
  }

  createUser(){

    if(this.registerFormControl.invalid){
      return;
    }else{
      let password = this.registerFormControl.value.password;
      let re_password = this.registerFormControl.value.re_password;
  
      this.user.name=this.registerFormControl.value.name;
      this.user.email=this.registerFormControl.value.email;
      this.user.password=this.registerFormControl.value.password;
  
      if(password === re_password){
        this.userService
            .register(this.user.name, this.user.email, this.user.password)
            .subscribe(res => {
                                console.log('Successfully signed up!');
                                this.status = 'success';
                                // reset default values after success
                                this.user = new User('','','','',false,[],[],[], "newbie");
                                this.registerFormControl.reset();
                              }, 
                      error => {
                                console.log(<any>error);
                                this.status = 'error';
                              });
      }
      else{
        window.alert("Passwords are not equal. Please, reintroduce your password.")
      }
    }
  }
  
}
