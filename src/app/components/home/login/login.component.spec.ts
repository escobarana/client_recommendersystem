import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthFirebaseService } from '../../../services/auth-firebase.service';
import { AngularFireModule } from '@angular/fire';
import { environment_server } from '../../../../environments/environment';
import { of } from "rxjs";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog,MatDialogRef, MatDialogModule } from '@angular/material/dialog';

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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dialog: MatDialogMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[
        AuthFirebaseService,
        { provide: MatDialog, useClass: MatDialogMock }
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    dialog = TestBed.get(MatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal ', () => {
    spyOn(dialog, 'open').and.callThrough();
    component.openDialog();
    expect(dialog.open).toHaveBeenCalled();
   });

   
});
