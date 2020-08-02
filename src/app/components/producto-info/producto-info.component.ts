import { Component, OnInit, Inject } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-producto-info',
  templateUrl: './producto-info.component.html',
  styleUrls: ['./producto-info.component.scss']
})
export class ProductoInfoComponent implements OnInit {

  producto: ProductoModel;
  constructor(public dialogRef: MatDialogRef<ProductoInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.producto = this.data.producto;
  }

}
