import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment_server} from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  urlServer = environment_server.apiUrl; // http://156.163.172:3000
  userData;
  isAdmin: boolean;

  constructor( private http: HttpClient) {
      
  }

  get currentUser() {
    return this.userData;
  }

  patientForm(date, email, age, gender, maritalstatus, weight, coexistence, coexistencePeople1, coexistencePeople2, coexistencePeople3, coexistencePeople4,
    coexistencePeople5, children, numChildren, residence, studies, work, level, cancer, elapsedTime, treatment){
    // POST these details to API server
    console.log("Retrieving form data...");
    return this.http.post('/api/newform', {
      date,
      email,
      age,
      gender,
      maritalstatus,
      weight,
      coexistence,
      coexistencePeople1,
      coexistencePeople2,
      coexistencePeople3,
      coexistencePeople4,
      coexistencePeople5,
      children,
      numChildren,
      residence,
      studies,
      work,
      level,
      cancer,
      elapsedTime,
      treatment
    });
  }

  
  resetPassword(email:string) {
    window.alert("Please, check your email inbox.");
      console.log("Send password reset email");
  }


  /// LISTS ON EACH USER ///
  
  updateListAccepted(user_id, app){
    /*let userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${uid}`);
    console.log(app);
    userRef.update({
      list_recommend: firebase.firestore.FieldValue.arrayUnion(app)
    }).then(function() {
        console.log("Document successfully updated!");
    }).catch(function(error) {
        console.error("Error updating document: ", error);
    });*/
    let url = this.urlServer + '/api/update_recommend/' + `${user_id}` + '/' + `${app.appId}`;
    return this.http.get<any>(url);//.map(res => res);
  }

  updateListRemoved(user_id, app){
    /*let userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${uid}`);
    userRef.update({
      list_remove: firebase.firestore.FieldValue.arrayUnion(app)
    }).then(function() {
        console.log("Document successfully updated!");
    }).catch(function(error) {
        console.error("Error updating document: ", error);
    });*/
    let url = this.urlServer + '/api/update_removed/' + `${user_id}` + '/' + `${app.appId}`;
    return this.http.get<any>(url); //.map(res => res);
  };

  updateListAssing(user_id, list){
    /*let userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${uid}`);
    list.forEach(app => {
      userRef.update({
        list_assign: firebase.firestore.FieldValue.arrayUnion(app)
    }).then(function() {
        console.log("Document successfully updated!");
    }).catch(function(error) {
        console.error("Error updating document: ", error);
    });
    });*/
    list.forEach(app => {
      let url = this.urlServer + '/api/update_assigned/' + `${user_id}` + '/' + `${app.appId}`;
      this.http.get<any>(url); //.map(res => res);
    });
  };

  removeFromListAssign(user_id, appId){
    /*let userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${uid}`);
    let user = JSON.parse(localStorage.getItem('user'));
    let list = user.list_assign.filter(app => app.appId !== appId);
    userRef.set({list_assign:list}, { merge: true }).then(function() {
      console.log("Document successfully updated!");
    }).catch(function(error) {
        console.error("Error updating document: ", error);
    });*/
    let url = this.urlServer + '/api/remove_assigned/' + `${user_id}` + '/' + `${appId}`;
    return this.http.delete<any>(url);
  }
}
