import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenesModel } from 'src/app/models/ordenes.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { OrdenDtoModel } from 'src/app/models/ordenDto.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TipoSnackBar } from '../../snackbar/snackbar.component';
import { SnackbarPanelClass } from 'src/app/models/SnackBarPanelClass.model';
import { AuthService } from 'src/app/services/auth.service';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FiltroOrdenesComponent } from '../filtro-ordenes/filtro-ordenes.component';
@Component({
  selector: 'app-lista-ordenes',
  templateUrl: './lista-ordenes.component.html',
  styleUrls: ['./lista-ordenes.component.scss'],
})
export class ListaOrdenesComponent implements OnInit {
  constructor(private ordenesService: OrdenesService,
              public authServ: AuthService,
              private snackServ: SnackbarService,
              private router: Router,
              private dialog: MatDialog) {}
  ordenes: OrdenDtoModel[] = [];
  ordenesDataSource = new MatTableDataSource(this.ordenes);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'select',
    // 'id',
    'cliente',
    'estado',
    'metodoEntrega',
    'monto',
  ];

  selection = new SelectionModel<OrdenDtoModel>(true, []);
  ngOnInit(): void {
    console.log('OrdenesComponent');

    this.GetOrdeneDto();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.ordenesDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.ordenesDataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: OrdenDtoModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  // GetOrdenes() {
  //   console.log('Getting Ordeness');
  //   this.ordenesService.GetOrdenes().subscribe((Response: OrdenesModel[]) => {
  //     this.ordenes = Response;
  //     console.log(Response);
  //     this.setDataSource(Response);
  //   });
  // }
  GetOrdeneDto() {
    console.log('Getting Ordeness');
    this.ordenesService.GetOrdenesDto().subscribe((Response: OrdenDtoModel[]) => {
      this.ordenes = Response;
      console.log(Response);
      this.setDataSource(Response);
    });
    this.selection = new SelectionModel<OrdenDtoModel>(true, []);
  }

  setDataSource(filteredOrdenes: OrdenDtoModel[]) {
    this.ordenesDataSource = new MatTableDataSource<OrdenDtoModel>(filteredOrdenes);
    this.ordenesDataSource.paginator = this.paginator;
    this.ordenesDataSource.sort = this.sort;
  }
  // setDataSource(filteredOrdenes: OrdenesModel[]) {
  //   this.ordenesDataSource = new MatTableDataSource<OrdenesModel>(
  //     filteredOrdenes
  //   );
  //   this.ordenesDataSource.paginator = this.paginator;
  //   this.ordenesDataSource.sort = this.sort;
  // }

  estadoClass(estado: number) {
    switch (estado) {
      case 65:
        return 'pendiente chip';
      case 66:
        return 'proceso chip';
      case 67:
        return 'listo chip';
      case 68:
        return 'entregado chip';

      default:
        return 'chip';
    }
  }

  deleteOrden(ordenId: string){
    const confirmed = confirm('Seguro desea eliminar orden');
    if (confirmed){
      this.ordenesService.DeleteOrden(ordenId).subscribe(resp => {
        console.log(resp);
        this.GetOrdeneDto();
        this.snackServ.Show('Eliminada exitosamente', TipoSnackBar.Info, 2000, SnackbarPanelClass.success);

      } , e => {
        console.log(e);
        this.snackServ.Show('Error al eliminar orden', TipoSnackBar.Error, 2000, SnackbarPanelClass.error);
      });
    }
  }

  EditOrdenes(estado: number){
    console.log(this.selection);
    const ordenesId =  this.selection.selected.map( o => o.id);

    this.ordenesService.EditarEstado(estado,ordenesId).subscribe(Response => {
      console.log(Response);
      this.GetOrdeneDto();
      this.snackServ.Show('Estado cambiado exitosamente', TipoSnackBar.Info, 2000, SnackbarPanelClass.success);
    }, e =>{
      console.log(e);
      this.snackServ.Show('Error ', TipoSnackBar.Error, 2000, SnackbarPanelClass.error);

    });
  }

  EliminarOrdenes(){
    console.log('Eliminar');
    console.log(this.selection);
    const confirmar = confirm('Seguro desea eliminar estas ordenes?');
    if (confirmar){
      const ordenesId =  this.selection.selected.map( o => o.id);
      this.ordenesService.DeleteOrdenes(ordenesId).subscribe(Response => {
        console.log(Response);
        this.GetOrdeneDto();
        this.snackServ.Show('Eliminadas exitosamente', TipoSnackBar.Info, 2000, SnackbarPanelClass.success);
      }, e => {
        this.snackServ.Show('Error al eliminar ordenes', TipoSnackBar.Error, 2000, SnackbarPanelClass.error);

      });
    }

  }

  EditarOrden(){
    if (this.selection.selected[0]){
      const ordenId = this.selection.selected[0].id;
      this.router.navigate(['/editar-orden/',ordenId]);
    }
  }

  openFiltroOrdenes(){
    const dialogRef = this.dialog.open(FiltroOrdenesComponent);
    dialogRef.afterClosed().subscribe(resp => {
      console.log(resp);
    });
  }
}
