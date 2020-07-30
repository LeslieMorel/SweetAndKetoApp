import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { OrdenesModel } from 'src/app/models/ordenes.model';
import { ProductoOrdenModel } from 'src/app/models/productoOrden.model';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TipoSnackBar } from '../snackbar/snackbar.component';
import { SnackbarPanelClass } from 'src/app/models/SnackBarPanelClass.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  orden: OrdenesModel;
  constructor(public cartService: CarritoService,
              private ordenService: OrdenesService,
              private snackBarService: SnackbarService,
              private router: Router) { }

  ngOnInit(): void {
    this.orden = this.NuevaOrden();
    // this.orden = new OrdenesModel();
    // this.ordenService.ordenChange.subscribe((Response: OrdenesModel) => {
    //   console.log(Response);
    //   this.orden = Response;
    // });
  }

  NuevaOrden(): OrdenesModel{
    const orden = new OrdenesModel();
    orden.monto = this.cartService.AmountInCart();
    return orden;
  }

  AddProductos(orden: OrdenesModel): boolean{
    if (this.cartService.productos.length > 0){
      const productosOrden: ProductoOrdenModel[] = [];
      this.cartService.productos.forEach(producto => {
        const productoOrden: ProductoOrdenModel = {
          id: 0,
          ordenId: 0,
          productoId: producto.producto.id,
          cantidad: producto.cantidad,
          precio: producto.producto.precio,
          subtotal: producto.producto.precio * producto.cantidad
        };
        productosOrden.push(productoOrden);
      });
      orden.productoOrdenNavigation = productosOrden;
      return true;
    } else {
       return false;
    }
  }

  PostOrden(orden: OrdenesModel){
    if (this.AddProductos(orden)){
      console.log('Posting Order: ');
      console.log(orden);
      this.ordenService.PostOrden(orden).subscribe((Response: OrdenesModel) => {
        console.log(Response);
        // tslint:disable-next-line: quotemark
        this.cartService.EmptyCart();
        this.snackBarService.Show('Actualizado', TipoSnackBar.Success, 1000, SnackbarPanelClass.success);
        this.router.navigate(['orden-confirmacion/', Response.id]);

      }, (e) => {
        this.snackBarService.Show('Error', TipoSnackBar.Error, 1000, SnackbarPanelClass.error);
        console.log(e);

      });
    } else {
      console.log(' No hay productos en la orden');
    }
  }

}
