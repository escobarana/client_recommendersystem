import { Component, OnInit,ViewChildren,QueryList,ChangeDetectorRef  } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { ListAppsComponent } from '../list-apps/list-apps.component'
import { DatabaseService } from '../../services/database.service';
import { MatDialog } from '@angular/material/dialog';
import { AsignPageComponent } from './asign-page/asign-page.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'explore',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css'],
  providers:[StoresService,DatabaseService]
})
export class ExplorePageComponent implements OnInit {

  isLoaded: boolean;
  isSearching: boolean;

  toReview = [];
  toDelete = [];

  isDefault: boolean;

  showBoth: boolean;
  showApple: boolean;
  showGoogle: boolean;

  isAdmin:boolean;
  identity;

  @ViewChildren(ListAppsComponent) chviewChildren: QueryList<ListAppsComponent>;

  constructor(private play: StoresService, private db:DatabaseService,
    public asignDialog: MatDialog, private userService: UserService) { 
    this.isSearching= false;
    this.showBoth = true;
    this.isDefault = true;
    this.identity = userService.getIdentity();
    this.admin();
  }

  ngOnInit() {
    if(this.userService.getIdentity().admin){
      this.getFirstApps();
    }
    else{
      this.getAppsFromUser();
    }
  }

  getFirstApps(){
    let toReview = this.db.getToReview();
    toReview.then((toReview_apps)=>{
      let toDelete = this.db.getToDelete();
      toDelete.then((toDelete_apps)=>{
        let accepted = this.db.getFinalAccept();
        accepted.then((accepted_apps)=>{
          let removed = this.db.getFinalRemove();
          removed.then((removed_apps)=>{
            let listA = JSON.parse(JSON.stringify(accepted_apps));
            let listB = JSON.parse(JSON.stringify(removed_apps));
            let accepted = listA.concat(listB);
            let listC = JSON.parse(JSON.stringify(toReview_apps));
            let listD = JSON.parse(JSON.stringify(toDelete_apps));
            this.toReview = this.filterArraysApps(listC,accepted);
            this.toDelete = this.filterArraysApps(listD,accepted);
            this.isLoaded = true;
          });
        });
      });
    });
  }

  private filterArraysApps(listA, listB){
    let l = [];
    listA.forEach(el1 => {
      let bool = false;
      listB.forEach(el2 => {
          if(el1.appId === el2.appId){
              bool = true;
          }
      });
      if(!bool){
        l.push(el1);
      }
    });  
    return l;
  }

  getAppsFromUser(){ // mostrar apps en To Review y To Delete de 'Assign apps'
    this.userService.getUser((this.userService.getIdentity()).email).subscribe(
      res => {
        if(res.list_assign !== null && res.list_assign !== undefined){
          let list = JSON.parse(JSON.stringify(res.list_assign)) /////
          list.forEach(element => {
            if(element.type === "review"){
              this.toReview.push(element);
            }
            else if(element.type === "remove"){
              this.toDelete.push(element);
            }
          });
        }
      }, err => {
        console.log(err);
      });
    this.isLoaded = true;
  }

  alert() {
    window.alert('ERROR. Please, try again.');
    window.location.reload();
  }

  filterByStoreReview(){
    if(this.showBoth){
      return this.toReview;
    }
    else{
      var l = [];
      this.toReview.forEach(app => {
        if(this.showApple){
          if(app.url.includes("apps.apple")){
            l.push(app);
          }
        }
        else if(this.showGoogle){
          if(app.url.includes("play.google")){
            l.push(app);
          }
        }
      })
      return l;
    }
  }

  filterByStoreDelete(){
    if(this.showBoth){
      return this.toDelete;
    }
    else{
      var l = [];
      this.toDelete.forEach(app => {
        if(this.showApple){
          if(app.url.includes("apps.apple")){
            l.push(app);
          }
        }
        else if(this.showGoogle){
          if(app.url.includes("play.google")){
            l.push(app);
          }
        }
      })
      return l;
    }
  }

  changeToBoth(){
    this.showBoth = true;
    this.showApple = false;
    this.showGoogle = false;
  }

  changeToApple(){
    this.showBoth = false;
    this.showApple = true;
    this.showGoogle = false;
  }

  changeToGoogle(){
    this.showBoth = false;
    this.showApple = false;
    this.showGoogle = true;
  }

  /*setLoadingState(str:string){
    this.loadingState = str;
  }*/

  admin() {
    this.isAdmin = this.userService.getIdentity().admin;
  }

  asignSelectedApps(){
    if(this.isAdmin){
      let toRemove = [];
      let toReview = [];
      this.chviewChildren.forEach((item) =>{
        let list = item.checkApps();
        list.forEach((app) =>{
          if(app.checked){
            if(app.type === "review"){
              let p ={
                appId: app.appId,
                url: app.url,
                icon: app.icon,
                title: app.title,
                description: app.description
              }
              toReview.push(p)
            }
            else if(app.type === "remove"){
              let p ={
                appId: app.appId,
                url: app.url,
                icon: app.icon,
                title: app.title,
                description: app.description
              }
              toRemove.push(p)
            }
          }
        });
      });
      if(toRemove.length > 0 || toReview.length > 0){
        this.openDialog(toReview, toRemove);
      }
      else{
        window.alert( "Please, first select apps to assign." );
      }
    }
  }

  openDialog(toReview, toRemove): void {
    this.asignDialog.open(AsignPageComponent, {
      width: '700px',
      height: '99%',
      maxHeight: window.innerHeight + 'px',
      data: {
        toReview: toReview,
        toRemove: toRemove
      },
      disableClose: true
    });
  }

  isEmpty(){
    if(this.toReview.length <= 0 && this.toDelete.length <= 0){
      return true;
    }
    return false;
  }

  updateApps(){
    this.isLoaded = false;
    var rawGoogleApps = this.play.getRawGoogleApps();
    //this.setLoadingState("Getting apps from Google Play...");
    console.log("Getting apps from Google Play...")
    rawGoogleApps.then((raw_google)=>{
      var keyGoogleApps = this.play.getKeywordsGoogleApps();
      keyGoogleApps.then((key_google)=>{
        var descGoogleApps = this.play.getDescriptionGoogleApps();
        descGoogleApps.then((desc_google)=>{
          var rawAppleApps = this.play.getRawAppleApps();
          //this.setLoadingState("Getting apps from Apple Store...");
          console.log("Getting apps from Apple Store...")
          rawAppleApps.then((apple)=>{
            var keysAppleApps = this.play.getKeywordsAppleApps();
            keysAppleApps.then((key_apple)=>{
              var descAppleApps = this.play.getDescriptionAppleApps();
              descAppleApps.then((desc_apple)=>{
                var bothstores = this.play.getBothLists();
                //console.log(bothstores);
                //this.setLoadingState("Sending apps for analysis...");
                console.log("Sending apps for analysis...")
                bothstores.then((both)=>{
                  var results = this.play.getListApps();
                  //console.log(results);
                  //var results = this.play.getFromUrl();
                  results.then((list_R)=>{
                    let list = JSON.parse(JSON.stringify(list_R));
                    let list_details_accept = this.getDetails(both,list.accept);
                    let list_details_remove = this.getDetails(both,list.delete);
                    let p = new Promise(() => {
                      list_details_accept.forEach(element => {
                        this.db.sendSystemToReview(element).subscribe(res => {
                          console.log(res);
                        }, err => { console.log(err);});
                      });
                      list_details_remove.forEach(element => {
                        this.db.sendSystemtoDelete(element).subscribe(res => {
                          console.log(res);
                        }, err => { console.log(err);});
                      });
                    });
                    p.then(() => {
                      this.getFirstApps();
                    });
                  }, (error)=>{
                    this.alert();
                  })
                }, (error)=>{
                  this.alert();
                })
              }, (error)=>{
                this.alert();
              })
            }, (error)=>{
              this.alert();
            })
          }, (error)=>{
            this.alert();
          })
        }, (error)=>{
          this.alert();
        })
      }, (error)=>{
        this.alert();
      })
    }, (error)=>{
      this.alert();
    })
    location.reload(); // reload page to show new apps
  }

  getDetails(rawList, resultList){
    var list = [];
    rawList = JSON.parse(JSON.stringify(rawList));
    resultList = JSON.parse(JSON.stringify(resultList));
    resultList.forEach(result => {
      rawList.forEach(raw => {
        if(result != null && (raw.description != null || raw.description != undefined)){
          if(result === raw.appId){
            const app = {
              appId: raw.appId,
              title: raw.title,
              url: raw.url,
              icon: raw.icon,
              description: raw.description
            };
            list.push(app)
          }
        }
      });
    });
    this.isLoaded = true;
    return list;
  }









  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////FUTURE FUNCTIONALITY = SHOW ANALYSIS FROM R/////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /*constructor(private play: StoresService,private cd: ChangeDetectorRef, private db:DatabaseService,
    private auth: AuthFirebaseService,public asignDialog: MatDialog) { 
    if(JSON.parse(localStorage.getItem('bothApps')) !== null){
      var apps = JSON.parse(localStorage.getItem('bothApps'));
      this.bothApps = apps;this.listApps = apps;
      this.selectedK = JSON.parse(localStorage.getItem('selectedK'));this.showBoth = true;
      this.showApple = false;this.showGoogle = false;this.filterStore();
      this.isLoaded = true;this.isDefault = false;
    }
    else{
      this.showBoth = true;this.selectedK = '3';this.isSearching= false;
      this.isDefault = true;this.getFirstApps();
    }
    //this.selectedK = '3';
    this.isSearching= false;
  }*/

  /*startAnalysis(){
    if(!this.play.isLoaded){
      this.isSearching = true;
      this.getApps();
    }
  }

  startAgain(){
    localStorage.clear();
    this.listApps = [];
    this.isLoaded = false;
    this.play.isLoaded = false;
    this.play.bothApps = [];
    this.bothApps = [];
    this.selectedK = this.Kvalue;
    this.startAnalysis();
  }

  private removeFromList(toRemove:any,fromList:any){
    let r = [];
    fromList.forEach(el1 => {
        let bool = false;
        toRemove.forEach(el2 => {
          if(el1.appId == el2){
            bool = true;
          }
        });
        if(!bool){
          r.push(el1)
        }
    });
    return r;
  }

  filterTopics(topic:number){
    var l = [];
    this.listApps.forEach(app => {
      if(app.topic == topic){
        l.push(app);
      }
    })
    return l;
  }*/

}
