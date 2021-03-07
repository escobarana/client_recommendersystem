import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from 'src/app/services/patient.service'; 

export interface Patient {
  email: string;
  os: string;
  gender: string;
  age: number;
}

@Component({
  selector: 'app-admin-patient-form',
  templateUrl: './admin-patient-form.component.html',
  styleUrls: ['./admin-patient-form.component.css']
})
export class AdminPatientFormComponent implements OnInit {

  addCancerFormControl: FormGroup;
  cancerType: string;

  @Output() datos = new EventEmitter();
  
  constructor(private formBuilder: FormBuilder,
    private patient: PatientService) { 
}

  ngOnInit(): void {
    this.addCancerFormControl = this.formBuilder.group({
      cancer: ['', Validators.required]
    });
  }

  addCancerType(){
    console.log("Adding cancer type: " + this.cancerType);
    //localStorage.setItem('cancerType', this.cancerType);
  }

  emitirEvento(event: Event){
    this.datos.emit({
      'nombre':this.addCancerFormControl.get('cancer').value
    });
  }

  onSubmit() {

    console.log("Handling the submit button");
    console.log("The cancer type to be added is " + this.addCancerFormControl.value.cancer);
    
    console.log('Form data pushed!');

    // this.router.navigate['localhost:4200/patient'];
    
    // toastr message
    // this.toastr.success('¡Formulario enviado con éxito!', 'Formulario del paciente');
    
  }

}
