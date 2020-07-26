import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveToLocalStorage(key: string, value: any){
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  getFromLocalStorage(key: string){
    const stringValue = localStorage.getItem(key);
    const value = JSON.parse(stringValue);
    return value;

  }


}
