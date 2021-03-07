import { TestBed } from '@angular/core/testing';
import { saveAs } from 'file-saver';
import { DownloadFileService } from './download-file.service';

describe('DownloadFileService', () => {
  let service: DownloadFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should download a file', () => {
    const data = {test: "test"};
    const type = "application/json";
    const name = "apps_accepted";
    let functionSaveAs = spyOn(saveAs, "saveAs");
    service.downLoadFile(data,type,name);
    expect(functionSaveAs).toHaveBeenCalled();
  });

});
