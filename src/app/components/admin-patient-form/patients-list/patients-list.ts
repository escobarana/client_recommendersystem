import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'patients-list',
  templateUrl: './patients-list.html',
  styleUrls: ['./patients-list.css']
})
export class PatientsListComponent implements OnInit {

  allPatients = [];

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
  this.pageIndex = 0;
  this.pageSize = 8;
  this.lowValue = 0;
  this.highValue = 8;
  this.sizeOptions = [8, 50, 100];
}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe( (res:any)=>{
        if(!res.patient){
            
        }else{
            this.allPatients = res.patients;
        }
    },
    err=>{
        console.log(<any> err)
    });
  }

  handlePage(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

}
