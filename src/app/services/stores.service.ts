//Para que no de problemas el CORS, se crea el proxy conf y 
//despues se añadio como opcion en angular.json en el server
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment_server, environment_r } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  urlServer = environment_server.apiUrl;
  urlR = environment_r.apiUrl;

  constructor(private http: HttpClient) {}
  
  getRawGoogleApps() {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var url = this.urlServer + '/api/apps/google/raw';
    return this.http.get<any>(url).toPromise();
  }

  getDescriptionGoogleApps() {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var url = this.urlServer + '/api/apps/google/descriptionApps';
    return this.http.get<any>(url).toPromise();
  }

  getKeywordsGoogleApps() {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var url = this.urlServer + '/api/apps/google/keywords';
    return this.http.get<any>(url).toPromise();
  }

  getRawAppleApps() {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var url = this.urlServer + '/api/apps/apple/raw';
    return this.http.get<any>(url).toPromise();
  }

  getDescriptionAppleApps() {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var url = this.urlServer + '/api/apps/apple/descriptionApps';
    return this.http.get<any>(url).toPromise();
  }

  getKeywordsAppleApps() {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var url = this.urlServer + '/api/apps/apple/keywords';
    return this.http.get<any>(url).toPromise();
  }

  getBothLists(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var url = this.urlServer + '/api/bothStores';
    return this.http.get<any>(url).toPromise();
  }

  getListApps() {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var url = this.urlServer + '/api/apps/listApps';
    return this.http.get<any>(url).toPromise();
  }

  getFromUrl(){
    console.log("Sending apps to R...");
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var url = this.urlR + `/dataMining?url=https%3A%2F%2Frecommended-server.herokuapp.com%2Fapi%2FbothStores`;
    return this.http.get<any>(url, { headers: headers }).toPromise();
  }

  postBothApps(list){
    console.log("Getting both lists of apps...");
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var url = this.urlServer + '/api/bothStores';
    return this.http.post<any>(url, JSON.parse(JSON.stringify(list)), {headers:headers}); //.toPromise();
  }

}
