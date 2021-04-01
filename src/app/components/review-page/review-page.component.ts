import { Component, OnInit,ViewChildren,ChangeDetectorRef,QueryList } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { DatabaseService } from '../../services/database.service';
import { ListAppsComponent } from '../list-apps/list-apps.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css'],
  providers:[StoresService,DatabaseService]
})
export class ReviewPageComponent implements OnInit {

  isLoaded: boolean = false;
  isSearching: boolean = false;

  showBoth: boolean = true;
  showApple: boolean = false;
  showGoogle: boolean = false;

  identity;

  all = [];
  accepted = [];
  removed = [];

  @ViewChildren(ListAppsComponent) chviewChildren: QueryList<ListAppsComponent>;

  constructor(private db:DatabaseService, private userService: UserService) {
    this.identity = userService.getIdentity();
    this.setLists();
  }

  ngOnInit() {
    this.userService.getIdentity();
  }

  alert() {
    window.alert('ERROR. Please, try again.');
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

  async admin() {
    await this.identity.subscribe((user) => {
      this.identity.admin = user.admin;
    })
  }

  setLists(){
    this.userService.getUser((this.userService.getIdentity()).email).subscribe(
      res => {
        if(res.admin){
          let toAccept = this.db.getReviewAccept();
          toAccept.then((toAccept_apps)=>{
            let toDelete = this.db.getReviewRemove();
            toDelete.then((toDelete_apps)=>{
              this.accepted = JSON.parse(JSON.stringify(toAccept_apps));
              this.removed = JSON.parse(JSON.stringify(toDelete_apps));
              this.isLoaded = true;
            });
          });
        }else{
          if(res.list_recommend != null && res.list_recommend != undefined){
            this.accepted = res.list_recommend;
          }
          if(res.list_remove != null && res.list_remove != undefined){
            this.removed = res.list_remove;
          }
          this.compareWithFinals();
        }
      }, err => {
        console.log(err);
      }
    );
    
  }

  compareWithFinals(){
    let accepted = this.db.getFinalAccept();
    accepted.then((accepted_apps)=>{
      let deleted = this.db.getFinalRemove();
      deleted.then((deleted_apps)=>{
        let listA = JSON.parse(JSON.stringify(accepted_apps));
        let listB = JSON.parse(JSON.stringify(deleted_apps));
        this.accepted = this.filterArraysApps(this.accepted,listA);
        this.removed = this.filterArraysApps(this.removed,listB);
        // console.log(this.accepted)
        this.isLoaded = true;
      });
    });
  }

  private filterArraysApps(listA, listB){
    listA.forEach(el1 => {
      let bool = false;
      listB.forEach(el2 => {
          if(el1.appId === el2.appId){
              el1.disabled = true;
              bool = true;
          }
      });
      if(!bool){
        el1.disabled = false;
      }
    });  
    return listA;
  }

  filterByStoreAccepted(){
    if(this.showBoth){
      return this.accepted;
    }
    else{
      var l = [];
      this.accepted.forEach(app => {
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

  filterByStoreRemoved(){
    if(this.showBoth){
      return this.removed;
    }
    else{
      var l = [];
      this.removed.forEach(app => {
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

  isEmpty(){
    if(this.accepted.length <= 0 && this.removed.length <= 0){
      return true;
    }
    return false;
  }

  //Lo guardo en la lista final y lo elimino de la lista de reviews
  acceptApp(){
    if(this.userService.getIdentity().admin){
      let toRemove = [];
      let toAccept = [];
      this.chviewChildren.forEach((item) =>{
        let list = item.checkApps();
        list.forEach((app) =>{
          if(app.checked){
            if(app.type === "accepted"){
              this.accepted.map(el => {
                if(el.appId === app.appId){
                  toAccept.push(el)
                }
              });
            }
            else if(app.type === "removed"){
              this.removed.map(el => {
                if(el.appId === app.appId){
                  toRemove.push(el)
                }
              });
            }
          }
        });
      });
      if(toRemove.length > 0 || toAccept.length > 0){
        toAccept.forEach(element => {
          this.db.appsAcceptedByAdmin(element).subscribe();
          this.deleteFromList(this.accepted, element);
          this.db.deleteAppFromReviewAccept(element.appId).subscribe();
        });
        toRemove.forEach(element => {
          this.db.appsRemovedByAdmin(element).subscribe();
          this.deleteFromList(this.removed, element);
          this.db.deleteAppFromReviewRemove(element.appId).subscribe();
        });
        window.alert( "Apps were sent to be definitive." );
      }
      else{
        window.alert( "Please, first select apps to aprove from the list." );
      }
    }
  }

  private deleteFromList(list,el){
    let app = (element) => element.appId === el.appId;
    if (list.findIndex(app) > -1) {
      list.splice(list.findIndex(app) , 1);
    }
  }

  //No lo guardo en la lista final, solo lo elimino de la lista de reviews
  removeApp(){
    if(this.userService.getIdentity().admin){
      let toRemove = [];
      let toAccept = [];
      this.chviewChildren.forEach((item) =>{
        let list = item.checkApps();
        list.forEach((app) =>{
          if(app.checked){
            if(app.type === "accepted"){
              this.accepted.map(el => {
                if(el.appId === app.appId){
                  toAccept.push(el)
                }
              });
            }
            else if(app.type === "removed"){
              this.removed.map(el => {
                if(el.appId === app.appId){
                  toRemove.push(el)
                }
              });
            }
          }
        });
      });
      if(toRemove.length > 0 || toAccept.length > 0){
        toAccept.forEach(element => {
          this.deleteFromList(this.accepted, element);
          this.db.deleteAppFromReviewAccept(element.appId).subscribe();
        });
        toRemove.forEach(element => {
          this.deleteFromList(this.removed, element);
          this.db.deleteAppFromReviewRemove(element.appId).subscribe();
        });
      }
      else{
        window.alert( "Please, first select apps to remove from the list." );
      }
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////FUTURE FUNCTIONALITY = SHOW ANALYSIS FROM R/////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /*restoreApps(){
    if(this.identity.admin){
      let toRestore = [];
      let list = this.childComp.checkApps();
        list.forEach((app) =>{
          if(app.checked){
            toRestore.push(app.appId)
          }
      });
      console.log("toRestore:",toRestore)
      if(toRestore.length > 0){
        let restore = this.db.restoreRemovedApps(toRestore);
        restore.subscribe(
          error => console.log(error),
          () => location.reload()
        );
      }
      this.cd.detectChanges();
    }
    else{
      //apps enviadas al admin para valoracion
    }
  }

  filterStore(){
    this.bothApps = this.listApps;
    this.googleApps = [];
    this.appleApps = [];
    this.listApps.forEach(app => {
      if(app.url.includes("play.google")){
        this.googleApps.push(app)
      }
      else if(app.url.includes("apps.apple")){
        this.appleApps.push(app);
      }
    })
  }

  getApps(){
    var removedApps = this.db.getRemovedApps();
    removedApps.subscribe((apps) => {
      console.log(apps)
      this.listApps = JSON.parse(JSON.stringify(apps));
      this.isLoaded = true;
      this.filterStore();
    });
  }*/

}
