import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-app-reviewers',
  templateUrl: './app-reviewers.component.html',
  styleUrls: ['./app-reviewers.component.css']
})
export class AppReviewersComponent implements OnInit {

  app;
  reviewers;

  constructor(public dialogRef: MatDialogRef<AppReviewersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public db:DatabaseService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private userService: UserService) {
    iconRegistry.addSvgIcon(
      'close',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/close.svg'));
      this.reviewers = [];
      this.app = this.data.app;
      this.reviewers = this.getReviewers();
   }

  ngOnInit(): void { }

  closeWindow(){
    this.dialogRef.close();
  }

  getReviewers(){
    let r = [];
    this.userService.getAllUsers().subscribe((users) =>{
      users.forEach(el => {
        this.app.reviews.forEach(review => {
          if(review.user === el.email){
            let u = {
              name: el.name,
              email: el.email
            }
            r.push(u);
          }
        });
      });
    })
    return r;
  }

}
