import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBoxComponent } from './app-box.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay'
import { MatDialogModule } from '@angular/material/dialog';
import { AppDetailsComponent } from './app-details/app-details.component';
import { of } from 'rxjs';
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

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }
}
const user =   {
  "name": "Test",
  "email": "test@test.com",
  "admin": true,
  "uid": "uid"
};

describe('AppBoxComponent', () => {
  let component: AppBoxComponent;
  let fixture: ComponentFixture<AppBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ 
        { provide: MatDialog, useClass: MatDialogMock },
        Overlay
      ],
      declarations: [ AppBoxComponent ],
      imports: [
        MatDialogModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBoxComponent);
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
    component = fixture.componentInstance;
    component.app = appDetail;
    component.isLoaded = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click equal to true', () => {
    component.click()
    expect(component.checked).toEqual(true);
  });

});
