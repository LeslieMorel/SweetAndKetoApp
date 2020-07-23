import { Component, OnInit, Input } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.scss']
})
export class ProductoCardComponent implements OnInit {

  cantidad = 0;
  @Input() producto: ProductoModel;
  constructor( protected cartService: CarritoService) { }

  ngOnInit(): void {
  }

  Add(){
    this.cantidad++;
  }
  Resta(){
    if (this.cantidad > 0){
       this.cantidad--;
    }
  }
  AddProducto(){
    this.cartService.Add(this.producto);
  }
  RestaProducto(){
    this.cartService.Resta(this.producto);
  }

  CantidadInCart(){
    const productInCart = this.cartService.productos.filter(p => p.producto.id === this.producto.id)[0];
    if (productInCart){return productInCart.cantidad; }
    else {return 0; }

  }

}
