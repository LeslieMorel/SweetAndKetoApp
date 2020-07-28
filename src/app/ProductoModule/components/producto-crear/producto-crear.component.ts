import { Component, OnInit } from '@angular/core';
import { ProductoModule } from '../../producto.module';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TipoSnackBar } from 'src/app/components/snackbar/snackbar.component';
import { SnackbarPanelClass } from 'src/app/models/SnackBarPanelClass.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.scss']
})
export class ProductoCrearComponent implements OnInit {

  producto = new ProductoModel();
  constructor(private productoService: ProductosService,
              private snackServ: SnackbarService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ValidSubmit(producto: ProductoModel){
    console.log('Post');
    console.log(producto);
    this.productoService.PostProducto(producto).subscribe((Response: ProductoModel) => {
      this.snackServ.Show('Creado correctamente', TipoSnackBar.Success, 1000, SnackbarPanelClass.success);
      this.productoService.SetProducto(Response);
      this.router.navigate(['/productos/editar/', Response.id]);


    }, e => {
      console.log(e);
      this.snackServ.Show('Error', TipoSnackBar.Error, 1000, SnackbarPanelClass.error);
    });
  }


}
