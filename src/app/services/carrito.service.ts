import { Injectable } from '@angular/core';
import { ProductoModel } from '../models/producto.model';
import { Subject } from 'rxjs';
import { ProductoCartModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  productosChange = new Subject<ProductoCartModel[]>();
  productos: ProductoCartModel[] = [];

  constructor() { }

  Add(producto: ProductoModel){
    const productoInCart = this.productos.filter(p => p.producto.id === producto.id)[0];
    if (productoInCart){ productoInCart.cantidad++; }
    else{ this.productos.push({producto, cantidad: 1}); }

    this.productosChange.next(this.productos);
  }
  Resta(producto: ProductoModel){
    const productoInCart = this.productos.filter(p => p.producto.id === producto.id)[0];
    if (productoInCart ){
      if (productoInCart.cantidad > 1) {productoInCart.cantidad--; }
      else {this.RemoveProduct(this.productos.indexOf(productoInCart)); }
    }
    this.productosChange.next(this.productos);
  }

  private RemoveProduct(productIndex: number) {
    this.productos.splice(productIndex, 1);
  }


  ItemsInCart(): number {
    let SumItems = 0;
    this.productos.forEach(product => {
      SumItems += product.cantidad;
    });
    return SumItems;
  }
  AmountInCart(): number {
    let Subtotal = 0;
    this.productos.forEach(product => {
      Subtotal += product.cantidad * product.producto.precio;
    });
    return Subtotal;
  }



}
