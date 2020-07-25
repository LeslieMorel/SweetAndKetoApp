import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SectoresService {

  constructor(private http: HttpClient) { }

  GetSectores(){
    return this.http.get('Sectores');
  }
}
