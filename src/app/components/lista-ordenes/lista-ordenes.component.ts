import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenesModel } from 'src/app/models/ordenes.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { OrdenDtoModel } from 'src/app/models/ordenDto.model';

@Component({
  selector: 'app-lista-ordenes',
  templateUrl: './lista-ordenes.component.html',
  styleUrls: ['./lista-ordenes.component.scss'],
})
export class ListaOrdenesComponent implements OnInit {
  ordenes: OrdenDtoModel[] = [];
  ordenesDataSource = new MatTableDataSource(this.ordenes);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'cliente',
    'estado',
    'metodoEntrega',
    'monto',
  ];
  constructor(private ordenesService: OrdenesService) {}
  ngOnInit(): void {
    console.log('OrdenesComponent');

    this.GetOrdeneDto();
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
}
