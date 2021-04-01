import { Component, OnInit,Inject,Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from '../../../../services/database.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css'],
  providers:[DatabaseService]
})
export class AppDetailsComponent implements OnInit {

  @Output() deletedApp = new EventEmitter(); //for normal users

  app;

  review = {
    recommend: {
      typeActivity: {
        aerobic:false,
        anaerobic:false,
        indifferent:false,
        others:{
          swim:false,
          running:false,
          walk:false,
          bike:false,
          dance:false
        }
      },
      previousExercise:"0",
      preference:{
        solo:false,
        group:false,
        indifferent:false
      },
      gender:{
        female:false,
        male:false,
        preferNotSay:false
      }
    },
    remove: {
      ovulation:false,
      pregnancy:false,
      hypnosis:false,
      longevity:false,
      baby:false,
      membership:false,
      meditation:false,
      yoga:false,
      pilates:false,
      relax:false,
      mind:false,
      food:false,
      sleep:false,
      tarot:false,
      kids:false,
      pets:false,
      medication:false,
      nutrition:false,
      burnCalories:false,
      weightLoss:false,
      freeTrial:false,
      purchaseSubscription:false,
      fatBurn:false,
      highIntensity:false,
      wearableDevice:false,
      bodySculptor:false,
      ituneAccount:false,
      other:false
    },
    user:""
  }

  optRemove: string[] = ['Ovulation', 'Pregnancy', 'Hypnosis', 'Longevity',
                          'Baby','Membership','Mediation','Yoga','Pilates',
                          'Relax','Mind','Food','Sleep','Tarot','Kids','Pets',
                          'Medication','Nutrition','Burn calories','Weight loss',
                          'Free trial','Purchase subscription','Fat burn',
                          'High intensity','Wearable device','Body sculptor',
                          'Itune account','Other'];
  identity;

  constructor(public dialogRef: MatDialogRef<AppDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public db:DatabaseService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private userService: UserService) {
      this.identity = userService.getIdentity();
      iconRegistry.addSvgIcon(
        'close',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/close.svg'));
    }

  ngOnInit() {
    window.scrollTo(0,0);
    this.app = this.data.app;
  }

  openUrl(){
    window.open(this.app.url, '_blank');
  }
  
  closeWindow(){
    this.dialogRef.close();
  }

  async onNoClick() {
    let user = this.userService.getIdentity();
    this.review.user = user.email;
    let data = {
      appId:this.app.appId,
      description:this.app.description,
      title:this.app.title,
      url:this.app.url,
      icon:this.app.icon
    }
    this.db.appsRemovedByReviewer(data.appId, data.description, data.title, data.url, data.icon, this.review).subscribe(
      res => {
        console.log("App ", data.title, " assigned to remove.");
      }, 
      (error) => {
        console.log(error);
      });
    this.userService.updateListRemoved(user.email,data).subscribe(
      res => {
        console.log("Update list_remove from ", user.email);
      }, 
      (error) => {
        console.log(error);
      });;
    await this.userService.removeFromListAssign(user.email,data.appId).subscribe(
      res => {
        console.log("Remove app from list_assign from ", user.email);
      }, 
      (error) => {
        console.log(error);
      });
    this.getUserAgain(); //elimino de localstorage
    this.deletedApp.emit(data);
    this.dialogRef.close();
  }

  async onYesClick() {
    let user = this.userService.getIdentity();
    this.review.user = user.email;
    let data = {
      appId:this.app.appId,
      description:this.app.description,
      title:this.app.title,
      url:this.app.url,
      icon:this.app.icon
    }
    this.db.appsRecommendedByReviewer(data.appId, data.description, data.title, data.url, data.icon, this.review).subscribe(
      res => {
        console.log("App ", data.title, " assigned to recommend.");
      }, 
      (error) => {
        console.log(error);
      }); //guardo review en la app to recommend
    this.userService.updateListAccepted(user.email,data).subscribe(
      res => {
        console.log("Updated list_recommend from ", user.email);
      }, 
      (error) => {
        console.log(error);
      }); //guardo en lista aceptadas del usuaro de db
    await this.userService.removeFromListAssign(user.email,data.appId).subscribe(
      res => {
        console.log("Removed reviewed app from ", user.email, " list_assigned.");
      }, 
      (error) => {
        console.log(error);
      }); //elimino de lista assign de user
    this.getUserAgain(); //elimino de localstorage
    this.deletedApp.emit(data); //elimino de la lista local, subo al padre la app
    this.dialogRef.close();
  }

  private getUserAgain(){
    this.userService.getIdentity();
  }

  radioActivity(event){
    if(event.value === "1"){
      this.review.recommend.typeActivity.aerobic = true;
      this.review.recommend.typeActivity.anaerobic = false;
      this.review.recommend.typeActivity.indifferent = false;
    }
    else if(event.value === "2"){
      this.review.recommend.typeActivity.aerobic = false;
      this.review.recommend.typeActivity.anaerobic = true;
      this.review.recommend.typeActivity.indifferent = false;
    }
    else if(event.value === "3"){
      this.review.recommend.typeActivity.aerobic = false;
      this.review.recommend.typeActivity.anaerobic = false;
      this.review.recommend.typeActivity.indifferent = true;
    }
  }

  optionsActivity(category,event){
    if(category === 'swim'){
      this.review.recommend.typeActivity.others.swim = event.checked;
    }
    else if(category === 'running'){
      this.review.recommend.typeActivity.others.running = event.checked;
    }
    else if(category === 'walk'){
      this.review.recommend.typeActivity.others.walk = event.checked;
    }
    else if(category === 'bike'){
      this.review.recommend.typeActivity.others.bike = event.checked;
    }
    else if(category === 'dance'){
      this.review.recommend.typeActivity.others.dance = event.checked;
    }
  }

  radioExercise(event){
    if(event.value === "1"){
      this.review.recommend.previousExercise = "Bajo";
    }
    else if(event.value === "2"){
      this.review.recommend.previousExercise = "Medio";
    }
    else if(event.value === "3"){
      this.review.recommend.previousExercise = "Alto";
    }
  }

  radioPreference(event){
    if(event.value === "1"){
      this.review.recommend.preference.solo = true;
      this.review.recommend.preference.group = false;
      this.review.recommend.preference.indifferent = false;
    }
    else if(event.value === "2"){
      this.review.recommend.preference.solo = false;
      this.review.recommend.preference.group = true;
      this.review.recommend.preference.indifferent = false;
    }
    else if(event.value === "3"){
      this.review.recommend.preference.solo = false;
      this.review.recommend.preference.group = false;
      this.review.recommend.preference.indifferent = true;
    }
  }

  radioGender(event){
    if(event.value === "1"){
      this.review.recommend.gender.female = true;
      this.review.recommend.gender.male = false;
      this.review.recommend.gender.preferNotSay = false;
    }
    else if(event.value === "2"){
      this.review.recommend.gender.female = false;
      this.review.recommend.gender.male = true;
      this.review.recommend.gender.preferNotSay = false;
    }
    else if(event.value === "3"){
      this.review.recommend.gender.female= false;
      this.review.recommend.gender.male = false;
      this.review.recommend.gender.preferNotSay = true;
    }
  }

  optionsRemove(opt,event){
    if(opt === 'Ovulation'){
      this.review.remove.ovulation = event.checked;
    }  
    else if(opt === 'Pregnancy'){
      this.review.remove.pregnancy = event.checked;
    }
    else if(opt === 'Hypnosis'){
      this.review.remove.hypnosis = event.checked;
    }
    else if(opt === 'Longevity'){
      this.review.remove.longevity = event.checked;
    }
    else if(opt === 'Baby'){
      this.review.remove.baby = event.checked;
    }
    else if(opt === 'Membership'){
      this.review.remove.membership = event.checked;
    }
    else if(opt === 'Mediation'){
      this.review.remove.meditation = event.checked;
    }
    else if(opt === 'Yoga'){
      this.review.remove.yoga = event.checked;
    }
    else if(opt === 'Pilates'){
      this.review.remove.pilates = event.checked;
    }
    else if(opt === 'Relax'){
      this.review.remove.relax = event.checked;
    }
    else if(opt === 'Mind'){
      this.review.remove.mind = event.checked;
    }
    else if(opt === 'Food'){
      this.review.remove.food = event.checked;
    }
    else if(opt === 'Sleep'){
      this.review.remove.sleep = event.checked;
    }
    else if(opt === 'Tarot'){
      this.review.remove.tarot = event.checked;
    }
    else if(opt === 'Kids'){
      this.review.remove.kids = event.checked;
    }
    else if(opt === 'Pets'){
      this.review.remove.pets = event.checked;
    }
    else if(opt === 'Medication'){
      this.review.remove.medication = event.checked;
    }
    else if(opt === 'Body sculptor'){
      this.review.remove.bodySculptor = event.checked;
    }
    else if(opt === 'Itune account'){
      this.review.remove.ituneAccount = event.checked;
    }
    else if(opt === 'Other'){
      this.review.remove.other = event.checked;
    }
    else if(opt === 'Purchase subscription'){
      this.review.remove.purchaseSubscription = event.checked;
    }
    else if(opt === 'Fat burn'){
      this.review.remove.fatBurn = event.checked;
    }
    else if(opt === 'High intensity'){
      this.review.remove.highIntensity = event.checked;
    }
    else if(opt === 'Wearable device'){
      this.review.remove.wearableDevice = event.checked;
    }
    else if(opt === 'Nutrition'){
      this.review.remove.nutrition = event.checked;
    }
    else if(opt === 'Burn calories'){
      this.review.remove.burnCalories = event.checked;
    }
    else if(opt === 'Weight loss'){
      this.review.remove.weightLoss = event.checked;
    }
    else if(opt === 'Free trial'){
      this.review.remove.freeTrial = event.checked;
    }
  }

}
