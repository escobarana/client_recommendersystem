import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from '../admin-patient-form.component';
import * as moment from 'moment';

@Component({
  selector: 'patients-list',
  templateUrl: './patients-list.html',
  styleUrls: ['./patients-list.css']
})
export class PatientsListComponent implements OnInit {

  allPatients = [];
  displayedColumns: string[] = ['date', 'email', 'os', 'gender', 'age'];
  dataSource;

  pageEvent: PageEvent;
  pageIndex:number;
  pageSize:number;
  lowValue:number;
  highValue:number;
  sizeOptions;

  addCancerFormControl: FormGroup;
  cancerType: string;

  @Output() datos = new EventEmitter();
  
  constructor(private patientService: PatientService) {
    this.patientService.getPatients().subscribe((patients) =>{
      this.allPatients = this.mapPatients(patients);
      this.dataSource = new MatTableDataSource<Patient>(this.allPatients);
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
          age: element.age.toString()
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

}
