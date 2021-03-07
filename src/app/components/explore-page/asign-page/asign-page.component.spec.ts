import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignPageComponent } from './asign-page.component';
import { AngularFireModule } from '@angular/fire';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';

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

describe('AsignPageComponent', () => {
  let component: AsignPageComponent;
  let fixture: ComponentFixture<AsignPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AsignPageComponent
       ],
      imports: [
        MatDialogModule,
      ],
      providers:[
        {
          useValue: AngularFireMocks
        },
        { provide: MatDialog, useClass: MatDialogMock },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        MatIconRegistry,
        DomSanitizer 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
