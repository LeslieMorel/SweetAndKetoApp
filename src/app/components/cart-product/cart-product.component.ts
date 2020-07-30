import { Component, OnInit, Input } from '@angular/core';
import { ProductoCartModel } from 'src/app/models/cart.model';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {

  @Input() cartProduct: ProductoCartModel;
  constructor(private cartServ: CarritoService) { }

  ngOnInit(): void {
  }

  numberChange($event){
    console.log($event);
  }
  deleteProducto(){
    const index = this.cartServ.productos.indexOf(this.cartProduct);
    this.cartServ.productos.splice(index,1);
  }

}
