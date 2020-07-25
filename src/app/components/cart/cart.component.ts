import { Component, OnInit } from '@angular/core';
import { ProductoCartModel } from 'src/app/models/cart.model';
import { CarritoService } from 'src/app/services/carrito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProductsChangeSubs: Subscription;
  cartProducts: ProductoCartModel[];
  constructor(public cartService: CarritoService) { }



  ngOnInit(): void {
    this.cartProducts = this.cartService.productos;

    this.cartProductsChangeSubs = this.cartService.productosChange.subscribe((Response: ProductoCartModel[]) => {
      this.cartProducts = Response;
      console.log(Response);
    });
  }


}
