import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from '../admin-patient-form.component';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { json2csv } from 'json-2-csv';
import { fs } from 'file-saver';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'patients-list',
  templateUrl: './patients-list.html',
  styleUrls: ['./patients-list.css']
})
export class PatientsListComponent implements OnInit {

  allPatients = [];
  displayedColumns: string[] = ['date', 'email', 'os', 'gender', 'age', 'ans'];
  dataSource;
  patientsData= [];

  pageEvent: PageEvent;
  pageIndex:number;
  pageSize:number;
  lowValue:number;
  highValue:number;
  sizeOptions;

  resultActivities = "";
  resultTreatment = "";
  resultCoexistance = "";

  @Output() datos = new EventEmitter();
  
  constructor(public detailDialog: MatDialog, private patientService: PatientService, private userService: UserService, private download:DownloadFileService) {
    this.patientService.getPatients().subscribe((patients) =>{
      this.patientsData = patients;
      this.allPatients = this.mapPatients(patients);
      this.dataSource = new MatTableDataSource<Patient>(this.allPatients);
      this.resultActivities = "";
      this.resultCoexistance = "";
      this.resultTreatment = "";
    })
    
    this.pageIndex = 0;
    this.pageSize = 8;
    this.lowValue = 0;
    this.highValue = 8;
    this.sizeOptions = [8, 50, 100];
  }

  ngOnInit(): void { }

  mapPatients(patients){

    let array: Patient[] = [];
    patients.forEach(element => {
      if(element.email != undefined){
        let patient: Patient = {
          date: moment.default(element.form_date).format("D MMMM YYYY").toString(),
          email: element.email.toString(),
          os: element.os.toString(),
          gender: element.gender.toString(),
          age: element.age.toString(),
          answers: element.answers
        };
        array.push(patient);
      }
    });
    this.dataSource = array;
    return array;
  }

  handlePage(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  isAdmin():boolean{
    if(this.userService.getIdentity() !== null){
      return this.userService.getIdentity().admin;
    }else{
      return false;
    } 
  }

  downloadPatientDataJSON(){
    var list_patients = JSON.stringify(this.patientsData, null, "\t");
    this.download.downLoadFile(list_patients,"application/json","patients");
  }

  downloadPatientDataCSV(){
    const list_patients = JSON.parse(JSON.stringify(this.patientsData, null, "\t"));
    json2csv(list_patients, (err, csv) => {if (err) { throw err; }
      this.download.downLoadCSVFile(csv,"application/text","patients");
    });
  }

  getActivities(user_answers){
    this.resultActivities = "";

    let myListOfActivities = user_answers[0].activities; 
    
    if(myListOfActivities["swimming"]===true){
      this.resultActivities+="swimming ";
    }if(myListOfActivities["basketball"]===true){
      this.resultActivities+="basketball ";
    }if(myListOfActivities["bicycle"]===true){
      this.resultActivities+="bicycle ";
    }if(myListOfActivities["football"]===true){
      this.resultActivities+="football ";
    }if(myListOfActivities["running"]===true){
      this.resultActivities+="running ";
    }if(myListOfActivities["tennis"]===true){
      this.resultActivities+="tennis ";
    }if(myListOfActivities["walking"]===true){
      this.resultActivities+="walking ";
    }if(myListOfActivities["other"]!==""){
      this.resultActivities+=myListOfActivities["other"];
    }
  }

  getCoexistancePeople(user_answers){
    this.resultCoexistance = "";

    let myListOfPople= user_answers[0].coexistencePeople; 

    if(myListOfPople["children"] === true){
      this.resultCoexistance += "kids ";
    }if(myListOfPople["couple"] === true){
      this.resultCoexistance += "couple ";
    }if(myListOfPople["familyMember"] === true){
      this.resultCoexistance += " another family memeber(aunt/uncle/cousin/...) ";
    }if(myListOfPople["grandChildren"] === true){
      this.resultCoexistance += "grand children ";
    }if(myListOfPople["partner"] === true){
      this.resultCoexistance += "partner ";
    }
  }

  getTreatment(user_answers){
    this.resultTreatment="";

    let myListOfTreatments= user_answers[0].treatmentReceived; 

    if(myListOfTreatments["local"] === true){
      this.resultTreatment += "Tratamiento local mediante cirugía o radioterapia "
    }if(myListOfTreatments["systemic"] === true){
      this.resultTreatment += "Tratamiento sistémico mediante quimioterapia, hormonoterapia o terapia biológica "
    }if(myListOfTreatments["none"] === true){
      this.resultTreatment += "No treatment received "
    }
  }

  viewData(user_email, user_answers){
    this.getActivities(user_answers);
    this.getCoexistancePeople(user_answers);
    this.getTreatment(user_answers);
    this.detailDialog.open(PatientViewComponent, {
      width: '700px',
      height: '700px',
      maxHeight: window.innerHeight + 'px',
      data: {
        user: user_email,
        answers: user_answers,
        activities: this.resultActivities,
        coexistance: this.resultCoexistance,
        treatment: this.resultTreatment
      },
      disableClose: true
    });
  }
}
