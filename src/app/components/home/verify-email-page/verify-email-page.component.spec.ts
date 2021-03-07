import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailPageComponent } from './verify-email-page.component';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { DatabaseService } from 'src/app/services/database.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

const mockDialogRef = {
  close: jasmine.createSpy('close')
};

let AngularFireMocks = {
  auth: jasmine.createSpy('auth')
};

export class MatDialogMock {
  close() {}
}

AngularFireMocks.auth.and.returnValue(of({ uid: 'ABC123' }));

describe('VerifyEmailPageComponent', () => {
  let component: VerifyEmailPageComponent;
  let fixture: ComponentFixture<VerifyEmailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyEmailPageComponent ],
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
      imports:[
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal ', () => {
    component.closeWindow();
    expect(mockDialogRef.close).toHaveBeenCalled();
   });
});
