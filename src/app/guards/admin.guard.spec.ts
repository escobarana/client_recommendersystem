import { TestBed } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';

class MockRouter {
  navigate(path) {}
}

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(AdminGuard);

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    let adminGuard: AdminGuard;
    let router;

    it('should return true for an admin in user', () => {
      let user = {
        email: "Test@gmail.com",
        name: "Test",
        admin: true,
        uid: "123456789ASDDFG",
      };
      localStorage.getItem('user');
      router = new MockRouter();
      //adminGuard = new AdminGuard(router, UserService);
      localStorage.setItem('user', JSON.stringify(user));
      expect(adminGuard.canActivate()).toEqual(true);
    });

    it('should navigate to home for a not admin user', () => {
      let user = {
        email: "Test@gmail.com",
        name: "Test",
        admin: false,
        uid: "123456789ASDDFG",
      };
      router = new MockRouter();
      //adminGuard = new AdminGuard(router);
      spyOn(router, 'navigate');
      localStorage.setItem('user', JSON.stringify(user));
      expect(adminGuard.canActivate()).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

  });
});
