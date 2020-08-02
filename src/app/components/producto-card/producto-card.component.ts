import { Component, OnInit, Input } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { CarritoService } from 'src/app/services/carrito.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductoInfoComponent } from '../producto-info/producto-info.component';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.scss']
})
export class ProductoCardComponent implements OnInit {

  cantidad = 5;
  @Input() producto: ProductoModel;
  constructor( protected cartService: CarritoService,
               private snackBarServ: SnackbarService,
               private dialog: MatDialog) { }

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
    this.snackBarServ.GoToCartSnack();
  }
  RestaProducto(){
    this.cartService.Resta(this.producto);
  }

  CantidadInCart(){
    const productInCart = this.cartService.productos.filter(p => p.producto.id === this.producto.id)[0];
    if (productInCart){return productInCart.cantidad; }
    else {return 0; }

  }

  SelectChange($event, producto: number){
    console.log($event);
    console.log(producto);

  }

  Clear(){
    this.cantidad = 0;
  }
  openDialogInfo(){
    this.dialog.open(ProductoInfoComponent, {
      data: { producto: this.producto},
      // height: '500px',
      // width: '600px'
    });
  }


}
