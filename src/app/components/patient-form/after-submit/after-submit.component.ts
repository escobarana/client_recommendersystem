import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ListAppsComponent } from '../../list-apps/list-apps.component';

@Component({
  selector: 'app-after-submit',
  templateUrl: './after-submit.component.html',
  styleUrls: ['./after-submit.component.css']
})
export class AfterSubmitComponent implements OnInit {

  isLoaded: boolean = false;
  isSearching: boolean = false;

  os;
  activities;

  accepted = [];
  removed = [];
  @ViewChildren(ListAppsComponent) chviewChildren: QueryList<ListAppsComponent>;
  constructor(private db:DatabaseService) {
    this.setLists();
    this.activities = localStorage.getItem("activities");
    this.os = localStorage.getItem("os");
   }

  ngOnInit(): void {

  }

  filterByAppleStore(){
    var activitiesJson = JSON.parse(this.activities);
    var l = []
    this.accepted.forEach(app => {
      if(app.url.includes("apps.apple")){
        if(app.reviews[0].recommend.typeActivity.others.swim===(activitiesJson.swimming)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.running===(activitiesJson.running)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.walk===(activitiesJson.walking)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.bike===(activitiesJson.bicycle)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.basket===(activitiesJson.basketball)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.tennis===(activitiesJson.tennis)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.football===(activitiesJson.football)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.dance===(activitiesJson.dance)){
          l.push(app);
        }
      }
    });

    return l
  }

  getAllApple(){
    var l = [] 

    this.accepted.forEach(app => {
      if(app.url.includes("apps.apple")){
        l.push(app);
      }
    })
    
    return l
  }

  filterByGoogleStore(){
    var activitiesJson = JSON.parse(this.activities);
    var l = []
    this.accepted.forEach(app => {
      if(app.url.includes("play.google")){
        if(app.reviews[0].recommend.typeActivity.others.swim===(activitiesJson.swimming)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.running===(activitiesJson.running)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.walk===(activitiesJson.walking)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.bike===(activitiesJson.bicycle)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.basket===(activitiesJson.basketball)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.tennis===(activitiesJson.tennis)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.football===(activitiesJson.football)){
          l.push(app);
        }else if(app.reviews[0].recommend.typeActivity.others.dance===(activitiesJson.dance)){
          l.push(app);
        }
      }
    });

    return l
  }

  getAllGoogle(){
    var l = []

    this.accepted.forEach(app => {
      if(app.url.includes("play.google")){
        l.push(app);
      }
    })

    return l
  }

  setLists(){
    this.db.getFinalAccept()
    .then((toAccept_apps)=>{
        this.accepted = JSON.parse(JSON.stringify(toAccept_apps));
        this.isLoaded = true;
    }).catch(err => console.log(err));
  }
    
  filterByStoreAccepted(){
    if(this.os === "IOS"){
      if(this.filterByAppleStore().length>0){
        return this.filterByAppleStore();
      }else if(this.getAllApple().length>0){
        return this.getAllApple()
      }
    }else if(this.os === "Android"){
      if(this.filterByGoogleStore().length>0){
        return this.filterByGoogleStore();
      }else if(this.getAllGoogle().length>0){
        return this.getAllGoogle()
      }
    }else{
      return this.accepted
    }
  }
}
