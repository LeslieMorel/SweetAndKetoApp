import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { OrdenesComponent } from '../ordenes/ordenes.component';
import { OrdenesModel } from 'src/app/models/ordenes.model';
import { ProductoOrdenModel } from 'src/app/models/productoOrden.model';

@Component({
  selector: 'app-editar-orden',
  templateUrl: './editar-orden.component.html',
  styleUrls: ['./editar-orden.component.scss']
})
export class EditarOrdenComponent implements OnInit {

  ordenId: string;
  productosOrden: ProductoOrdenModel[] = [];
  constructor(private activeRoute: ActivatedRoute, private ordenesService: OrdenesService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(resp => {
      this.ordenId = resp.get('orden');
      this.SetOrden(this.ordenId);
      console.log(this.ordenId);
    });
    this.ordenesService.ordenChange.subscribe((orden: OrdenesModel) => {
      console.log(orden);
    });
  }

  SetOrden(ordenId: string){
    this.ordenesService.GetOrden(ordenId).subscribe((resp: OrdenesModel) => {
      this.ordenesService.orden = resp;
    });
    this.ordenesService.GetProductosOfOrden(ordenId).subscribe((resp: ProductoOrdenModel[]) => {
      this.ordenesService.productosOrden = resp;
      this.productosOrden = resp;
    });
  }

}
