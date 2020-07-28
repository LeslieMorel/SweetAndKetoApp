import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ProductoCrearComponent } from './components/producto-crear/producto-crear.component';
import { ProductoEditarComponent } from './components/producto-editar/producto-editar.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoVistaComponent } from './components/producto-vista/producto-vista.component';



@NgModule({
  declarations: [ListaProductosComponent, ProductoFormComponent, ProductoCrearComponent, ProductoEditarComponent, ProductoVistaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ProductoRoutingModule
  ]
})
export class ProductoModule { }
