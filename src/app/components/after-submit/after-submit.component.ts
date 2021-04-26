import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';
import { ListAppsComponent } from '../list-apps/list-apps.component';

@Component({
  selector: 'app-after-submit',
  templateUrl: './after-submit.component.html',
  styleUrls: ['./after-submit.component.css']
})
export class AfterSubmitComponent implements OnInit {

  isLoaded: boolean = false;
  isSearching: boolean = false;

  accepted = [];
  removed = [];
  @ViewChildren(ListAppsComponent) chviewChildren: QueryList<ListAppsComponent>;
  constructor(private db:DatabaseService) {
    this.setLists();
   }

  ngOnInit(): void {
  }

  setLists(){
    this.db.getFinalAccept()
    .then((toAccept_apps)=>{
        this.accepted = JSON.parse(JSON.stringify(toAccept_apps));
        this.isLoaded = true;
    }).catch(err => console.error(err));
  }
  
  filterByStoreAccepted(){
    return this.accepted;
  }
}
