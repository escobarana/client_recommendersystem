import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export interface User {
  id: string;
  name: string;
  email: string;
  admin: boolean;
  role: string;
}

@Component({
  selector: 'app-admin-newbies',
  templateUrl: './admin-newbies.component.html',
  styleUrls: ['./admin-newbies.component.css']
})

export class AdminNewbiesComponent implements OnInit {

  allUsers = [];

  editData: FormGroup;

  pageEvent: PageEvent;
  pageIndex:number;
  pageSize:number;
  lowValue:number;
  highValue:number;
  sizeOptions;

  displayedColumns: string[] = ['name', 'email', 'role', 'accept', 'decline'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
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

  ngOnInit(): void {
    this.editData = this.formBuilder.group({
      role: ['']
    });
   }

  mapUsers(users){
    let array: User[] = [];
    users.forEach(element => {
      if(element.name != undefined && element.email != undefined && element.role === "newbie"){
        let user: User = {
          id: element._id.toString(),
          name: element.name.toString(),
          email: element.email.toString(),
          admin: element.admin.toString(),
          role: element.role.toString()
        };
        array.push(user);
      }
    });
    this.dataSource = array;
    return array;
  }

  deleteUser(user_email, name){
    var opcion = confirm(`Are you sure you want to delete ${name} ?`);
    if (opcion) {
      this.userService.deleteUser(user_email).subscribe((data) =>{
        console.log("User " , name ,", " , " deleted correctly");
      });
      this.allUsers = this.allUsers.filter(el => el.email != user_email);
      this.dataSource = new MatTableDataSource(this.allUsers);
    }
  }

  acceptUser(user_email){
    this.editData.get('role').setValue("reviewer");
    this.userService.updateUser(user_email, this.editData.value).subscribe(
      res => { 
        console.log("User ", user_email , " accepted.");
        location.reload();
      }, 
      (error) => {
        console.log(error);
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
