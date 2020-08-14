import { Component, OnInit, Input } from '@angular/core';
import { ProductoOrdenModel } from 'src/app/models/productoOrden.model';
import { OrdenesModel } from 'src/app/models/ordenes.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-orden',
  templateUrl: './productos-orden.component.html',
  styleUrls: ['./productos-orden.component.scss']
})
export class ProductosOrdenComponent implements OnInit {
  @Input() productoOrden: ProductoOrdenModel;
  constructor() { }

  ngOnInit(): void {


  }

}
