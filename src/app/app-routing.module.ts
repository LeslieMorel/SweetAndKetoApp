import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ListaOrdenesComponent } from './components/lista-ordenes/lista-ordenes.component';
import { EditarOrdenComponent } from './components/editar-orden/editar-orden.component';
import { OrdenConfirmacionComponent } from './components/orden-confirmacion/orden-confirmacion.component';
import { ProductosPendientesComponent } from './components/productos-pendientes/productos-pendientes.component';
import { ListaProductosPendientesComponent } from './components/lista-productos-pendientes/lista-productos-pendientes.component';
import { ImagesComponent } from './components/images/images.component';
import { OrdenesAuthService } from './services/ordenes-auth.service';


const routes: Routes = [
  {
    path: '' ,
    component: ListaOrdenesComponent,
    data: {roles: ['admin', 'ordenesEdit', 'ordenesRead']},
    canActivate: [OrdenesAuthService]
  },
  {path: 'tienda' , component: ProductosComponent},
  {path: 'carrito' , component: CartComponent},
  {path: 'checkout' , component: CheckoutComponent},
  {path: 'editar-orden/:orden' , component: EditarOrdenComponent},
  {path: 'orden-confirmacion/:orden' , component: OrdenConfirmacionComponent},
  {path: 'productos-pendientes' , component: ListaProductosPendientesComponent},
  {path: 'images' , component: ImagesComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
