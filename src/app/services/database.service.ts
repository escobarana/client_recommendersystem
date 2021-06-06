import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment_server} from 'src/environments/environment';
import "rxjs";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  urlServer = environment_server.apiUrl;
  token: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.token = userService.getToken();
   }  


  // Getting data from server 
  
  getToReview(){
    console.log("To review apps...");
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/system/accept', { headers: headers }).toPromise();
  }

  getToReviewCount(){
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/count_accepted/system', { headers: headers });
  }

  getToDelete() {
    console.log("To delete apps...");
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/system/remove', { headers: headers }).toPromise();
  }

  getToDeleteCount() {
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/count_remove/system', { headers: headers });
  }

  getReviewAccept(){
    console.log("Reviewed accepted apps...");
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/review/accept', { headers: headers }).toPromise();
  }

  getReviewRemove(){
    console.log("Reviewed deleted apps...");
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/review/remove', {headers: headers}).toPromise();
  }

  getFinalAccept(){
    console.log("Final accepted apps...");
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/apps_accepted', { headers: headers }).toPromise();
  }

  getCountFinalAcceptIOS(){
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/count_accepted/ios', { headers: headers });
  }

  getCountFinalAcceptAndroid(){
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/count_accepted/android', { headers: headers });
  }

  getFinalRemove(){
    console.log("Final removed apps...");
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/apps_removed', { headers: headers }).toPromise();
  }

  getCountFinalRemoveIOS(){
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/count_removed/ios', { headers: headers });
  }

  getCountFinalRemoveAndroid(){
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/count_removed/android', { headers: headers });
  }

  // Deletting data from server 
  
  deleteAppFromReviewAccept(appId) {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': this.token});
    return this.http.delete(this.urlServer + `/api/delete/revacc/${appId}`,{ headers: headers });//.toPromise()
  }

  deleteAppFromReviewRemove(appId) {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': this.token});
    return this.http.delete(this.urlServer + `/api/delete/revrem/${appId}`,{ headers: headers }); //.toPromise()
  }

  deleteAppFromFinalAccept(appId) {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': this.token});
    return this.http.delete(this.urlServer + `/api/delete/acc/${appId}`,{ headers: headers });//.toPromise()
  }

  deleteAppFromFinalRemove(appId) {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': this.token});
    return this.http.delete(this.urlServer + `/api/delete/rem/${appId}`,{ headers: headers });//.toPromise()
  }

  // Posting data from server 

  sendSystemToReview(app) {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': this.token});
    return this.http.post<any>(this.urlServer + '/api/system_apps_accept', JSON.parse(JSON.stringify(app)), {headers: headers});//.toPromise()
  }

  sendSystemtoDelete(app) {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': this.token});
    return this.http.post<any>(this.urlServer + '/api/system_apps_remove', JSON.parse(JSON.stringify(app)), {headers: headers});//.toPromise()
  }

  appsRecommendedByReviewer(app_appId, app_description, app_title, app_url, app_icon, app_review) {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': this.token});
    return this.http.post<any>(this.urlServer + `/api/apps_review_accept`, {appId: app_appId, description: app_description, title: app_title, url: app_url, icon: app_icon, review: app_review}, {headers: headers});//.toPromise()
  }

  appsRemovedByReviewer(app_appId, app_description, app_title, app_url, app_icon, app_review){
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': this.token});
    return this.http.post<any>(this.urlServer + '/api/apps_review_remove', {appId: app_appId, description: app_description, title: app_title, url: app_url, icon: app_icon, review: app_review}, {headers: headers});//.toPromise()
  }

  appsAcceptedByAdmin(app) {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': this.token});
    return this.http.post<any>(this.urlServer + '/api/apps_accepted', JSON.parse(JSON.stringify(app)), {headers: headers});///.toPromise()
  }

  appsRemovedByAdmin(app) {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': this.token});
    return this.http.post<any>(this.urlServer + '/api/apps_removed', JSON.parse(JSON.stringify(app)), {headers: headers});//.toPromise()
  }
}
