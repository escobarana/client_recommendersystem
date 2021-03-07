import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AdminUsersPageComponent } from './admin-users-page.component';
import { AuthFirebaseService } from '../../services/auth-firebase.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of, Observable } from "rxjs";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';

const users = [
  {
    "name": "Test",
    "email": "test@test.com",
    "admin": true,
    "uid": "uid"
  },
  {
    "name": "Test",
    "email": "test@test.com",
    "admin": false,
    "uid": "uid"
  },
  {
    "name": "Test",
    "email": "test@test.com",
    "admin": false,
    "uid": "uid"
  }
];

let AngularFireMocks = {
  auth: jasmine.createSpy('auth'),
  getAllUsers: () => {
    return Observable.create(observer => {
      observer.next(users);
      observer.complete();
    })
  }
};

AngularFireMocks.auth.and.returnValue(of({ uid: 'ABC123' }));

describe('AdminUsersPageComponent', () => {
  let component: AdminUsersPageComponent;
  let fixture: ComponentFixture<AdminUsersPageComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [ AdminUsersPageComponent ],
      providers: [
        {
          provide: AuthFirebaseService,
          useValue: AngularFireMocks
        },
        { provide: AuthFirebaseService, useClass: AuthFirebaseService },
        HttpTestingController
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersPageComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  /*it('should create', inject([ AuthFirebaseService ], (service: AuthFirebaseService) => {
    const req = httpMock.expectOne(`/api/db/allUsers`);
    req.flush(users);
    expect(component).toBeTruthy();
  }));*/

});

