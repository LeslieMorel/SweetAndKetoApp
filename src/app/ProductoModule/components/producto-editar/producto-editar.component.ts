import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ProductoModel } from 'src/app/models/producto.model';
import { TipoSnackBar } from 'src/app/components/snackbar/snackbar.component';
import { SnackbarPanelClass } from 'src/app/models/SnackBarPanelClass.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.scss']
})
export class ProductoEditarComponent implements OnInit, OnDestroy {

  productoChangeSubs = new Subscription();
  productoId: string;

  producto: ProductoModel;
  constructor(private productoService: ProductosService,
              private snackServ: SnackbarService,
              private activatedRoute: ActivatedRoute
              ) { }
  ngOnDestroy(): void {
    this.productoChangeSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.producto = this.productoService.producto;
    this.productoChangeSubs = this.productoService.productoChanged.subscribe((Response: ProductoModel) => {
      this.producto = Response;
    });
    this.activatedRoute.paramMap.subscribe(resp => {
      this.productoId = resp.get('id');
    });
  }


  ValidSubmit(producto: ProductoModel){
    console.log('Post');
    console.log(producto);
    this.productoService.PutProducto(this.productoId, producto).subscribe((Response: ProductoModel) => {
      this.snackServ.Show('Editado correctamente!', TipoSnackBar.Success, 1000, SnackbarPanelClass.success);
    }, e => {
      console.log(e);
      this.snackServ.Show('Error', TipoSnackBar.Error, 1000, SnackbarPanelClass.error);
    });
  }

}
