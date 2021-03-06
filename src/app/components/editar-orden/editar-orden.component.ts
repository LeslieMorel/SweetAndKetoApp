import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { OrdenesModel } from 'src/app/models/ordenes.model';
import { ProductoOrdenModel } from 'src/app/models/productoOrden.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TipoSnackBar } from '../snackbar/snackbar.component';
import { SnackbarPanelClass } from 'src/app/models/SnackBarPanelClass.model';

@Component({
  selector: 'app-editar-orden',
  templateUrl: './editar-orden.component.html',
  styleUrls: ['./editar-orden.component.scss']
})
export class EditarOrdenComponent implements OnInit {


  loading = false;
  productTab = true;
  orden: OrdenesModel;
  ordenId: string;
  productosOrden: ProductoOrdenModel[] = [];
  constructor(private activeRoute: ActivatedRoute,
              private snackBarService: SnackbarService,
              private ordenesService: OrdenesService) { }

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
      this.orden = resp;
      console.log(resp);
    });
    this.ordenesService.GetProductosOfOrden(ordenId).subscribe((resp: ProductoOrdenModel[]) => {
      // this.ordenesService.productosOrden = resp;
      this.productosOrden = resp;
      console.log('Productos Orden');
      console.log(resp);
      // this.orden.productoOrdenNavigation = this.productosOrden;

    });
  }
  PutOrden(orden: OrdenesModel){
    this.loading = true;
    this.ordenesService.PutOrden(orden.id.toString(), orden).subscribe( Response => {
      console.log(Response);
      this.loading = false;
      this.snackBarService.Show('Actualizado', TipoSnackBar.Success, 1000, SnackbarPanelClass.success);
    }, e => {
      this.loading = false;
      this.snackBarService.Show('Error', TipoSnackBar.Error, 1000, SnackbarPanelClass.error);
      console.log(e);
    }
     );
  }

}
