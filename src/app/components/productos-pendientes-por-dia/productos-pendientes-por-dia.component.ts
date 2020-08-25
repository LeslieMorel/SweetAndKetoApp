import { Component, OnInit } from '@angular/core';
import { ProductoOrdenService } from 'src/app/services/producto-orden.service';
import { ProductoPendientePorDia } from 'src/app/models/ProductoPendientePorDia.model';

@Component({
  selector: 'app-productos-pendientes-por-dia',
  templateUrl: './productos-pendientes-por-dia.component.html',
  styleUrls: ['./productos-pendientes-por-dia.component.scss']
})
export class ProductosPendientesPorDiaComponent implements OnInit {

  loading = false;
  productos: ProductoPendientePorDia[] = [];
  constructor(private productoOrdenServ: ProductoOrdenService) { }

  ngOnInit(): void {
    this.GetProductosPendientesPorDia();
  }


  GetProductosPendientesPorDia(){
    this.productoOrdenServ.GeProductosOrdenPendientesPorDia().subscribe((Response: ProductoPendientePorDia[]) => {
      this.productos = Response;
      console.log(Response);
    });
  }

}
