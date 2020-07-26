import { Component, OnInit } from '@angular/core';
import { ProductoOrdenService } from 'src/app/services/producto-orden.service';
import { ProductoOrdenPendienteDtoModel } from 'src/app/models/productoOrdenPendienteDto.model';

@Component({
  selector: 'app-lista-productos-pendientes',
  templateUrl: './lista-productos-pendientes.component.html',
  styleUrls: ['./lista-productos-pendientes.component.scss']
})
export class ListaProductosPendientesComponent implements OnInit {

  productos: ProductoOrdenPendienteDtoModel[] = [];
  constructor(private productoOrdenServ: ProductoOrdenService) { }

  ngOnInit(): void {
    this.GetProductosPendientes();
  }

  GetProductosPendientes(){
    this.productoOrdenServ.GeProductosOrdenPendientes().subscribe((Response: ProductoOrdenPendienteDtoModel[]) => {
      this.productos = Response;
      console.log(Response);

    });
  }

}
