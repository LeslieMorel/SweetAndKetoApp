import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { OrdenesModel } from 'src/app/models/ordenes.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {

  ordenes: OrdenesModel[] = [];
  constructor(private ordenesService: OrdenesService) { }
  ordenesDataSource = new MatTableDataSource(this.ordenes);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'actions',
    'id',
    'cliente',
    'estado',
    'fechaRequerida',
    'monto'
  ];
  ngOnInit(): void {
    console.log('OrdenesComponent');

    // this.GetOrdenes();
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
