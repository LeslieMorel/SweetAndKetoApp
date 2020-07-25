import { ProductoModel } from './producto.model';

export class ProductoOrdenModel {
  id: number;
  productoId: number;
  ordenId: number;
  precio: number;
  cantidad: number;
  subtotal: number;
  productoNavigation?: ProductoModel;
  constructor(){
    this.id = 0,
    this.productoId = null;
    this.ordenId = 0;
    this.precio = 0;
    this.cantidad = 0;
    this.subtotal = 0;
  }
}
