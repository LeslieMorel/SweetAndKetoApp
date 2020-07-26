import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  mensaje = 'Save';
  icono = 'info';
  tipo: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.mensaje){this.mensaje = this.data.mensaje; }
    this.SetTipoSnackbar();
    console.log('icono: ' + this.icono);
  }
  SetTipoSnackbar(): void{
    switch (this.data.tipo) {
      case TipoSnackBar.Success:
        this.icono = 'save';
        break;
      case TipoSnackBar.Error:
        this.icono = 'clear';
        break;
      case TipoSnackBar.Warning:
        this.icono = 'warning';
        break;
      default:
        this.icono = 'info';
        break;
    }

  }


}

export class SnackbarPropiedades {
  mensaje?: string;
  tipo?: TipoSnackBar;
}
export enum TipoSnackBar {
  Success,
  Error,
  Warning,
  Info
}
