import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppReviewersComponent } from './app-reviewers.component';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from 'src/app/services/database.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

let AngularFireMocks = {
  auth: jasmine.createSpy('auth')
};

AngularFireMocks.auth.and.returnValue(of({ uid: 'ABC123' }));

export class MatDialogMock {
  static open() {}
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }
}

describe('AppReviewersComponent', () => {
  let component: AppReviewersComponent;
  let fixture: ComponentFixture<AppReviewersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppReviewersComponent ],
      providers:[
        {
          provide: AuthFirebaseService,
          useValue: AngularFireMocks
        },
        { provide: MatDialog, useClass: MatDialogMock },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        MatIconRegistry,
        DomSanitizer,
        DatabaseService 
      ],
      imports:[
        MatDialogModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppReviewersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
