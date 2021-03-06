import { Component, OnInit,ViewChildren,QueryList,ChangeDetectorRef  } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { ListAppsComponent } from '../list-apps/list-apps.component'
import { DatabaseService } from '../../services/database.service';
import { MatDialog } from '@angular/material/dialog';
import { AsignPageComponent } from './asign-page/asign-page.component';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'explore',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css'],
  providers:[StoresService,DatabaseService]
})
export class ExplorePageComponent implements OnInit {

  keywordFormControl: FormGroup;

  isLoaded: boolean = false;
  isSearching: boolean = false;

  showBoth: boolean = true;
  showApple: boolean = false;
  showGoogle: boolean = false;

  toReview = [];
  toDelete = [];

  keywords = [];

  isDefault: boolean = true;

  bothApps;
  listAppsGoogle;
  listAppsApple;
 

  isAdmin:boolean;
  identity;

  @ViewChildren(ListAppsComponent) chviewChildren: QueryList<ListAppsComponent>;

  constructor(private formBuilder: FormBuilder, private play: StoresService, private cd: ChangeDetectorRef, private db:DatabaseService,
    public asignDialog: MatDialog, private userService: UserService) { 
      this.identity = userService.getIdentity();
      this.admin();
      this.keywords.push("exercise");
      // Update the apps automatically every 30 days
      //this.intervalID = setInterval(this.updateApps, 2592000000); // every 30 days = 2592000000 ms
  }

  ngOnInit() {
    this.keywordFormControl = this.formBuilder.group(
      {
        keyword: [''],
      });
    if(this.userService.getIdentity().admin){
      this.getFirstApps();
    }
    else{
      this.getAppsFromUser();
    }
  }

  addToKeywords(){
    let keyword = this.keywordFormControl.get('keyword').value;
    this.keywords.push(keyword.toString())
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
          }).catch(err => console.error(err));
        }).catch(err => console.error(err));
      }).catch(err => console.error(err));
    }).catch(err => console.error(err));
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
    let user_email = (this.userService.getIdentity()).email;
    this.userService.getUser(user_email).subscribe(
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

  filterByStoreReviewAll(){
    if(this.showBoth){
      l = []
      this.toReview.forEach(app => {
       l.push(app);
      });
      this.toDelete.forEach(app => {
        l.push(app);
      });

      return l;
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
      });

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
      });

      return l;
    }
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

  admin() {
    this.isAdmin = this.userService.getIdentity().admin;
  }

  resetApps(){
    var opcion = confirm(`Are you sure you want to reset all your assigned apps ?`);
    let user = this.userService.getIdentity();
    if(opcion){
      user.list_assign.forEach(element => {
        this.userService.removeFromListAssign(user.email, element.appId).subscribe(res=>{
          console.log("User ", user.name , " reset all apps")
        }, err =>{
          console.log(err)
        });
      });
    }
    
    window.setInterval(this.refresh, 1000); 
  }

  refresh() {
    window.location.reload();
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
    console.log("Getting apps from Google Play...")
    rawGoogleApps.then((raw_google)=>{
      var keyGoogleApps = this.play.getKeywordsGoogleApps();
      keyGoogleApps.then((key_google)=>{
        var descGoogleApps = this.play.getDescriptionGoogleApps();
        descGoogleApps.then((desc_google)=>{
          var rawAppleApps = this.play.getRawAppleApps();
          console.log("Getting apps from Apple Store...")
          rawAppleApps.then((apple)=>{
            var keysAppleApps = this.play.getKeywordsAppleApps();
            keysAppleApps.then((key_apple)=>{
              var descAppleApps = this.play.getDescriptionAppleApps();
              descAppleApps.then((desc_apple)=>{
                var bothstores = this.play.getBothLists();
                console.log("Sending apps for analysis...")
                bothstores.then((both)=>{
                  var results = this.play.getListApps();
                  results.then((list_R)=>{
                    let list = JSON.parse(JSON.stringify(list_R));
                    let list_details_accept = this.getDetails(both,list.accept);
                    let list_details_remove = this.getDetails(both,list.delete);
                    let p = new Promise(() => {
                      list_details_accept.forEach(element => {
                        this.db.sendSystemToReview(element);
                      });
                      list_details_remove.forEach(element => {
                        this.db.sendSystemtoDelete(element);
                      });
                    })
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
  }

  startAnalysis(){
    if(!this.isLoaded){
      this.isSearching = true;
       this.updateApps(); // 
    }
  }*/

  /*startAgain(){
    localStorage.clear();
    this.listAppsGoogle = [];
    this.listAppsApple = [];
    this.isLoaded = false;
    this.play.isLoaded = false;
    this.bothApps = [];
    this.startAnalysis();
  }*/

  /*private removeFromList(toRemove:any,fromList:any){
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
  }*/

  /*filterTopics(topic:number){
    var l = [];
    this.listApps.forEach(app => {
      if(app.topic == topic){
        l.push(app);
      }
    })
    return l;
  }*/

  removeSelections(){
    let toRemove = [];

    if(this.isAdmin){
      this.chviewChildren.forEach((item) =>{
        let list = item.checkApps();
        list.forEach((app) =>{
          if(app.checked){
            let p ={
              appId: app.appId,
              url: app.url,
              icon: app.icon,
              title: app.title,
              description: app.description
            }
            toRemove.push(p)
          }
        });
      });

      if(toRemove.length == 0){
        window.alert( "Please, first select apps to remove." );
      }else{
        var opcion = confirm(`Are you sure you want to directly delete the selected apps ?`);
        let user = this.userService.getIdentity();
        if(opcion){
          toRemove.forEach(element => {
            let data = {
              appId:element.appId,
              description:element.description,
              title:element.title,
              url:element.url,
              icon:element.icon
            }
            this.userService.updateListRemoved(user.email, data).subscribe(res=>{
              console.log("Admin user ", user.name , " deleted apps")
            }, err =>{
              console.log(err)
            });
            this.db.appsRemovedByAdmin(element).subscribe();
          });
        }
        
        window.setInterval(this.refresh, 1000);
        window.alert( "Apps were sent to be definitive." );
      }
    }
  }

}
