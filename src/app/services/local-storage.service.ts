import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  filtrosOrdenes = 'sweet&Keto_filtrosOrdenes';
  DataLocalStorage: string[];
  constructor() {
    this.DataLocalStorage = [this.filtrosOrdenes]
  }

  saveToLocalStorage(key: string, value: any){
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  getFromLocalStorage(key: string){
    const stringValue = localStorage.getItem(key);
    const value = JSON.parse(stringValue);
    return value;
  }

  GetItem<T>(key: string): T {
    const stringValue = localStorage.getItem(key);
    const value: T = JSON.parse(stringValue);
    return value;

  }
  removeFromLocalStorage(Key: string){
    localStorage.removeItem(Key);
  }


}
