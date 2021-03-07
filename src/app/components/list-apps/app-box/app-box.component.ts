import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppDetailsComponent } from './app-details/app-details.component';
import { AppReviewersComponent } from './app-reviewers/app-reviewers.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box',
  templateUrl: './app-box.component.html',
  styleUrls: ['./app-box.component.css'],
  providers: [AppDetailsComponent]
})
export class AppBoxComponent implements OnInit {

  @Input() app;
  @Input() isLoaded:boolean;
  @Output() deletedApp = new EventEmitter(); //for normal users
  @Input() disabled:boolean;

  checked:boolean;

  constructor(public detailDialog: MatDialog, private router:Router) {
    this.checked = false;
    this.disabled = false;
  }

  ngOnInit() {
    this.disabled = this.app.disabled;
    //console.log(this.app)
  }

  click(){
    this.checked = !this.checked;
  }

  openDialog(): void {
    if((!this.isAdmin() && (this.router.url.includes("assign") || this.router.url.includes("reviewapps")))
        || (this.isAdmin() && this.router.url.includes("assign"))){
      let ref = this.detailDialog.open(AppDetailsComponent, {
        width: '1200px',
        height: '700px',
        maxHeight: window.innerHeight + 'px',
        data: {
          app: this.app
        },
        disableClose: true
      });
      ref.componentInstance.deletedApp.subscribe((data) => {
        this.deletedApp.emit(data);
      })
    }
    else if(this.isAdmin() && (this.router.url.includes("reviewapps") || this.router.url.includes("finalapps"))){
      this.detailDialog.open(AppReviewersComponent, {
        width: '700px',
        height: '700px',
        maxHeight: window.innerHeight + 'px',
        data: {
          app: this.app
        },
        disableClose: true
      });
    }
  }

  isAdmin():boolean{
    let user = JSON.parse(localStorage.getItem('user'));
    if(user.admin.toString() === "true"){
      return true;
    }
    else{
      return false;
    }
  }

}
