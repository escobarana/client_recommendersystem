import { TestBed, inject } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from "rxjs";

const apps = [
  {
    "appId": "Test_appId1",
    "description": "Description",
    "title": "Test app 1",
    "url": "googleplay.com/Test_appId1",
    "reviews":[]
  },
  {
    "appId": "Test_appId2",
    "description": "Description",
    "title": "Test app 2",
    "url": "googleplay.com/Test_appId2",
    "reviews":[]
  },
  {
    "appId": "Test_appId3",
    "description": "Description",
    "title": "Test app 3",
    "url": "googleplay.com/Test_appId3",
    "reviews":[]
  }
  ];

const reviews = {
  to_review:{
    run:true
  },
  to_delete:{
    pregnancy:false
  }
}
const appData =  { appId: 'AppId1', title: 'App 1', url: 'googleplay.com/AppId1', description:'description', icon:'icon.jpg'};

const catchSpy = jasmine.createSpyObj({
  catch: "ERROR"
})
const thenSpy = jasmine.createSpyObj({
  then: catchSpy
})
const collectionSpy = jasmine.createSpyObj({
  set: of(appData),
  update: of(reviews),
  delete: thenSpy,
})

const afSpy = jasmine.createSpyObj('AngularFirestore', {
  doc: collectionSpy
});

describe('DatabaseService', () => {
  let httpMock: HttpTestingController;
  var service: DatabaseService;
  let angularFirestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports:[
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: AngularFirestore,
          useValue: afSpy 
        },
        HttpClient
      ]
    });
    service = TestBed.get(DatabaseService);
    angularFirestore = TestBed.get(AngularFirestore);
    httpMock = TestBed.inject(HttpTestingController);  
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should fetch to delete apps`, function(done) {
    spyOn(service, 'getToDelete').and.returnValue(Promise.resolve(apps));
    service.getToDelete()
      .then((result) => {
        expect(service.getToDelete).toHaveBeenCalled();
        expect(result).toEqual(apps);
        done();
      });     
  });

  it(`should fetch to review apps`, function(done) {
    spyOn(service, 'getToReview').and.returnValue(Promise.resolve(apps));
    service.getToReview()
      .then((result) => {
        expect(service.getToReview).toHaveBeenCalled();
        expect(result).toEqual(apps);
        done();
      });     
  });

  it(`should fetch to accept reviewed apps`, function(done) {
    spyOn(service, 'getReviewAccept').and.returnValue(Promise.resolve(apps));
    service.getReviewAccept()
      .then((result) => {
        expect(service.getReviewAccept).toHaveBeenCalled();
        expect(result).toEqual(apps);
        done();
      });     
  });

  it(`should fetch to remove reviewed apps`, function(done) {
    spyOn(service, 'getReviewRemove').and.returnValue(Promise.resolve(apps));
    service.getReviewRemove()
      .then((result) => {
        expect(service.getReviewRemove).toHaveBeenCalled();
        expect(result).toEqual(apps);
        done();
      });     
  });

  it(`should fetch final accepted apps`, function(done) {
    spyOn(service, 'getFinalAccept').and.returnValue(Promise.resolve(apps));
    service.getFinalAccept()
      .then((result) => {
        expect(service.getFinalAccept).toHaveBeenCalled();
        expect(result).toEqual(apps);
        done();
      });     
  });

  it(`should fetch final removed apps`, function(done) {
    spyOn(service, 'getFinalRemove').and.returnValue(Promise.resolve(apps));
    service.getFinalRemove()
      .then((result) => {
        expect(service.getFinalRemove).toHaveBeenCalled();
        expect(result).toEqual(apps);
        done();
      });     
  });

  it(`should set in database apps recommended by reviewers`, function(done) {
    service.appsRecommendedByReviewer(appData, reviews);
    expect(collectionSpy.set).toHaveBeenCalledWith(appData, Object({ merge: true }) );
    expect(afSpy.doc).toHaveBeenCalledWith(`apps_review_accept/${appData.appId}`);
    done();
  });

  it(`should set in database apps removed by reviewers`, function(done) {
    service.appsRemovedByReviewer(appData, reviews);
    expect(collectionSpy.set).toHaveBeenCalledWith(appData, Object({ merge: true }) );
    expect(afSpy.doc).toHaveBeenCalledWith(`apps_review_remove/${appData.appId}`);
    done();
  });

  it(`should set in database apps removed by system`, function(done) {
    service.sendSystemtoDelete(appData);
    expect(collectionSpy.set).toHaveBeenCalledWith(appData, Object({ merge: true }) );
    expect(afSpy.doc).toHaveBeenCalledWith(`system_apps_remove/${appData.appId}`);
    done();
  });

  it(`should set in database apps accepted by system`, function(done) {
    service.sendSystemToReview(appData);
    expect(collectionSpy.set).toHaveBeenCalledWith(appData, Object({ merge: true }) );
    expect(afSpy.doc).toHaveBeenCalledWith(`system_apps_accept/${appData.appId}`);
    done();
  });

  it(`should set in database apps accepted by admin`, function(done) {
    service.appsAcceptedByAdmin(appData);
    expect(collectionSpy.set).toHaveBeenCalledWith(appData, Object({ merge: true }) );
    expect(afSpy.doc).toHaveBeenCalledWith(`apps_accepted/${appData.appId}`);
    done();
  });

  it(`should set in database apps removed by admin`, function(done) {
    service.appsRemovedByAdmin(appData);
    expect(collectionSpy.set).toHaveBeenCalledWith(appData, Object({ merge: true }) );
    expect(afSpy.doc).toHaveBeenCalledWith(`apps_removed/${appData.appId}`);
    done();
  });

  it(`should delete in database from reviewed accepted apps`, function(done) {
    service.deleteAppFromReviewAccept(appData);
    expect(collectionSpy.delete).toHaveBeenCalled();
    expect(afSpy.doc).toHaveBeenCalledWith(`apps_review_accept/${appData.appId}`);
    done();
  });

  it(`should delete in database from reviewed removed apps`, function(done) {
    service.deleteAppFromReviewRemove(appData);
    expect(collectionSpy.delete).toHaveBeenCalled();
    expect(afSpy.doc).toHaveBeenCalledWith(`apps_review_remove/${appData.appId}`);
    done();
  });

  it(`should delete in database from final accepted apps`, function(done) {
    service.deleteAppFromFinalAccept(appData);
    expect(collectionSpy.delete).toHaveBeenCalled();
    expect(afSpy.doc).toHaveBeenCalledWith(`apps_accepted/${appData.appId}`);
    done();
  });

  it(`should delete in database from final removed apps`, function(done) {
    service.deleteAppFromFinalRemove(appData);
    expect(collectionSpy.delete).toHaveBeenCalled();
    expect(afSpy.doc).toHaveBeenCalledWith(`apps_removed/${appData.appId}`);
    done();
  });

});
