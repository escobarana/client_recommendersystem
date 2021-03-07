import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor() { }

  downLoadFile(data: any, type: string, name:string) {
    let blob = new Blob([data], { type: type.toString() });
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    saveAs(blob,`${name}_${dd}-${mm}-${yyyy}.json`);
  }
}
