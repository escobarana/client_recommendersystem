import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterSubmitComponent } from './after-submit.component';

describe('AfterSubmitComponent', () => {
  let component: AfterSubmitComponent;
  let fixture: ComponentFixture<AfterSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
