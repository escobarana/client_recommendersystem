import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPageComponent } from './final-page.component';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

const apps = [
  {
    "appId": "Test_appId1",
    "description": "Description",
    "title": "Test app 1",
    "url": "play.google.com/Test_appId1",
    "reviews":[]
  },
  {
    "appId": "Test_appId2",
    "description": "Description",
    "title": "Test app 2",
    "url": "play.google.com/Test_appId2",
    "reviews":[]
  },
  {
    "appId": "Test_appId3",
    "description": "Description",
    "title": "Test app 3",
    "url": "apps.apple.com/Test_appId3",
    "reviews":[]
  }
];

const user =   {
  "name": "Test",
  "email": "test@test.com",
  "admin": true,
  "uid": "uid"
};

describe('FinalPageComponent', () => {
  let component: FinalPageComponent;
  let fixture: ComponentFixture<FinalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalPageComponent ],
      providers:[
        DatabaseService,
        AuthFirebaseService,
        DownloadFileService
      ],
      imports:[
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalPageComponent);
    component = fixture.componentInstance;
    component.accepted = apps;
    component.removed = apps;
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
    localStorage.setItem('user', JSON.stringify(user));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set google play apps', () => {
    component.changeToGoogle();
    expect(component.showBoth).toEqual(false);
    expect(component.showApple).toEqual(false);
    expect(component.showGoogle).toEqual(true);
  });

  it('should set both apps', () => {
    component.changeToBoth();
    expect(component.showBoth).toEqual(true);
    expect(component.showApple).toEqual(false);
    expect(component.showGoogle).toEqual(false);
  });

  it('should set app store apps', () => {
    component.changeToApple();
    expect(component.showBoth).toEqual(false);
    expect(component.showApple).toEqual(true);
    expect(component.showGoogle).toEqual(false);
  });

  it('should filter accepted apps list with google apps', () => {
    component.changeToGoogle();
    let l = component.filterByStoreAccepted();
    let p =  [{
      "appId": "Test_appId1",
      "description": "Description",
      "title": "Test app 1",
      "url": "play.google.com/Test_appId1",
      "reviews":[]
    },
    {
      "appId": "Test_appId2",
      "description": "Description",
      "title": "Test app 2",
      "url": "play.google.com/Test_appId2",
      "reviews":[]
    }]
    expect(l).toEqual(p);
  });

  it('should filter accepted apps list with apple apps', () => {
    component.changeToApple();
    let l = component.filterByStoreAccepted();
    let p =  [{
      "appId": "Test_appId3",
      "description": "Description",
      "title": "Test app 3",
      "url": "apps.apple.com/Test_appId3",
      "reviews":[]
    }]
    expect(l).toEqual(p);
  });

  it('should filter removed apps list with google apps', () => {
    component.changeToGoogle();
    let l = component.filterByStoreRemoved();
    let p =  [{
      "appId": "Test_appId1",
      "description": "Description",
      "title": "Test app 1",
      "url": "play.google.com/Test_appId1",
      "reviews":[]
    },
    {
      "appId": "Test_appId2",
      "description": "Description",
      "title": "Test app 2",
      "url": "play.google.com/Test_appId2",
      "reviews":[]
    }]
    expect(l).toEqual(p);
  });

  it('should filter removed apps list with apple apps', () => {
    component.changeToApple();
    let l = component.filterByStoreRemoved();
    let p =  [{
      "appId": "Test_appId3",
      "description": "Description",
      "title": "Test app 3",
      "url": "apps.apple.com/Test_appId3",
      "reviews":[]
    }]
    expect(l).toEqual(p);
  });

  it('should check accepted apps list is empty', () => {
    expect(component.isEmpty()).toEqual(false);
  });

  it('should check user is admin', () => {
    expect(component.isAdmin()).toEqual(true);
  });

});
