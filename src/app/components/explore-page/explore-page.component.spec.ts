import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorePageComponent } from './explore-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DatabaseService } from '../../services/database.service';
import { AuthFirebaseService } from '../../services/auth-firebase.service';
import { StoresService } from '../../services/stores.service';
import { ChangeDetectorRef  } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog,MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { of } from "rxjs";

import { RouterTestingModule } from '@angular/router/testing';

export class MatDialogMock {
  static open() {}
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }
}

let AngularFireMocks = {
  auth: jasmine.createSpy('auth')
};

AngularFireMocks.auth.and.returnValue(of({ uid: 'ABC123' }));

let store = {};
const mockLocalStorage = {
  getItem: (key: string): string => {
    return key in store ? store[key] : null;
  },
  setItem: (key: string, value: string) => {
    store[key] = `${value}`;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    store = {};
  }
};

describe('ExplorePageComponent', () => {
  let component: ExplorePageComponent;
  let fixture: ComponentFixture<ExplorePageComponent>;
  let store: StoresService;
  let db:DatabaseService
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        MatPaginatorModule,
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [ ExplorePageComponent ],
      providers: [
        HttpClientModule,
        DatabaseService,
        {
          provide: AuthFirebaseService,
          useValue: AngularFireMocks
        },
        StoresService,
        ChangeDetectorRef,
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    })
    .compileComponents();
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let user = {
      email: "admin@tfg.com",
      name: "Admin",
      admin: true,
    };
    localStorage.setItem('user', JSON.stringify(user));
    fixture.detectChanges();
  });

 /* it('should create', () => {
    let user = {
      email: "Test@gmail.com",
      name: "Test",
      admin: true,
      uid: "123456789ASDDFG",
    };
    localStorage.setItem('user', JSON.stringify(user));
    console.log(localStorage.getItem('user'));
    console.log("JSON.parse(localStorage.getItem('user')).admin;:",JSON.parse(localStorage.getItem('user')).admin)
    expect(component).toBeTruthy();
  });*/
  
});
