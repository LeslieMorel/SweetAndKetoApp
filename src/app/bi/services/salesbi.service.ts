import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesbiService {

  controller = 'SalesBi'
  constructor(private http: HttpClient) { }

  GetProductosOrdenBi(){
    return this.http.get(this.controller);
  }
}
