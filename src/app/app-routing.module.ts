import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ListaOrdenesComponent } from './components/lista-ordenes/lista-ordenes.component';
import { EditarOrdenComponent } from './components/editar-orden/editar-orden.component';


const routes: Routes = [
  {path: '' , component: ListaOrdenesComponent},
  {path: 'tienda' , component: ProductosComponent},
  {path: 'carrito' , component: CartComponent},
  {path: 'checkout' , component: CheckoutComponent},
  {path: 'editar-orden/:orden' , component: EditarOrdenComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
