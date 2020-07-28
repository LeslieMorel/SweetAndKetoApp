import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { ProductoModel } from '../models/producto.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  producto: ProductoModel;
  productoChanged = new Subject<ProductoModel>();
  constructor(private http: HttpClient) { }

  SetProducto(producto: ProductoModel){
    this.producto = producto;
    this.productoChanged.next(producto);
  }
  GeProductos(){
    return this.http.get('Productos');
  }
  GetProducto(ordenId: string){
    return this.http.get(`Productos/${ordenId}`);
  }
  PostProducto(producto: ProductoModel){
    return this.http.post(`Productos`, producto);
  }
  PutProducto(productoId: string, producto: ProductoModel){
    return this.http.put(`Productos/${productoId}`, producto);
  }
  DeleteProducto(productoId: number){
    return this.http.delete(`Productos/${productoId}`);
  }

}
