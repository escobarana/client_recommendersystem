import { TestBed } from '@angular/core/testing';
import { of } from "rxjs";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

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

const authState = {
  displayName: null,
  isAnonymous: true,
  uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
};

const appData =  { appId: 'AppId1', title: 'App 1', url: 'googleplay.com/AppId1', description:'description', icon:'icon.jpg'};

const catchSpy = jasmine.createSpyObj({
  catch: "ERROR"
})
const thenSpy = jasmine.createSpyObj({
  then: catchSpy
})
const collectionSpy = jasmine.createSpyObj({
  update: thenSpy
})

const afSpy = jasmine.createSpyObj('AngularFirestore', {
  doc: collectionSpy
});

const functionAuthSpy = jasmine.createSpyObj({
  signInWithEmailAndPassword: thenSpy,
  signOut: thenSpy,
  createUserWithEmailAndPassword: thenSpy,
  sendPasswordResetEmail: thenSpy,
  authState: thenSpy
})

const mockAngularFireAuth: any = {
  auth: jasmine.createSpyObj('auth', {
    signInWithEmailAndPassword: jasmine.createSpyObj('auth', {
      user: authState
    }),
    signOut: Promise.resolve({
      user: authState
    }),
    createUserWithEmailAndPassword: Promise.resolve({
      user: authState
    }),
    sendPasswordResetEmail: Promise.resolve({
      user: authState
    }),
    authState: Promise.resolve({
      user: authState
    })
  }),
  createUserWithEmailAndPassword: thenSpy,
  authState: of(authState)
};

describe('AuthFirebaseService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          useValue: afSpy 
        },
        {
          useValue: mockAngularFireAuth 
        },
        { },
        HttpClient
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);  
  });

  afterEach(() => {
    httpMock.verify();
  });
/*
  it('should be created',inject([ AuthFirebaseService ], (service: AuthFirebaseService) => {
    expect(service).toBeTruthy();
  }));

  it(`should update user admin value in database`, inject([ AuthFirebaseService ], (service: AuthFirebaseService) => {
    const uid = "uid";
    const value = true;
    service.updateAdminUser(uid, value);
    expect(collectionSpy.update).toHaveBeenCalled();
    expect(afSpy.doc).toHaveBeenCalledWith(`users/${uid}`);
  }));

  it(`should add app into assign list in the user`, inject([ AuthFirebaseService ], (service: AuthFirebaseService) => {
    const uid = "uid";
    service.updateListAssing(uid, apps);
    expect(collectionSpy.update).toHaveBeenCalled();
    expect(afSpy.doc).toHaveBeenCalledWith(`users/${uid}`);
  }));

  it(`should add app into recommended list in the user`, inject([ AuthFirebaseService ], (service: AuthFirebaseService) => {
    const uid = "uid";
    service.updateListAccepted(uid, appData);
    expect(collectionSpy.update).toHaveBeenCalled();
    expect(afSpy.doc).toHaveBeenCalledWith(`users/${uid}`);
  }));

  it(`should add app into removed list in the user`, inject([ AuthFirebaseService ], (service: AuthFirebaseService) => {
    const uid = "uid";
    service.updateListRemoved(uid, appData);
    expect(collectionSpy.update).toHaveBeenCalled();
    expect(afSpy.doc).toHaveBeenCalledWith(`users/${uid}`);
  }));

  //it('should create a user', inject([ AuthFirebaseService ], (service: AuthFirebaseService, done) => {
    const email = "test@test.com";
    const password = "123456";
    const name = "Test";

    service.signUpWithEmail(email, password, name);
    mockAngularFireAuth.createUserWithEmailAndPassword.then(
      data => {
        expect(data['user']).toBe(authState);
        done();
      }
    );
  //}));

  it('should log out user',inject([ AuthFirebaseService ], (service: AuthFirebaseService, done) => {

  }));

  it('should reset user password', inject([ AuthFirebaseService ], (service: AuthFirebaseService, done) => {

  }));

  it('should reset user password', inject([ AuthFirebaseService ], (service: AuthFirebaseService, done) => {

  }));*/

});
