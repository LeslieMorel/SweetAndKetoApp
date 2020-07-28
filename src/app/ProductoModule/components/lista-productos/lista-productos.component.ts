import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoModel } from 'src/app/models/producto.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TipoSnackBar } from 'src/app/components/snackbar/snackbar.component';
import { SnackbarPanelClass } from 'src/app/models/SnackBarPanelClass.model';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  search = new FormControl();
  proteins: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  productos: ProductoModel[] = [];
  productosDataSource = new MatTableDataSource(this.productos);
  displayedColumns: string[] = [
    'actions',
    'id',
    'descripcion',
    'imgUrl',
    'precio',
    'costo',
    'calorias',
    'carbs',
    'proteins',
    'fat'
  ];

  constructor(private productoService: ProductosService,
              private snackServ: SnackbarService,
              private router: Router) { }


  ngOnInit(): void {
    this.GetProductos();
  }
  GetProductos(){
    this.productoService.GeProductos().subscribe((Response: ProductoModel[]) =>
    {console.log(Response);
     this.SetDataSource(Response);

    });
  }
  SetDataSource(productos: ProductoModel[]){
    this.productosDataSource = new MatTableDataSource(productos);
    this.productosDataSource.paginator = this.paginator;
    this.productosDataSource.sort = this.sort;
  }
  filtrar(){
    this.productosDataSource.filter = this.search.value.toLowerCase();

  }

  EditarProducto(producto: ProductoModel){
    this.productoService.SetProducto(producto);
    this.router.navigate(['/productos/editar/', producto.id]);
  }
  DeleteProducto(producto: ProductoModel){
    const confirmar = confirm("Seguro que desea eliminar este producto?. Los cambios serán permanentes...");
    if (confirmar){
      this.productoService.DeleteProducto(producto.id).subscribe(resp => {
        this.snackServ.Show('Eliminado correctamente', TipoSnackBar.Success, 1000, SnackbarPanelClass.success);
        this.GetProductos();

      }, e => {
        console.log(e);
        this.snackServ.Show('Error', TipoSnackBar.Error, 1000, SnackbarPanelClass.error);
      });
    }
  }

}
