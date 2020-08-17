import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiRoutingModule } from './bi-routing.module';
import { BiComponent } from './bi.component';
import { ProductBiComponent } from './components/product-bi/product-bi.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [BiComponent, ProductBiComponent],
  imports: [
    CommonModule,
    BiRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BiModule { }
