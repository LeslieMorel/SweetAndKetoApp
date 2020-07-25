import { Component, OnInit, Input } from '@angular/core';
import { ProductoCartModel } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {

  @Input() cartProduct: ProductoCartModel;
  constructor() { }

  ngOnInit(): void {
  }

}
