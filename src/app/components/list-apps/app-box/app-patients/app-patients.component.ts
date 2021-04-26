import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-app-patients',
  templateUrl: './app-patients.component.html',
  styleUrls: ['./app-patients.component.css'],
  providers:[DatabaseService]
})
export class AppPatientsComponent implements OnInit {

  app;

  constructor(public dialogRef: MatDialogRef<AppPatientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public db:DatabaseService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'close',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/close.svg'));
        this.app = this.data.app;
    }
  ngOnInit(): void {
    window.scrollTo(0,0);
    this.app = this.data.app;
  }

  openUrl(){
    window.open(this.app.url, '_blank');
  }
  
  closeWindow(){
    this.dialogRef.close();
  }
  
}
