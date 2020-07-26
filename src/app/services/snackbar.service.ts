import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoSnackBar, SnackbarComponent } from '../components/snackbar/snackbar.component';
import { SnackbarPanelClass } from '../models/SnackBarPanelClass.model';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  Show(mensaje?: string, tipo?: TipoSnackBar, duration?: number, panelClass?: string ){
    this.snackBar.openFromComponent(
      SnackbarComponent,
      {data: {mensaje , tipo },
      panelClass:  panelClass || ['info-snackbar'],
      duration: duration || 2000});
  }
}

