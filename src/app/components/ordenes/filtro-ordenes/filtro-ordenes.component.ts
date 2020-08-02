import { Component, OnInit } from '@angular/core';
import { EstadoOrdenPipePipe } from 'src/app/customPipes/estado-orden-pipe.pipe';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filtro-ordenes',
  templateUrl: './filtro-ordenes.component.html',
  styleUrls: ['./filtro-ordenes.component.scss']
})
export class FiltroOrdenesComponent implements OnInit {

  estados: {value: number, text: string}[] = new EstadoOrdenPipePipe().Estados;
  filtros: FiltrosOrdenes = new FiltrosOrdenes();

  constructor(public dialogRef: MatDialogRef<FiltroOrdenesComponent>) { }

  ngOnInit(): void {
  }

  Filtrar(){
    this.dialogRef.close(this.filtros);
  }
  BorrarFiltros(){
    this.filtros = null;
    this.dialogRef.close();
  }

}

export class FiltrosOrdenes {
  estados: string[];
  nombreCliente: string;
  ordenId: number;
}
