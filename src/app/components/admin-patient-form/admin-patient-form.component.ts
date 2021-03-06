import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { PatientService } from 'src/app/services/patient.service'; 
import { UserService } from 'src/app/services/user.service';

export interface Patient {
  date: string;
  email: string;
  os: string;
  gender: string;
  age: number;
  answers: Array<String>;
}

@Component({
  selector: 'app-admin-patient-form',
  templateUrl: './admin-patient-form.component.html',
  styleUrls: ['./admin-patient-form.component.css']
})

export class AdminPatientFormComponent implements OnInit {

  @Output() datos = new EventEmitter();
  
  constructor(private patient: PatientService) { 
  }

  ngOnInit(): void {  }

}
