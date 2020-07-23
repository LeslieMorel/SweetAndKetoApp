import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  GeProductos(){
    return this.http.get('Productos');
  }
  GetProducto(ordenId: string){
    return this.http.get(`Productos/${ordenId}`);
  }
}
