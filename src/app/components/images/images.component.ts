import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { AttachFilesService } from 'src/app/services/attach-files.service';
import { AzureStorageService } from 'src/app/services/azure-storage.service';
import { AttachDocumentsValidator } from 'src/app/models/validFilesType.model';
import { AzureFile } from 'src/app/models/azureFile.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TipoSnackBar } from '../snackbar/snackbar.component';
import { SnackbarPanelClass } from 'src/app/models/SnackBarPanelClass.model';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  @Output() ImageSelectEvent = new EventEmitter<AzureFile>();
  images: AzureFile[] = [];
  selectedImg: AzureFile;
  constructor(
    private azureService: AzureStorageService,
    private snackBarService: SnackbarService,

  ) {}

  ngOnInit(): void {
    this.GetImages();
  }

  GetImages() {
    this.azureService.GetImages().subscribe((Response: AzureFile[]) => {
      this.images = Response;
      console.log(Response);
    });
  }

  imgClass(img: AzureFile) {
    if (this.selectedImg && img.fileName === this.selectedImg.fileName) {
      return 'selected';
    } else {
      return '';
    }
  }
  Seleccionar() {
    this.ImageSelectEvent.emit(this.selectedImg);
  }
  SetImagenSeleccionada(imagen: AzureFile) {
    this.selectedImg = imagen;
    console.log(this.selectedImg);
  }
  PostImagen(event: any) {
    console.log(event);
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      if (AttachDocumentsValidator.validCompronte.includes(selectedFile.type)) {
        console.log('Valid type');
        this.azureService.PostImage(selectedFile).subscribe(
          (Response: any) => {
            console.log(Response);
            this.snackBarService.Show(
              'Guardado correctamente',
              TipoSnackBar.Success,
              1000,
              SnackbarPanelClass.success
            );
            this.GetImages();
          },
          (e) => {
            console.log(e);
            this.snackBarService.Show(
              'Error',
              TipoSnackBar.Error,
              1000,
              SnackbarPanelClass.error
            );
          }
        );
      } else {
        console.log('Formato de documento Invalido');
      }
    }
  }

  DeleteImage() {
    const confirmar = confirm(
      'Seguro desea eliminar la imagen? Los cambios seran permanentes'
    );
    if (confirmar) {
      console.log(this.selectedImg);
      this.azureService.DeleteImage(this.selectedImg.fileName).subscribe(
        (Response) => {
          console.log(Response);
          this.snackBarService.Show(
            'Imagen eliminada',
            TipoSnackBar.Success,
            1000,
            SnackbarPanelClass.success
          );
          this.GetImages();
        },
        (e) => {
          console.log(e);
          this.snackBarService.Show(
            'Error',
            TipoSnackBar.Error,
            1000,
            SnackbarPanelClass.error
          );
        }
      );
    }
  }



}
