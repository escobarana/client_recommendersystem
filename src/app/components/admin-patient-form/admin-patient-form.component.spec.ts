import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPatientFormComponent } from './admin-patient-form.component';

describe('AdminPatientFormComponent', () => {
  let component: AdminPatientFormComponent;
  let fixture: ComponentFixture<AdminPatientFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPatientFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
