import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EstadoOrdenPipePipe } from 'src/app/customPipes/estado-orden-pipe.pipe';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-filtro-ordenes',
  templateUrl: './filtro-ordenes.component.html',
  styleUrls: ['./filtro-ordenes.component.scss']
})
export class FiltroOrdenesComponent implements OnInit {

  @Output() filtrosLoaded = new EventEmitter<FiltrosOrdenes>();
  key = 'Sweet&Keto_filtrosOrdenes';
  estados: {value: number, text: string}[] = new EstadoOrdenPipePipe().Estados;
  filtros: FiltrosOrdenes = new FiltrosOrdenes();

  constructor(public dialogRef: MatDialogRef<FiltroOrdenesComponent>,private localStorageServ: LocalStorageService) { }

  ngOnInit(): void {
    this.GetFiltrosFromLocalStorage();
  }

  Filtrar(){
    this.localStorageServ.saveToLocalStorage(this.localStorageServ.filtrosOrdenes,this.filtros);
    this.dialogRef.close(this.filtros);
  }
  BorrarFiltros(){
    this.filtros = new FiltrosOrdenes();
    this.localStorageServ.removeFromLocalStorage(this.localStorageServ.filtrosOrdenes);
    this.dialogRef.close(null);
  }

  GetFiltrosFromLocalStorage(){
    const filtros = this.localStorageServ.getFromLocalStorage(this.localStorageServ.filtrosOrdenes);
    if(filtros){
      this.filtros = filtros;
    }

  }
  SaveFiltrosToLocalStorage(){
   this.localStorageServ.saveToLocalStorage(this.localStorageServ.filtrosOrdenes,this.filtros);
  }

}

export class FiltrosOrdenes {
  estados: number[];
  nombreCliente: string;
  ordenId: number;
  constructor(){
    this.estados = [];
    this.nombreCliente = null;
    this.ordenId = null;
  }
}
