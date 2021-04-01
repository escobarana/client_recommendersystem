import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewbiesComponent } from './admin-newbies.component';

describe('AdminNewbiesComponent', () => {
  let component: AdminNewbiesComponent;
  let fixture: ComponentFixture<AdminNewbiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewbiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewbiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
