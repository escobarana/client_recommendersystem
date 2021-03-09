import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

export interface User {
  name: string;
  email: string;
  admin: boolean;
}

@Component({
  selector: 'admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.css']
})
export class AdminUsersPageComponent implements OnInit {

  allUsers = [];

  pageEvent: PageEvent;
  pageIndex:number;
  pageSize:number;
  lowValue:number;
  highValue:number;
  sizeOptions;

  displayedColumns: string[] = ['name', 'email', 'admin', 'delete'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) {
    this.userService.getAllUsers().subscribe((users) =>{
      this.allUsers = this.mapUsers(users);
      this.dataSource = new MatTableDataSource<User>(this.allUsers);
    })
    this.pageIndex = 0;
    this.pageSize = 8;
    this.lowValue = 0;
    this.highValue = 8;
    this.sizeOptions = [8, 50, 100];
   }

  ngOnInit(): void { }

  mapUsers(users){
    let array: User[] = [];
    users.forEach(element => {
      if(element.name != undefined && element.email != undefined && element.admin != undefined){
        let user: User = {
          name: element.name.toString(),
          email: element.email.toString(),
          admin: element.admin.toString()
        };
        array.push(user);
      }
    });
    this.dataSource = array;
    return array;
  }

  deleteUser(email,name){
    var opcion = confirm(`Are you sure you want to delete ${name} ?`);
    console.log(opcion);
    if (opcion===true) {
      this.userService.deleteUser(email).subscribe(() =>{
        console.log("User " + name +", " + email + " deleted correctly");
      });
      this.allUsers = this.allUsers.filter(el => el.email != email);
      this.dataSource = new MatTableDataSource(this.allUsers);
    }
  }

  updateAdminUser(email,value,name){
    this.userService.updateAdminUser(email, value).subscribe(
      res => {
        this.dataSource = new MatTableDataSource(this.allUsers);
        console.log("User " + name + ", " + email + " updated admin value.");
      }, 
      error => {
        console.log(<any>error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handlePage(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

}
