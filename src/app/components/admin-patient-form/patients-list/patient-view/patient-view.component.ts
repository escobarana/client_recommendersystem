import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {

  answers;

  constructor(public dialogRef: MatDialogRef<PatientViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'close',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/close.svg'));

        console.log(JSON.parse(JSON.stringify(data.answers[0])));
        console.log(data.treatment);
     }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.answers = this.data.answers;
  }

  closeWindow(){
    this.dialogRef.close();
  }

  

}
