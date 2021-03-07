import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDetailsComponent } from './app-details.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from '../../../../services/database.service';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { of } from "rxjs";
import { RouterTestingModule } from '@angular/router/testing';

const appDetail = {
  appId: "appId",
  title: "title",
  url: "url",
  icon: "icon",
  gamma: 0,
  description: "description",
  topic: 1
};

const user =   {
  "name": "Test",
  "email": "test@test.com",
  "admin": true,
  "uid": "uid"
};

describe('AppDetailsComponent', () => {
  let component: AppDetailsComponent;
  let fixture: ComponentFixture<AppDetailsComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  let AngularFireMocks = {
    auth: jasmine.createSpy('auth')
  };
  
  AngularFireMocks.auth.and.returnValue(of({ uid: 'ABC123' }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[
        MatIconRegistry,
        BrowserModule,
        {
          provide: DatabaseService,
          useValue: AngularFireMocks
        },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogRef },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ],
      declarations: [ AppDetailsComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
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
    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
    localStorage.setItem('user', JSON.stringify(user));
    fixture = TestBed.createComponent(AppDetailsComponent);
    component = fixture.componentInstance;
    component.data.app = appDetail;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    component.closeWindow();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
  
});
