import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { ProductosComponent } from './components/productos/productos.component';


const routes: Routes = [
  {path: '' , component: OrdenesComponent},
  {path: 'tienda' , component: ProductosComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
