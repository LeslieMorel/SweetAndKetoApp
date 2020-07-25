import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenesModel } from 'src/app/models/ordenes.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrdenesService } from 'src/app/services/ordenes.service';

@Component({
  selector: 'app-lista-ordenes',
  templateUrl: './lista-ordenes.component.html',
  styleUrls: ['./lista-ordenes.component.scss']
})
export class ListaOrdenesComponent implements OnInit {

  ordenes: OrdenesModel[] = [];
  ordenesDataSource = new MatTableDataSource(this.ordenes);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'cliente',
    'estado',
    'metodoEntrega',
    'fechaRequerida',
    'monto'
  ];
  constructor(private ordenesService: OrdenesService) { }
  ngOnInit(): void {
    console.log('OrdenesComponent');

    this.GetOrdenes();
  }

  GetOrdenes(){

    console.log('Getting Ordeness');
    this.ordenesService.GetOrdenes().subscribe((Response: OrdenesModel[]) => {
      this.ordenes = Response;
      console.log(Response);
      this.setDataSource(Response);
    });
  }

  setDataSource(filteredOrdenes: OrdenesModel[]) {
    this.ordenesDataSource = new MatTableDataSource<OrdenesModel>(filteredOrdenes);
    this.ordenesDataSource.paginator = this.paginator;
    this.ordenesDataSource.sort = this.sort;
  }

}
