import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment_server, environment_r } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public url: string;
  token: string;

  constructor(private http:HttpClient, private userService: UserService) {
    this.token = userService.getToken();
      this.url = environment_server.apiUrl;
   }

   getPatients(){
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    let finalUrl = this.url + '/api/forms';
    return this.http.get<any>(finalUrl, {headers: headers});
   }

   patientForm(date, email, age, gender, os, answers){
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    // POST these details to API server
    console.log("Retrieving form data...");
    let finalUrl = this.url + '/api/newform';
    return this.http.post<any>(finalUrl, { date: date, email: email, age: age, gender: gender, os: os, answers: answers }, {headers: headers});
  }
}
