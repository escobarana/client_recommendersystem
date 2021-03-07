import { Component, OnInit,ViewChildren,ChangeDetectorRef,QueryList } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { ListAppsComponent } from '../list-apps/list-apps.component';
import { AuthFirebaseService } from '../../services/auth-firebase.service';
import { DownloadFileService } from '../../services/download-file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'final-page',
  templateUrl: './final-page.component.html',
  styleUrls: ['./final-page.component.css'],
  providers:[DownloadFileService]
})
export class FinalPageComponent implements OnInit {

  isLoaded: boolean = false;
  isSearching: boolean = false;

  showBoth: boolean = true;
  showApple: boolean = false;
  showGoogle: boolean = false;

  accepted = [];
  removed = [];

  @ViewChildren(ListAppsComponent) chviewChildren: QueryList<ListAppsComponent>;

  constructor(private db:DatabaseService,private auth: AuthFirebaseService,
    private download:DownloadFileService, private userService: UserService) {
      this.setLists();
  }

  ngOnInit() {}

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
    await this.userService.getIdentity().subscribe((data) => {
      this.userService.getIdentity().admin(data.uid).subscribe((user) => {
        this.isAdmin = user.admin;
      })
    })
  }

  setLists(){
    let toAccept = this.db.getFinalAccept();
    toAccept.then((toAccept_apps)=>{
      let toDelete = this.db.getFinalRemove();
      toDelete.then((toDelete_apps)=>{
        this.accepted = JSON.parse(JSON.stringify(toAccept_apps));
        this.removed = JSON.parse(JSON.stringify(toDelete_apps));
        this.isLoaded = true;
      });
    });
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

  isAdmin():boolean{
    let user = JSON.parse(localStorage.getItem('user'));
    if(user.admin.toString() === "true"){
      return true;
    }
    else{
      return false;
    }
  }

  restoreApps(){
    if(this.isAdmin){
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
          this.db.deleteAppFromFinalAccept(element);
        });
        toRemove.forEach(element => {
          this.deleteFromList(this.removed, element);
          this.db.deleteAppFromFinalRemove(element);
        });
        window.alert( "Apps have been restored." );
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

  downloadReviewsApps(){
    var listA = JSON.stringify(this.accepted);
    this.download.downLoadFile(listA,"application/json","apps_accepted");
    var listB = JSON.stringify(this.removed);
    this.download.downLoadFile(listB,"application/json","apps_removed");
  }

}
