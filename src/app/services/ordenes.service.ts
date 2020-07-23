import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(private http: HttpClient) { }

  GetOrdenes(){
    return this.http.get('Ordenes');
  }
  GetOrden(ordenId: string){
    return this.http.get(`Ordenes/${ordenId}`);
  }
}
