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

    if(l.length === 0){ 
      this.accepted.forEach(app => {
        if(app.url.includes("play.apple")){
          l.push(app);
        }
      })
    }

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

    if(l.length === 0){
      this.accepted.forEach(app => {
        if(app.url.includes("play.google")){
          l.push(app);
        }
      })
    }

    return l
  }

  setLists(){
    this.db.getFinalAccept()
    .then((toAccept_apps)=>{
        this.accepted = JSON.parse(JSON.stringify(toAccept_apps));
        this.isLoaded = true;
    }).catch(err => console.error(err));
  }
  
  filterByStoreAccepted(){
    if(this.os === "IOS"){
      return this.filterByAppleStore();
    }else{
      return this.filterByGoogleStore();
    }
  }
}
