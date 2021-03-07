import { TestBed } from '@angular/core/testing';
import { FormControl,FormGroup } from '@angular/forms';
import { ValidatorsFormService } from './validators-form.service';

describe('ValidatorsFormService', () => {
  let service: ValidatorsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be check passwords are equal', () => {
    const password = new FormControl('password');
    const re_password = new FormControl('password');
    const registerFormControl = new FormGroup({
      password,re_password
    });
    expect(service.checkPasswords(registerFormControl)).toEqual(null);
  });

  it('should be check passwords are not equal', () => {
    const password = new FormControl('123');
    const re_password = new FormControl('456');
    const registerFormControl = new FormGroup({
      password,re_password
    });
    expect(service.checkPasswords(registerFormControl)).toEqual({ notSame: true });
  });

});
