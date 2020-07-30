import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImagesComponent } from 'src/app/components/images/images.component';
import { DialogImagenesComponent } from 'src/app/components/dialog-imagenes/dialog-imagenes.component';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss']
})
export class ProductoFormComponent implements OnInit {
  @Output()
  ValidSubmit = new  EventEmitter <ProductoModel>();
  @Input() producto: ProductoModel;

  productoForm = new FormGroup({
    id: new FormControl(),
    descripcion: new FormControl(null, Validators.required),
    precio: new FormControl(0, [Validators.required, Validators.min(1)]),
    costo: new FormControl(0, [Validators.required, Validators.min(1)]),
    imgUrl: new FormControl(),
    calorias: new FormControl(0, [Validators.required]),
    carbs: new FormControl(0, [Validators.required]),
    fat: new FormControl(0, [Validators.required]),
    proteins: new FormControl(0, [Validators.required]),
  });

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.InitForm();
  }

  InitForm(){
    this.productoForm.setValue(this.producto);
  }
  Submit(){
    console.log(this.productoForm);
    if (this.productoForm.valid){
      this.ValidSubmit.emit(this.productoForm.value);
    }
  }

  openImgDialog(){
    console.log('open Dialog');
    const dialogRef = this.dialog.open(DialogImagenesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result){
        this.productoForm.controls.imgUrl.setValue(result);
      }
    });

  }

}
