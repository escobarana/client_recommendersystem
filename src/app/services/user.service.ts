import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment_server, environment_r } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity;
  public token: string;

  constructor(private http: HttpClient) { 
    this.url = environment_server.apiUrl; // http://156.35.163.172:3000
  }

  register(user_name, user_email, user_password){

    return this.http.post<any>(this.url + '/api/newUser', {name: user_name, email: user_email, password: user_password});
  }

  signup(user, gettoken=null){
    // get token
    if(gettoken != null){
      user.gettoken = gettoken; // true
    }

    let params = JSON.stringify(user);

    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<any>(this.url + '/api/login', params, { headers: headers });
  }


  getIdentity(){
    
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != "undefined"){ 
      this.identity = identity; 
    }else{ 
      this.identity = null; 
    }

    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token != "undefined"){ this.token = token; }else{ this.token = null; }

    return this.token;
  }

  getAllUsers() {
    return this.http.get<any>(this.url + '/api/allUsers');
  }

  deleteUser(user_email){
    // MongoDB
    return this.http.delete<any>(this.url + '/api/deleteUser/' + `${user_email}`);
  }

  updateAdminUser(user_email, valueAdmin){
    return this.http.put<any>(this.url + '/api/updateUser/' + `${user_email}`, `${valueAdmin}`);
  }

}
