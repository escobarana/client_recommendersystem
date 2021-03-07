import { TestBed } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StoresService } from './stores.service';

describe('StoresService', () => {
  let httpMock: HttpTestingController;
  let service: StoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(StoresService);
    httpMock = TestBed.inject(HttpTestingController);  
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: StoresService = TestBed.get(StoresService);
    expect(service).toBeTruthy();
  });

  it(`should fetch raw list of google apps`, function(done) {
    const googleApps = [
    {
      "appId": "Test_appId1",
      "description": "Description",
      "title": "Test app 1",
      "url": "googleplay.com/Test_appId1"
    },
    {
      "appId": "Test_appId2",
      "description": "Description",
      "title": "Test app 2",
      "url": "googleplay.com/Test_appId2"
    },
    {
      "appId": "Test_appId3",
      "description": "Description",
      "title": "Test app 3",
      "url": "googleplay.com/Test_appId3"
    }
    ];
    spyOn(service, 'getRawGoogleApps').and.returnValue(Promise.resolve(googleApps));
    service.getRawGoogleApps()
      .then((result) => {
        expect(service.getRawGoogleApps).toHaveBeenCalled();
        expect(result).toEqual(googleApps);
        done();
      });     
  });

  it(`should fetch list of google apps with descriptions`, function(done) {
    const googleApps = [
    {
      "appId": "Test_appId1",
      "description": "Description",
      "title": "Test app 1",
      "url": "googleplay.com/Test_appId1"
    },
    {
      "appId": "Test_appId2",
      "description": "Description",
      "title": "Test app 2",
      "url": "googleplay.com/Test_appId2"
    },
    {
      "appId": "Test_appId3",
      "description": "Description",
      "title": "Test app 3",
      "url": "googleplay.com/Test_appId3"
    }
    ];
    spyOn(service, 'getDescriptionGoogleApps').and.returnValue(Promise.resolve(googleApps));
    service.getDescriptionGoogleApps()
      .then((result) => {
        expect(service.getDescriptionGoogleApps).toHaveBeenCalled();
        expect(result).toEqual(googleApps);
        done();
      });     
    });

  it(`should fetch list of google apps with keywords`, function(done) {
    const googleApps = [
    {
      "appId": "Test_appId1",
      "description": "Description",
      "title": "Test app 1",
      "url": "googleplay.com/Test_appId1"
    },
    {
      "appId": "Test_appId2",
      "description": "Description",
      "title": "Test app 2",
      "url": "googleplay.com/Test_appId2"
    },
    {
      "appId": "Test_appId3",
      "description": "Description",
      "title": "Test app 3",
      "url": "googleplay.com/Test_appId3"
    }
    ];
    spyOn(service, 'getKeywordsGoogleApps').and.returnValue(Promise.resolve(googleApps));
    service.getKeywordsGoogleApps()
      .then((result) => {
        expect(service.getKeywordsGoogleApps).toHaveBeenCalled();
        expect(result).toEqual(googleApps);
        done();
      });     
    });

  it(`should fetch raw list of apple apps`, function(done) {
    const appleApps = [
    {
      "appId": "Test_appId1",
      "description": "Description",
      "title": "Test app 1",
      "url": "appstore.com/Test_appId1"
    },
    {
      "appId": "Test_appId2",
      "description": "Description",
      "title": "Test app 2",
      "url": "appstore.com/Test_appId2"
    },
    {
      "appId": "Test_appId3",
      "description": "Description",
      "title": "Test app 3",
      "url": "appstore.com/Test_appId3"
    }
    ];
    spyOn(service, 'getRawAppleApps').and.returnValue(Promise.resolve(appleApps));
    service.getRawAppleApps()
      .then((result) => {
        expect(service.getRawAppleApps).toHaveBeenCalled();
        expect(result).toEqual(appleApps);
        done();
      });     
    });

  it(`should fetch list of apple apps with description`, function(done) {
  const appleApps = [
  {
    "appId": "Test_appId1",
    "description": "Description",
    "title": "Test app 1",
    "url": "appstore.com/Test_appId1"
  },
  {
    "appId": "Test_appId2",
    "description": "Description",
    "title": "Test app 2",
    "url": "appstore.com/Test_appId2"
  },
  {
    "appId": "Test_appId3",
    "description": "Description",
    "title": "Test app 3",
    "url": "appstore.com/Test_appId3"
  }
  ];
  spyOn(service, 'getDescriptionAppleApps').and.returnValue(Promise.resolve(appleApps));
  service.getDescriptionAppleApps()
    .then((result) => {
      expect(service.getDescriptionAppleApps).toHaveBeenCalled();
      expect(result).toEqual(appleApps);
      done();
    });     
  });

  it(`should fetch list of apple apps with keywords`, function(done) {
    const appleApps = [
    {
      "appId": "Test_appId1",
      "description": "Description",
      "title": "Test app 1",
      "url": "appstore.com/Test_appId1"
    },
    {
      "appId": "Test_appId2",
      "description": "Description",
      "title": "Test app 2",
      "url": "appstore.com/Test_appId2"
    },
    {
      "appId": "Test_appId3",
      "description": "Description",
      "title": "Test app 3",
      "url": "appstore.com/Test_appId3"
    }
    ];
    spyOn(service, 'getKeywordsAppleApps').and.returnValue(Promise.resolve(appleApps));
    service.getKeywordsAppleApps()
      .then((result) => {
        expect(service.getKeywordsAppleApps).toHaveBeenCalled();
        expect(result).toEqual(appleApps);
        done();
      });     
    });

});
