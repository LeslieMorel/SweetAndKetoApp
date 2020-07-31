import { Component, OnInit, Input } from '@angular/core';
import { ProductoOrdenPendienteDtoModel } from 'src/app/models/productoOrdenPendienteDto.model';

@Component({
  selector: 'app-productos-pendientes',
  templateUrl: './productos-pendientes.component.html',
  styleUrls: ['./productos-pendientes.component.scss']
})
export class ProductosPendientesComponent implements OnInit {

  @Input() productoOrdenPendientes: ProductoOrdenPendienteDtoModel;
  constructor() { }

  ngOnInit(): void {
  }

  Day(days): Date {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

}
