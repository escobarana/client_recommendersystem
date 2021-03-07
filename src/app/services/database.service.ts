import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment_server} from 'src/environments/environment';
import "rxjs";
import { UserService } from './user.service';
//import * as firebase from 'firebase/app';
//import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

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

  getToDelete() {
    console.log("To delete apps...");
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/system/remove', { headers: headers }).toPromise();
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

  getFinalRemove(){
    console.log("Final removed apps...");
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.get(this.urlServer + '/api/apps/apps_removed', { headers: headers }).toPromise();
  }

  // Deletting data from server 
  
  deleteAppFromReviewAccept(app) {
    return this.http.get(this.urlServer + '/api/deleteApp/apps_review_accept/' + `${app.appId}`);//.map(res => res);
    /*let appRef: AngularFirestoreDocument<any> = this.firestore.doc(`apps_review_accept/${app.appId}`);
    appRef.delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch((error) =>  {
        console.error("Error removing document: ", error);
    });*/
  }

  deleteAppFromReviewRemove(app) {
    return this.http.get(this.urlServer + '/api/deleteApp/apps_review_remove/' + `${app.appId}`); //.map(res => res);
    /*let appRef: AngularFirestoreDocument<any> = this.firestore.doc(`apps_review_remove/${app.appId}`);
    appRef.delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });*/
  }

  deleteAppFromFinalAccept(app) {
    return this.http.get(this.urlServer + '/api/deleteApp/apps_accepted/' + `${app.appId}`);//.map(res => res);
    /*let appRef: AngularFirestoreDocument<any> = this.firestore.doc(`apps_accepted/${app.appId}`);
    appRef.delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });*/
  }

  deleteAppFromFinalRemove(app) {
    return this.http.get(this.urlServer + '/api/deleteApp/apps_removed/' + `${app.appId}`);//.map(res => res);
    /*let appRef: AngularFirestoreDocument<any> = this.firestore.doc(`apps_removed/${app.appId}`);
    appRef.delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });*/
  }

  // Posting data from server 

  sendSystemToReview(app) {
    return this.http.get(this.urlServer + '/api/system_apps_accept/' + `${app.appId}`);//.map(res => res);
    /*let appRef: AngularFirestoreDocument<any> = this.firestore.doc(`system_apps_accept/${app.appId}`);
    appRef.set(app, { merge: true });*/
  }

  sendSystemtoDelete(app) {
    return this.http.get(this.urlServer + '/api/system_apps_remove/' + `${app.appId}`);//.map(res => res);
    /*let appRef: AngularFirestoreDocument<any> = this.firestore.doc(`system_apps_remove/${app.appId}`);
    appRef.set(app, { merge: true });*/
  }

  appsRecommendedByReviewer(app, metadata) {
    return this.http.get(this.urlServer + '/api/apps_review_accept/' + `${app.appId}`);//.map(res => res);
    /*let appRef: AngularFirestoreDocument<any> = this.firestore.doc(`apps_review_accept/${app.appId}`);
    appRef.set(app, { merge: true })
    appRef.update({
      reviews: firebase.firestore.FieldValue.arrayUnion(metadata)
    }); */
  }

  appsRemovedByReviewer(app, metadata){
    return this.http.get(this.urlServer + '/api/apps_review_remove/' + `${app.appId}`);//.map(res => res);
    /*let appRef: AngularFirestoreDocument<any> = this.firestore.doc(`apps_review_remove/${app.appId}`);
    appRef.set(app, { merge: true })
    appRef.update({
      reviews: firebase.firestore.FieldValue.arrayUnion(metadata)
    }); */
  }

  appsAcceptedByAdmin(app) {
    return this.http.get(this.urlServer + '/api/apps_accepted/' + `${app.appId}`);//.map(res => res);
   /* let appRef: AngularFirestoreDocument<any> = this.firestore.doc(`apps_accepted/${app.appId}`);
    appRef.set(app, { merge: true });*/
  }

  appsRemovedByAdmin(app) {
    return this.http.get(this.urlServer + '/api/apps_removed/' + `${app.appId}`);//.map(res => res);
    /*let appRef: AngularFirestoreDocument<any> = this.firestore.doc(`apps_removed/${app.appId}`);
    appRef.set(app, { merge: true });*/
  }
}
