import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

export interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'asign-page',
  templateUrl: './asign-page.component.html',
  styleUrls: ['./asign-page.component.css']
})
export class AsignPageComponent implements OnInit {

  allUsers = [];

  pageIndex:number;
  pageSize:number;
  lowValue:number;
  highValue:number;

  displayedColumns: string[] = ['select','name', 'email'];
  dataSource;
  selection;

  toReview;
  toRemove;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<AsignPageComponent>,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) {
    this.userService.getAllUsers().subscribe((users) =>{
      this.allUsers = this.mapUsers(users);
      this.dataSource = new MatTableDataSource<User>(this.allUsers);
      this.selection = new SelectionModel(true, []);
    })
    this.pageIndex = 0;
    this.pageSize = 6;
    this.lowValue = 0;
    this.highValue = 6;
    iconRegistry.addSvgIcon(
      'close',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/close.svg'));
   }

  ngOnInit(): void {
    this.toReview = this.addTypeField(this.data.toReview, "review");
    this.toRemove = this.addTypeField(this.data.toRemove, "remove");
  }

  private addTypeField(array, type){
    let apps = [];
    array.forEach(element => {
      let app = {
        appId: element.appId,
        url: element.url,
        icon: element.icon,
        title: element.title,
        description: element.description,
        type: type
      }
      apps.push(app);
    });
    return apps;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mapUsers(users){
    let array: User[] = [];
    users.forEach(element => {
      if(element.name != undefined && element.email != undefined && element.admin != undefined && element.role.toString() !== "newbie"){
        if(element.admin.toString() !== "true"){
          let user: User = {
            name: element.name.toString(),
            email: element.email.toString()
          };
          array.push(user);
        }
      }
    });
    this.dataSource = array;
    return array;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  sendAssign(){
    if(this.selection.selected.length > 0){
      this.selection.selected.forEach(element => {
        if(this.toReview.length > 0){
          this.toReview.forEach(app1 => {
            this.userService.updateListAssing(element.email, app1).subscribe(
              res => {
                console.log("User ",  element.name , " assigned to review.");
              }, 
              (error) => {
                console.log(error);
              });
          }); 
        }
        if(this.toRemove.length > 0){
          this.toRemove.forEach(app2 => {
            this.userService.updateListAssing(element.email, app2).subscribe(
              res => {
                console.log("User ", element.name, " assigned to remove.");
              }, 
              (error) => {
                console.log(error);
              });
          });
        }
      });
 
      let users = this.selection.selected;
      let l = "";
      for (let i = 0; i < users.length; i++) {
        if(i === 0){
          l = users[i].name;
        }
        else if(i < users.length - 2){
          l = l + `, ${users[i].name}`;
        }
        else if (i === users.length - 1){
          l = l + ` and ${users[i].name}`;
        }
      }
      window.alert(`Apps were assign to: ${l}`);
      this.dialogRef.close();

    }else{
      window.alert("Please, select the users you want to assign apps.");
    }
  }

  closeWindow(){
    this.dialogRef.close();
  }

}
