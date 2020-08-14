import { Component, OnInit } from '@angular/core';
import { ProductoCartModel } from 'src/app/models/cart.model';
import { CarritoService } from 'src/app/services/carrito.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProductsChangeSubs: Subscription;
  cartProducts: ProductoCartModel[];
  constructor(public cartService: CarritoService,private activeRoute: ActivatedRoute) { }



  ngOnInit(): void {
    this.cartProducts = this.cartService.productos;

    this.cartProductsChangeSubs = this.cartService.productosChange.subscribe((Response: ProductoCartModel[]) => {
      this.cartProducts = Response;
      console.log(Response);
    });
    this.activeRoute.url.subscribe((resp)=> {
      console.log('path');
      console.log(resp);
    });
  }


}
