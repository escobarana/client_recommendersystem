import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../../services/auth-firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})

export class PatientFormComponent implements OnInit {
  
  patientFormControl: FormGroup;

  formVisibility: Boolean = false;
  coexistanceY: Boolean = false;
  childrenY: Boolean = false;

  maritalStatus: String[] = ["Soltero","Casado","Divorciado","Separado","Viudo"];
  studiesOpt: String[] = ["Sin estudios", "Estudios primarios (certificado de escolaridad)", "Graduado escolar", "Estudios secundarios o Bachillerato elemental",
                          "Bachillerato superior", "Formación profesional (primer grado)", "Formación profesional (segundo grado)", "Diplomatura",
                          "Licenciatura", "Doctorado"];
  workOpt: String[] = ["Jornada completa", "Jornada parcial", "Desempleado", "Jubilado", "Estudiante"];
  cancerOpt: String[] = ["Cáncer de mama", "Cáncer colorrectal"];
  newCancer;


  levelW: String = null;
  levelController: String = null;
  q1noactivity: Boolean = false;
  q3noactivity: Boolean = false;
  q5noactivity: Boolean = false;

  q1daysweek = 0;
  q2hoursday = 0;
  q2minutesday = 0;
  q3daysweek = 0;
  q4hoursday = 0;
  q4minutesday = 0;
  q5daysweek = 0;
  q6hoursday = 0;
  q6minutesday = 0;
  q7hoursday = 0;
  q7minutesday = 0;

  constructor(private auth: AuthFirebaseService, 
              private formBuilder: FormBuilder, 
              private router: Router,
              private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.patientFormControl = this.formBuilder.group(
      {
        email: ['', Validators.required, Validators.email],
        os: ['',Validators.required],
        age: ['', Validators.required, Validators.min(0)],
        gender: ['',Validators.required],
        weight: ['', Validators.required, Validators.min(0)],
        height: ['', Validators.required, Validators.min(100)],
        maritalstatus: ['',Validators.required],
        coexistence: ['',Validators.required],
        coexistencePeople1: [''],
        coexistencePeople2: [''],
        coexistencePeople3: [''],
        coexistencePeople4: [''],
        coexistencePeople5: [''],
        children: ['',Validators.required],
        numChildren: ['', Validators.min(0)],
        residence: ['', Validators.required],
        studies: ['', Validators.required],
        work: ['', Validators.required],
        level: ['', Validators.required],
        cancer: ['', Validators.required],
        elapsedTime: ['', Validators.required],
        treatment: ['', Validators.required],
        activity: ['', Validators.required],

        q1daysweek: ['', Validators.required, Validators.min(0), Validators.max(7)],
        q1b: [''],
        q2hoursday: ['', Validators.required, Validators.min(0), Validators.max(24)],
        q2minutesday: ['', Validators.required, Validators.min(0), Validators.max(60)],
        q2c: [''],
        q3daysweek: ['', Validators.required, Validators.min(0), Validators.max(7)],
        q3b: [''],
        q4hoursday: ['', Validators.required, Validators.min(0), Validators.max(24)],
        q4minutesday: ['', Validators.required, Validators.min(0), Validators.max(60)],
        q4c: [''],
        q5daysweek: ['', Validators.required, Validators.min(0), Validators.max(7)],
        q5b: [''],
        q6hoursday: ['', Validators.required, Validators.min(0), Validators.max(24)],
        q6minutesday: ['', Validators.required, Validators.min(0), Validators.max(60)],
        q6c: [''],
        q7hoursday: ['', Validators.required, Validators.min(0), Validators.max(24)],
        q7minutesday: ['', Validators.required, Validators.min(0), Validators.max(60)],
        q7c: ['']
    });
  }

  addCancerType(){}

  verDatos(event: Event){
    console.log(event);
    this.newCancer = event;
  }

  showForm(){
    this.formVisibility = true;
    console.log("Showing IPAQ Questionnaire...");
  }

  showCoexistencePeople(){
    this.coexistanceY = true;
    console.log("Showing coexistance people...");
  }

  hideCoexistencePeople(){
    this.coexistanceY = false;
    console.log("Hiding coexistance people...");     
  }

  showNumChildren(){
    this.childrenY = true;
    console.log("Showing number of children...");
  }

  hideNumChildren(){
    this.childrenY = false;
    console.log("Hiding numbre of children...");     
  }

  hideQuestion2(){
    this.q1noactivity = true;
    console.log("Hiding q4...");
  }

  hideQuestion4(){
    this.q3noactivity = true;
    console.log("Hiding q4...");
  }

  hideQuestion6(){
    this.q5noactivity = true;
    console.log("Hiding q6...");
  }

  send() {
    console.log("Handling the submit button");
    this.formData();
    console.log("The email address is " + this.patientFormControl.value.email);
    console.log(this.patientFormControl);

    this.router.navigateByUrl('/success');
    
    // toastr message
    this.toastr.success('¡Formulario enviado con éxito!', 'Formulario del paciente');
    
    //this.patientFormControl.reset()
  }

  formData(){
    let email = this.patientFormControl.get('email').value;
    let os = this.patientFormControl.get('os').value;
    let age = this.patientFormControl.get('age').value;
    let gender = this.patientFormControl.get('gender').value;
    let maritalstatus = this.patientFormControl.get('maritalstatus').value;
    let weight = this.patientFormControl.get('weight').value;
    let coexistence = this.patientFormControl.get('coexistence').value;
    let coexistencePeople1 = this.patientFormControl.get('coexistencePeople1').value;
    let coexistencePeople2 = this.patientFormControl.get('coexistencePeople2').value;
    let coexistencePeople3 = this.patientFormControl.get('coexistencePeople3').value;
    let coexistencePeople4 = this.patientFormControl.get('coexistencePeople4').value;
    let coexistencePeople5 = this.patientFormControl.get('coexistencePeople5').value;
    let children = this.patientFormControl.get('children').value;
    let numChildren = this.patientFormControl.get('numChildren').value;
    let residence = this.patientFormControl.get('residence').value;
    let studies = this.patientFormControl.get('studies').value;
    let work = this.patientFormControl.get('work').value;
    let level = this.patientFormControl.get('level').value;
    let cancer = this.patientFormControl.get('cancer').value;
    let elapsedTime = this.patientFormControl.get('elapsedTime').value;
    let treatment = this.patientFormControl.get('treatment').value;

    this.auth.patientForm(Date.now(), email, age, gender, maritalstatus, weight, coexistence, coexistencePeople1, coexistencePeople2, coexistencePeople3, coexistencePeople4,
                          coexistencePeople5, children, numChildren, residence, studies, work, level, cancer, elapsedTime, treatment).subscribe( data=> {
      console.log(data)
    });
    console.log('Form data pushed to the database!');
    this.router.navigate['/home'];
  }

  /*
  Category 1 - Low: This is the lowest level of physical activity. Those individuals who not meet criteria
                for Categories 2 or 3 are considered to have a ‘low’ physical activity level.
  
  Category 2 - Moderate: The pattern of activity to be classified as ‘moderate’ is either of the following criteria:
                a) 3 or more days of vigorous-intensity activity of at least 20 minutes per day
                OR
                b) 5 or more days of moderate-intensity activity and/or walking of at least 30
                minutes per day
                OR
                c) 5 or more days of any combination of walking, moderate-intensity or vigorous
                intensity activities achieving a minimum Total physical activity of at least 600
                MET-minutes/week.

    Category 3 - High: A separate category labelled ‘high’ can be computed to describe higher levels of
                participation.
                The two criteria for classification as ‘high’ are:
                a) vigorous-intensity activity on at least 3 days achieving a minimum Total
                physical activity of at least 1500 MET-minutes/week
                OR
                b) 7 or more days of any combination of walking, moderate-intensity or
                vigorous-intensity activities achieving a minimum Total physical activity
                of at least 3000 MET-minutes/week.
   */

  calculateLevel(){
    console.log("Calculando nivel IPAQ...")
    if( (this.q1daysweek >= 3 && this.q2hoursday != 0) || (this.q1daysweek && this.q2minutesday >= 20) || 
              (this.q3daysweek >= 5 || (this.q6hoursday != 0 || this.q6minutesday >= 30)) || 
              ((this.q1daysweek+this.q3daysweek+this.q5daysweek) > 5 && this.metScore() >= 600) ){
      this.levelW = "Moderado";
      this.levelController ="";
    }else if( (this.q1daysweek >= 3 && this.metScore() >= 1500) || 
              ((this.q1daysweek+this.q3daysweek+this.q5daysweek) >= 5 && this.metScore() >= 3000) ){
      this.levelW="Alto";
      this.levelController ="";
    }else{
      this.levelW = "Bajo";
      this.levelController ="";
    }

    this.formVisibility = false;
  }

  metScore(){
    let total = 0;

    let walking = 3.3*(this.q6minutesday+(this.q6hoursday*60))*this.q5daysweek;
    let moderate = 4.0*(this.q4minutesday+(this.q4hoursday*60))*this.q3daysweek;
    let vigorous = 8.0*(this.q2minutesday+(this.q2hoursday*60))*this.q1daysweek;


    total=walking+moderate+vigorous;
    return total;
  }

}
