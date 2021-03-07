import { TestBed } from '@angular/core/testing';

import { EmailGuard } from './email.guard';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from "rxjs";

class MockRouter {
  navigate(path) {}
}

const authState = {
  email: 'test@test.com',
  admin: true,
  uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2',
  name: 'Test',
  emailVerified: true
};

const mockAngularFireAuth: any = {
  authState: of(authState)
};


describe('EmailGuard', () => {
  let guard: EmailGuard;
  let user;
  let router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provider: AngularFireAuth, useValue: mockAngularFireAuth }
      ],
      imports: [
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(EmailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true if user has validated email', () => {
      router = new MockRouter();
      guard = new EmailGuard(mockAngularFireAuth,router);
      mockAngularFireAuth.authState.subscribe(
        () => {
          expect(guard.canActivate()).toEqual(true);
      });
    });

  });

});
