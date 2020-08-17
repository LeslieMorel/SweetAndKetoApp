import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiComponent } from './bi.component';
import { ProductBiComponent } from './components/product-bi/product-bi.component';

const routes: Routes = [{ path: '', component: BiComponent , children: [
  {path:'', component: ProductBiComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiRoutingModule { }
