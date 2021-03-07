import { Component, OnInit } from '@angular/core';
import {FormControl, Validators,FormGroup} from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthFirebaseService } from '../../../services/auth-firebase.service';

@Component({
  selector: 'app-verify-email-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.css']
})
export class VerifyEmailPageComponent implements OnInit {

  loginFormControl = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ])
  });

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<VerifyEmailPageComponent>,
    private auth: AuthFirebaseService) {
    iconRegistry.addSvgIcon(
      'close',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/close.svg'));
   }

  ngOnInit(): void {
  }

  closeWindow(){
    this.dialogRef.close();
  }

  send(){
    let email = this.loginFormControl.value.email;
    this.auth.resetPassword(email);
    this.closeWindow();
  }

}
