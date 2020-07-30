import { Component, OnInit } from '@angular/core';
import { ImagesComponent } from '../images/images.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AzureFile } from 'src/app/models/azureFile.model';

@Component({
  selector: 'app-dialog-imagenes',
  templateUrl: './dialog-imagenes.component.html',
  styleUrls: ['./dialog-imagenes.component.scss']
})
export class DialogImagenesComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DialogImagenesComponent>) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }

  SelectImage(image: AzureFile){
    this.dialogRef.close(image.url);
    console.log(image);
  }

}
