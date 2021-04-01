import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})

export class PatientFormComponent implements OnInit {
  
  patientFormControl: FormGroup;

  answers= {
    maritalStatus: "", 
    height: "", 
    weight: "", 
    hasCoexistence: false, 
    coexistencePeople: {
      couple: false,
      children: false,
      familyMember: false,
      grandchildren: false,
      partner: false
    },  
    hasChildren: false, 
    numberOfChildren: "0", 
    placeOfResidence: "", 
    studiesLevel: "", 
    workStatus: "", 
    levelOfActivity: "", 
    cancerType: "", 
    elapsedTime: "", 
    treatmentReceived: {
      local: false,
      systemic: false,
      none: false
    }, 
    activities: {
      swimming: false,
      running: false,
      walking: false,
      bicycle: false,
      basketball: false,
      tennis: false,
      football: false,
      other: false
    }
  };

  

  formVisibility: Boolean = false;
  coexistanceY: Boolean = false;
  childrenY: Boolean = false;

  maritalStatus: String[] = ["Soltero","Casado","Divorciado","Separado","Viudo"];
  studiesOpt: String[] = ["Sin estudios", "Estudios primarios (certificado de escolaridad)", "Graduado escolar", "Estudios secundarios o Bachillerato elemental",
                          "Bachillerato superior", "Formación profesional (primer grado)", "Formación profesional (segundo grado)", "Diplomatura",
                          "Licenciatura", "Doctorado"];
  workOpt: String[] = ["Jornada completa", "Jornada parcial", "Desempleado", "Jubilado", "Estudiante"];
  cancerOpt: String[] = ["Cáncer de mama", "Cáncer colorrectal"];

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

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private toastr: ToastrService,
              private patientService: PatientService ) { }

  ngOnInit(): void {
    this.patientFormControl = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        os: ['',Validators.required],
        age: ['', [Validators.required, Validators.min(0)]],
        gender: ['',Validators.required],
        weight: ['', [Validators.required, Validators.min(0)]],
        height: ['', [Validators.required, Validators.min(100)]],

        // marital status
        maritalstatus: ['',Validators.required],

        // coexistence
        coexistence: ['',Validators.required],
        coexistencePeople1: [''],
        coexistencePeople2: [''],
        coexistencePeople3: [''],
        coexistencePeople4: [''],
        coexistencePeople5: [''],

        // children
        children: ['',Validators.required],
        numChildren: ['', Validators.min(0)],

        // place of residence
        residence: ['', Validators.required],

        // studies level
        studies: ['', Validators.required],

        // work status
        work: ['', Validators.required],

        // level of activity
        level: ['', Validators.required],

        // cancer type
        cancer: ['', Validators.required],

        // elapsed time
        elapsedTime: [''],

        // treatments
        treatment1: [''],
        treatment2: [''],
        treatment_none: [''],

        // activities
        activity_swim: [''],
        activity_run: [''],
        activity_walk: [''],
        activity_bike: [''],
        activity_basket: [''],
        activity_tennis: [''],
        activity_football: [''],
        activity_other: [''],

        q1daysweek: ['', [Validators.required, Validators.min(0), Validators.max(7)]],
        q1b: [''],
        q2hoursday: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
        q2minutesday: ['', [Validators.required, Validators.min(0), Validators.max(60)]],
        q2c: [''],
        q3daysweek: ['', [Validators.required, Validators.min(0), Validators.max(7)]],
        q3b: [''],
        q4hoursday: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
        q4minutesday: ['', [Validators.required, Validators.min(0), Validators.max(60)]],
        q4c: [''],
        q5daysweek: ['', [Validators.required, Validators.min(0), Validators.max(7)]],
        q5b: [''],
        q6hoursday: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
        q6minutesday: ['', [Validators.required, Validators.min(0), Validators.max(60)]],
        q6c: [''],
        q7hoursday: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
        q7minutesday: ['', [Validators.required, Validators.min(0), Validators.max(60)]],
        q7c: ['']
    });
  }

  showForm(){
    this.formVisibility = true;
    console.log("Showing IPAQ Questionnaire...");
  }

  showCoexistencePeople(){
    this.coexistanceY = true;
    this.answers.hasCoexistence = true;

    console.log("Showing coexistance people...");
  }

  hideCoexistencePeople(){
    this.coexistanceY = false;
    this.answers.hasCoexistence = false;

    console.log("Hiding coexistance people...");     
  }

  showNumChildren(){
    this.childrenY = true;
    this.answers.hasChildren = true;

    console.log("Showing number of children...");
  }

  hideNumChildren(){
    this.childrenY = false;
    this.answers.hasChildren = false;

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
    console.log("The email address is ", this.patientFormControl.value.email);


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

    this.answers.height = this.patientFormControl.get('height').value;
    this.answers.weight = this.patientFormControl.get('weight').value;
    this.answers.maritalStatus = this.patientFormControl.get('maritalstatus').value;
    this.answers.placeOfResidence = this.patientFormControl.get('residence').value;
    this.answers.levelOfActivity = this.patientFormControl.get('level').value;
    this.answers.numberOfChildren = this.patientFormControl.get('numChildren').value;
    this.answers.elapsedTime = this.patientFormControl.get('elapsedTime').value;
    this.answers.maritalStatus = this.patientFormControl.get('maritalstatus').value.toString();
    this.answers.workStatus = this.patientFormControl.get('work').value.toString();
    this.answers.studiesLevel= this.patientFormControl.get('studies').value.toString();
    this.activitiesHandler();
    this.treatmentHandler();
    this.optionsCoexistence();

    this.patientService.patientForm(Date.now(), email, age, gender, os, this.answers).subscribe( 
      res => {
        console.log("Formulario enviado por ", email);
      }, err =>{
        console.log(err);
      });

    console.log('Form data pushed to the database!');
  }

  optionsCoexistence(){
    this.answers.coexistencePeople.children = this.patientFormControl.get('coexistencePeople2').value;
    this.answers.coexistencePeople.couple = this.patientFormControl.get('coexistencePeople1').value;
    this.answers.coexistencePeople.familyMember = this.patientFormControl.get('coexistencePeople3').value;
    this.answers.coexistencePeople.grandchildren = this.patientFormControl.get('coexistencePeople4').value;
    this.answers.coexistencePeople.partner = this.patientFormControl.get('coexistencePeople5').value;

  }

  activitiesHandler(){

    this.answers.activities.swimming = this.patientFormControl.get('activity_swim').value;
    this.answers.activities.running = this.patientFormControl.get('activity_run').value;
    this.answers.activities.walking = this.patientFormControl.get('activity_walk').value;
    this.answers.activities.bicycle = this.patientFormControl.get('activity_bike').value;
    this.answers.activities.basketball = this.patientFormControl.get('activity_basket').value;
    this.answers.activities.tennis = this.patientFormControl.get('activity_tennis').value;
    this.answers.activities.football = this.patientFormControl.get('activity_football').value;
    this.answers.activities.other = this.patientFormControl.get('activity_other').value;
  }

  treatmentHandler(){
    this.answers.treatmentReceived.local = this.patientFormControl.get('treatment1').value;
    this.answers.treatmentReceived.systemic = this.patientFormControl.get('treatment2').value;
    this.answers.treatmentReceived.none = this.patientFormControl.get('treatment_none').value;
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
