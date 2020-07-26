import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoOrdenService {

  constructor(private http: HttpClient) { }

  GeProductosOrdenPendientes(){
    return this.http.get('ProductosOrdenes/Pendientes');
  }
}
