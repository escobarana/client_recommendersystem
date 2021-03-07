import { Component, OnInit, Input,ViewChildren,QueryList,ChangeDetectorRef} from '@angular/core';
import { AppBoxComponent } from '../list-apps/app-box/app-box.component';
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'list-apps',
  templateUrl: './list-apps.component.html',
  styleUrls: ['./list-apps.component.css']
})
export class ListAppsComponent implements OnInit {

  @Input() listApps = [];
  @Input() isLoaded: boolean;
  @Input() type: string;

  pageEvent: PageEvent;
  pageIndex:number;
  pageSize:number;
  lowValue:number;
  highValue:number;
  sizeOptions;

  @ViewChildren(AppBoxComponent) chviewChildren: QueryList<AppBoxComponent>;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.pageIndex = 0;
    this.pageSize = 8;
    this.lowValue = 0;
    this.highValue = 8;
    this.sizeOptions = [8, 50, 100];
  }

  checkApps(){
    let checkListApps = [];
    this.chviewChildren.forEach((item) =>{
      var app = {
        appId: item.app.appId,
        title: item.app.title,
        url: item.app.url,
        icon: item.app.icon,
        checked: item.checked,
        type: this.type,
        description: item.app.description
      }
      checkListApps.push(app);
    });
    this.cd.detectChanges();
    return checkListApps;
  }

  handlePage(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  deleteFromList(event){
    let app = (element) => element.appId === event.appId;
    if (this.listApps.findIndex(app) > -1) {
      this.listApps.splice(this.listApps.findIndex(app) , 1);
    }
  }

}
