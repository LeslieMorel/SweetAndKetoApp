import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdenesModel } from '../models/ordenes.model';
import { Subject } from 'rxjs';
import { ProductoOrdenModel } from '../models/productoOrden.model';
import { OrdenBundleDTO } from '../models/ordenBundleDTO.model';
import { OrdenWithProductos } from '../models/ordenWithProductos.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  productosOrden: ProductoOrdenModel[] = [];
  ordenChange = new Subject<OrdenesModel>();
   constructor(private http: HttpClient) { }


   private _orden: OrdenesModel;
   public get orden(): OrdenesModel {
     return this._orden;
   }
   public set orden(v: OrdenesModel) {
     this._orden = v;
     this.ordenChange.next(this._orden);
   }

  GetOrdenes(){
    return this.http.get('Ordenes');
  }
  GetOrdenesDto(){
    return this.http.get('Ordenes/Dto');
  }
  GetOrden(ordenId: string){
    return this.http.get(`Ordenes/${ordenId}`);
  }
  GetProductosOfOrden(ordenId: string){
    return this.http.get(`ProductosOrdenes/Orden/${ordenId}`);
  }
  PostOrden(orden: OrdenesModel){
    return this.http.post('Ordenes', orden);
  }
  PostOrdenWithProductos(orden: OrdenWithProductos){
    return this.http.post('Ordenes/OrdenWithProductos', orden);
  }
  PutOrden(ordenId: string , orden: OrdenesModel){
    return this.http.put(`Ordenes/${ordenId}`, orden);
  }
  DeleteOrden(ordenId: string){
    return this.http.delete(`Ordenes/${ordenId}`);
  }
  DeleteOrdenes(ordenesId: number[]){
    return this.http.put(`Ordenes/DeleteLista`, ordenesId);
  }

  EditarEstado(estadoOrden: number, ordenesId: number[]){
    return this.http.put(`Ordenes/EditarEstado/${estadoOrden}`, ordenesId);
  }
}
