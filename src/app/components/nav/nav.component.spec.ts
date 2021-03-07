import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFirebaseService } from '../../services/auth-firebase.service';
import { MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { NavComponent } from './nav.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

let AngularFireMocks = {
  auth: jasmine.createSpy('auth'),
  signOut: () => {}
};

var actions = {
  getReload: function () {
      return window.location.reload;
  },
};

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let authService: AuthFirebaseService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[
        MatIconRegistry,
        BrowserModule,
        /*{
          provide: AuthFirebaseService,
          useValue: AngularFireMocks
        },*/
        { provide: AuthFirebaseService, useClass: AuthFirebaseService }
      ],
      declarations: [NavComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
        HttpClientModule,
        MatMenuModule
      ]
    }).compileComponents().then(() =>{
      fixture = TestBed.createComponent(NavComponent);
      component = fixture.componentInstance;

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
      spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
      spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthFirebaseService);
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  /*it('should log out user', inject([ AuthFirebaseService ], (service: AuthFirebaseService, done) => {
    spyOn(authService, 'signOut').and.callThrough();
    fixture.detectChanges();
    component.logOut();
    //expect(service.signOut).toHaveBeenCalled();
  }));*/

  it('should check user is log in', () => {
    let user = {
      email: "Test@gmail.com",
      name: "Test",
      admin: true,
      uid: "123456789ASDDFG",
    };
    localStorage.setItem('user', JSON.stringify(user));
    fixture.detectChanges();
    component.identity;
    expect(component.identity).toEqual(true);
  });

  it('should check user is not log in', () => {
    localStorage.setItem('user', null);
    fixture.detectChanges();
    component.identity;
    expect(component.identity).toEqual(false);
  });

  it('should check user logged is admin', () => {
    let user = {
      email: "Test@gmail.com",
      name: "Test",
      admin: true,
      uid: "123456789ASDDFG",
    };
    localStorage.setItem('user', JSON.stringify(user));
    fixture.detectChanges();
    component.identity;
    expect(component.identity.admin).toEqual(true);
  });

  it('should check user logged is not admin', () => {
    let user = {
      email: "Test@gmail.com",
      name: "Test",
      admin: false,
      uid: "123456789ASDDFG",
    };
    localStorage.setItem('user', JSON.stringify(user));
    fixture.detectChanges();
    component.identity;
    expect(component.identity.admin).toEqual(false);
  });

  /*it('should reload review page', () => {
    const router = TestBed.get(Router);
    spyOnProperty(router, 'url', 'get').and.returnValue('/review');
    fixture.detectChanges();
    spyOn(actions, "getReload")
    component.goTo('review');
    spyOn(window.location, 'reload');
    expect(window.location.reload).toHaveBeenCalled();
  });*/
  
});