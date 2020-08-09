import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ListaOrdenesComponent } from './components/ordenes/lista-ordenes/lista-ordenes.component';
import { EditarOrdenComponent } from './components/editar-orden/editar-orden.component';
import { OrdenConfirmacionComponent } from './components/orden-confirmacion/orden-confirmacion.component';
import { ProductosPendientesComponent } from './components/productos-pendientes/productos-pendientes.component';
import { ListaProductosPendientesComponent } from './components/lista-productos-pendientes/lista-productos-pendientes.component';
import { ImagesComponent } from './components/images/images.component';
import { OrdenesAuthService } from './services/ordenes-auth.service';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserRolesModel } from './models/auth/userRoles.model';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: 'tienda' , component: ProductosComponent},
  {path: '' , component: HomeComponent},
  {
    path: 'ordenes' ,
    component: ListaOrdenesComponent,
    data: {roles: [ UserRolesModel.OrdenesEdicion, UserRolesModel.OrdenesConsulta]},
    canActivate: [AuthGuardService]
  },
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'carrito' , component: CartComponent},
  {path: 'checkout' , component: CheckoutComponent},
  {
    path: 'editar-orden/:orden' , component: EditarOrdenComponent,
    data: {roles: [ UserRolesModel.OrdenesEdicion, UserRolesModel.OrdenesConsulta]},
    canActivate: [AuthGuardService]
  },
  {path: 'orden-confirmacion/:orden' , component: OrdenConfirmacionComponent},
  {
    path: 'productos-pendientes' ,
    component: ListaProductosPendientesComponent,
    data: {roles: [ UserRolesModel.OrdenesEdicion, UserRolesModel.OrdenesConsulta]},
    canActivate: [AuthGuardService]
  },

  {path: 'images' , component: ImagesComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
