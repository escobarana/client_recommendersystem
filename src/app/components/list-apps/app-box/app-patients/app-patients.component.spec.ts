import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPatientsComponent } from './app-patients.component';

describe('AppPatientsComponent', () => {
  let component: AppPatientsComponent;
  let fixture: ComponentFixture<AppPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
