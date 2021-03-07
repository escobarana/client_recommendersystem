import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment_server, environment_r } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public url: string;

  constructor(private http:HttpClient) {
      this.url = environment_server.apiUrl;
   }

   getPatients(){
     let finalUrl = this.url + '/api/forms';
     return this.http.get<any>(finalUrl);
   }
}
