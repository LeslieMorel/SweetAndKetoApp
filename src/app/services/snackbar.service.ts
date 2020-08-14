import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoSnackBar, SnackbarComponent } from '../components/snackbar/snackbar.component';
import { SnackbarPanelClass } from '../models/SnackBarPanelClass.model';
import { GotoCartSnackBarComponent } from '../components/goto-cart-snack-bar/goto-cart-snack-bar.component';

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
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: duration || 2000,
    });
  }

  GoToCartSnack(){
    this.snackBar.openFromComponent(
      GotoCartSnackBarComponent ,
      {
        duration: 3000,
        panelClass:  ['info-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
  }
}



