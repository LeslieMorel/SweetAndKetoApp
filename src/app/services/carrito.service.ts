import { Injectable } from '@angular/core';
import { ProductoModel } from '../models/producto.model';
import { Subject } from 'rxjs';
import { ProductoCartModel } from '../models/cart.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  cartProducts = 'cartProducts';

  productosChange = new Subject<ProductoCartModel[]>();
  productos: ProductoCartModel[] = [];

  constructor(private localStorageServ: LocalStorageService) {

    this.GetLocalStorageCartProducts();
  }

  Add(producto: ProductoModel){
    const productoInCart = this.productos.filter(p => p.producto.id === producto.id)[0];
    if (productoInCart)
      {
        productoInCart.cantidad++;
        productoInCart.monto = productoInCart.cantidad * productoInCart.producto.precio;
        console.log(productoInCart);
      }
    else{ this.productos.push({producto, cantidad: 1, monto: producto.precio}); }

    this.CartUpdated();
  }
  Resta(producto: ProductoModel){
    const productoInCart = this.productos.filter(p => p.producto.id === producto.id)[0];
    if (productoInCart ){
      if (productoInCart.cantidad > 1) {
        productoInCart.cantidad--;
        productoInCart.monto = productoInCart.cantidad * productoInCart.producto.precio;
      }
      else {this.RemoveProduct(this.productos.indexOf(productoInCart)); }
    }
    this.CartUpdated();
  }

  private RemoveProduct(productIndex: number) {
    this.productos.splice(productIndex, 1);
  }

  CartUpdated(){
    this.productosChange.next(this.productos);
    this.localStorageServ.saveToLocalStorage(this.cartProducts, this.productos);
  }
  EmptyCart(){
    localStorage.removeItem(this.cartProducts);
    this.productos = [];
  }

  GetLocalStorageCartProducts(){
    const productosLocalStorage = this.localStorageServ.getFromLocalStorage(this.cartProducts);
    if (productosLocalStorage){
      this.productos = productosLocalStorage;
      this.CartUpdated();
    }

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
