import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ProductoVistaComponent } from './components/producto-vista/producto-vista.component';
import { ProductoCrearComponent } from './components/producto-crear/producto-crear.component';
import { ProductoEditarComponent } from './components/producto-editar/producto-editar.component';
import { UserRolesModel } from '../models/auth/userRoles.model';
import { AuthGuardService } from '../services/auth-guard.service';


const routes: Routes = [
  { path: 'productos', component: ProductoVistaComponent, children: [
    {path: '', component: ListaProductosComponent},
    {path: 'crear', component: ProductoCrearComponent},
    {path: 'editar/:id', component: ProductoEditarComponent}
  ] ,
    data: {roles: [ UserRolesModel.Admin]},
    canActivate: [AuthGuardService]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule {}
