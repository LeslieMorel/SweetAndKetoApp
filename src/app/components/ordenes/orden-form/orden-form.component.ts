import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdenesModel } from 'src/app/models/ordenes.model';
import { startWith, map } from 'rxjs/operators';
import { Sectores, SectorModel } from 'src/app/models/sectores.model';
import { OrderStates } from 'src/app/models/estadosOrdenes.model';
import { Observable } from 'rxjs';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { EstadoOrdenPipePipe } from 'src/app/customPipes/estado-orden-pipe.pipe';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoOrdenModel } from 'src/app/models/productoOrden.model';
import { OrdenBundleDTO } from 'src/app/models/ordenBundleDTO.model';
import { SectoresService } from 'src/app/services/sectores.service';
import { AttachDocumentsValidator } from 'src/app/models/validFilesType.model';
import { AttachFilesService } from 'src/app/services/attach-files.service';
import { AttachFile } from 'src/app/models/attachFile.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarPanelClass } from 'src/app/models/SnackBarPanelClass.model';
import { HorarioEntregaService } from 'src/app/services/horario-entrega.service';
import { HorarioEntregaModel } from 'src/app/models/horarioEntrega.model';
import { TipoSnackBar } from '../../snackbar/snackbar.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-orden-form',
  templateUrl: './orden-form.component.html',
  styleUrls: ['./orden-form.component.scss']
})
export class OrdenFormComponent implements OnInit {

 @Output() validSumit = new EventEmitter<OrdenesModel>();
 @Input() orden: OrdenesModel;
  @Input() edit: boolean;
  @Input() ordenId: string;
  deliveryValidators = [];
  filteredOptions: Observable<SectorModel[]>;
  options: string[] = [];
  selectedFile: File;
  horariosEntrega: HorarioEntregaModel[] = [];
  sectores: SectorModel[] = [];
  loading = false;

  estados: {value: number, text: string}[] = new EstadoOrdenPipePipe().Estados;
  ordenForm = new FormGroup({
    id: new FormControl(),
    nombreCliente: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.email),
    // phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.pattern('^[0-9]*$')]),
    phoneNumber: new FormControl(null, [Validators.minLength(9), Validators.pattern('^[0-9]*$')]),
    fechaCreacion: new FormControl(),
    fechaRequerida: new FormControl(),
    estadoOrden: new FormControl(null, Validators.required),
    ciudad: new FormControl('DN'),
    zona: new FormControl(null),
    direccion1: new FormControl(null),
    direccion2: new FormControl(),
    metodoEntrega: new FormControl(null, Validators.required),
    autorizada: new FormControl(false),
    esRegalo: new FormControl(false),
    usuarioAutorizo: new FormControl(),
    precioDelivery: new FormControl(0),
    monto: new FormControl(0),
    montoTotal: new FormControl(0),
    comprobanteId: new FormControl(null),
    horarioEntregaId: new FormControl(null),
    pagada: new FormControl(false),
    formaPago: new FormControl(null),
    horaEntrega: new FormControl(null),
  });
  constructor(
              public cartService: CarritoService,
              private sectoresService: SectoresService,
              private attachFilesService: AttachFilesService,
              private ordenService: OrdenesService,
              private snackBarService: SnackbarService,
              private horarioEntregaServ: HorarioEntregaService ) { }

  ngOnInit(): void {
    this.GetHorariosEntrega();
    this.GetSectores();
    this.ordenForm.setValue(this.orden);
    // this.ordenService.ordenChange.subscribe((orden: OrdenesModel) => {
    //   this.ordenForm.setValue(orden);
    // });
    this.CalcularMontoTotal();
    this.filteredOptions = this.ordenForm.controls.zona.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    // this.ordenForm.get('metodoEntrega').valueChanges
    // .subscribe(resp => {this.SetDeliveryMethodValidations(resp); });
    this.ordenForm.get('zona').valueChanges
    .subscribe((resp) => {this.SetPrecioDelivery(); });
    this.ordenForm.get('precioDelivery').valueChanges
    .subscribe((resp) => {this.CalcularMontoTotal(); });
    this.ordenForm.get('monto').valueChanges
    .subscribe((resp) => {this.CalcularMontoTotal(); });
    }


  private _filter(value: string): SectorModel[] {
    if (value === null) { return null; }
    const filterValue = value.toLowerCase();


    // return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    return this.sectores.filter(sector => sector.descripcion.toLowerCase().includes(filterValue));

  }



  Submit() {
    console.log(this.ordenForm);
    if (this.ordenForm.valid){
      this.validSumit.emit(this.ordenForm.value);
    } else {
      console.log('Datos Invalidos en el formulario');
    }

  }


  SetDeliveryMethodValidations(deliveryMethod: number) {
    // this.ordenForm.get().updateValueAndValidity();
    // this.ordenForm.get('zozonane').updateValueAndValidity();
    if (this.ordenForm !== null){
        if (deliveryMethod === 0) {
          this.ordenForm.get('direccion1').setValidators(this.deliveryValidators.concat(Validators.required));
          // this.ordenForm.get('direccion2').setValidators(this.deliveryValidators.concat(Validators.required));
          this.ordenForm.get('zona').setValidators(this.deliveryValidators.concat(Validators.required));
          this.ordenForm.get('ciudad').setValidators(this.deliveryValidators.concat(Validators.required));
        } else {
          this.ordenForm.get('direccion1').setValidators(this.deliveryValidators);
          // this.ordenForm.get('direccion2').setValidators(this.deliveryValidators);
          this.ordenForm.get('zona').setValidators(this.deliveryValidators);
          this.ordenForm.get('ciudad').setValidators(this.deliveryValidators);
        }
        this.ordenForm.get('ciudad').updateValueAndValidity();
        this.ordenForm.get('zona').updateValueAndValidity();
        this.ordenForm.get('direccion1').updateValueAndValidity();
        // this.ordenForm.get('direccion2').updateValueAndValidity();
        console.log(this.deliveryValidators.toString());
      }

    }

  SetPrecioDelivery(){
    // console.log('Setting Delivery Price');

    if (this.ordenForm.controls.metodoEntrega.value === MetodoEntrega.Delivery){
      const sectorIdSelected = this.ordenForm.controls.zona.value;
      // console.log(sectorIdSelected);

      const sector = this.sectores.filter(s => s.id === sectorIdSelected)[0];
      if (sector) {
        this.ordenForm.controls.precioDelivery.setValue(sector.precio);
      }
    }
    else if (this.ordenForm.controls.metodoEntrega.value === MetodoEntrega.Pickup){
      this.ordenForm.controls.precioDelivery.setValue(0);

    }
    this.CalcularMontoTotal();
  }

  CalcularMontoTotal(){
    console.log('Precio Changed');
    const monto = this.ordenForm.controls.monto.value;
    const precioDelivery = this.ordenForm.controls.precioDelivery.value;
    const montoTotal = monto + precioDelivery;
    this.ordenForm.controls.montoTotal.setValue(montoTotal);
  }



  GetSectores(){
    this.sectoresService.GetSectores().subscribe((Response: SectorModel[]) => {
      this.sectores = Response;
      // console.log(this.sectores);

    });
  }

  GetHorariosEntrega(){
    this.horarioEntregaServ.Get().subscribe((Response: HorarioEntregaModel[]) => {
      this.horariosEntrega = Response;
      // console.log(Response);
    });
  }
  SetComprobante(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

    if (AttachDocumentsValidator.validCompronte.includes(this.selectedFile.type)){
      console.log('Valid type');
      this.PostFile(this.selectedFile);
    } else {
      this.selectedFile = null;
      console.log('Formato de documento Invalido');
    }
  }

  PostFile(file: File){
    this.loading = true;
    this.attachFilesService.PostFile('Comprobante', file).subscribe((Response: AttachFile) => {
      this.loading =false;
      console.log(Response);
      this.ordenForm.controls.comprobanteId.setValue(Response.id);
      this.snackBarService.Show('Actualizado', TipoSnackBar.Success, 1000, SnackbarPanelClass.success);
    }, (e) =>
     {
      this.loading =false;
      this.snackBarService.Show('Error', TipoSnackBar.Error, 1000, SnackbarPanelClass.error);
      console.log(e);
      }
    );
  }
  DownladComprobante(){
    const attachFile = this.ordenForm.controls.comprobanteId.value;
    console.log(attachFile);
    this.DownLoadFile(attachFile);
  }
  DownLoadFile(file: number) {
    console.log(file);
    this.attachFilesService.GetFile(file).subscribe(Response => {
      const contentType = Response.headers.get('Content-Type');
      const fileName = Response.headers.get('Name');
      this.attachFilesService.DownLoadFile(Response.body, contentType, fileName);
    });
  }


}

enum MetodoEntrega {
  Delivery,
  Pickup
}


