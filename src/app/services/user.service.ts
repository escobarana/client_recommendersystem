import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment_server, environment_r } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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
    let headers = new HttpHeaders({ 'Authorization': this.getToken()});
    return this.http.get<any>(this.url + '/api/allUsers', { headers: headers});
  }

  // returns the user object given its id
  getUser(user_email){
    let headers = new HttpHeaders({ 'Authorization': this.getToken()});
    return this.http.get<any>(this.url + `/api/allUsers/${user_email}`, { headers: headers});
  }

  deleteUser(user_email:any): Observable<any>{

    let headers = new HttpHeaders({ 'Authorization': this.getToken()});
    let API_URL = `${this.url}/api/deleteUser/${user_email}`;
    return this.http.delete(API_URL, { headers: headers}).pipe(
        catchError(this.handleError)
      )
  }

  updateUser(user_email, data): Observable<any>{

    let headers = new HttpHeaders({ 'Authorization': this.getToken() });
    let API_URL = `${this.url}/api/updateUser/${user_email}`;
    return this.http.put(API_URL, JSON.parse(JSON.stringify(data)), { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
  }
  
  resetPassword(email:string) {
    window.alert("Please, check your email inbox.");
      console.log("Send password reset email");
  }


  /// LISTS ON EACH USER ///
  
  updateListAccepted(user_email, app): Observable<any>{ // add app to list_recommend
    let headers = new HttpHeaders({ 'Authorization': this.getToken() });
    let url = this.url + `/api/update_recommend/${user_email}`;
    return this.http.put<any>(url, JSON.parse(JSON.stringify(app)), { headers: headers });//.map(res => res);
  }

  updateListRemoved(user_email, app): Observable<any>{ // add app to list_removed
    let headers = new HttpHeaders({ 'Authorization': this.getToken() });
    let url = this.url + `/api/update_removed/${user_email}`;
    return this.http.put<any>(url, JSON.parse(JSON.stringify(app)), { headers: headers }); //.map(res => res);
  };

  updateListAssing(user_email, app): Observable<any>{ // add app to list_assigned
    let headers = new HttpHeaders({ 'Authorization': this.getToken() });
    let url = this.url + `/api/update_assigned/${user_email}`;
    return this.http.put<any>(url, JSON.parse(JSON.stringify(app)), { headers: headers }); //.map(res => res);
  };

  removeFromListAssign(user_email, appId): Observable<any>{ // remove app from list_assign
    let headers = new HttpHeaders({ 'Authorization': this.getToken() });
    let url = this.url + `/api/remove_assigned/${user_email}`;
    return this.http.put<any>(url, { appId: appId }, { headers: headers });
  }

}
