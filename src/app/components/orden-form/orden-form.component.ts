import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'app-orden-form',
  templateUrl: './orden-form.component.html',
  styleUrls: ['./orden-form.component.scss']
})
export class OrdenFormComponent implements OnInit {

  @Input() edit: boolean;
  @Input() ordenId: string;
  deliveryValidators = [];
  filteredOptions: Observable<SectorModel[]>;
  options: string[] = [];
  sectores: SectorModel[] = [];

  estados: {value: number, text: string}[] = new EstadoOrdenPipePipe().Estados;
  orden: OrdenesModel;
  ordenForm = new FormGroup({
    id: new FormControl(),
    nombreCliente: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.email),
    telefono: new FormControl(null, [Validators.required, Validators.minLength(9)]),
    fechaCreacion: new FormControl(),
    fechaRequerida: new FormControl(),
    estadoOrden: new FormControl(null, Validators.required),
    ciudad: new FormControl('DN', this.deliveryValidators),
    zona: new FormControl(null, this.deliveryValidators),
    direccion1: new FormControl(null, this.deliveryValidators),
    direccion2: new FormControl(null, this.deliveryValidators),
    metodoEntrega: new FormControl(null, Validators.required),
    autorizada: new FormControl(false),
    usuarioAutorizo: new FormControl(),
    // productoOrdenNavigation: new FormControl(null),
    precioDelivery: new FormControl(0),
    monto: new FormControl(0),
    montoTotal: new FormControl(0),
  });
  constructor(private ordenService: OrdenesService,
              public cartService: CarritoService,
              private sectoresService: SectoresService) { }

  ngOnInit(): void {

    this.GetSectores();
    this.IniOrden();

    // this.options = Sectores.Get().map(s => s.descripcion);
    // this.sectores = Sectores.Get();
    this.filteredOptions = this.ordenForm.controls.zona.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.ordenService.ordenChange.subscribe((orden: OrdenesModel) => {
      this.ordenForm.setValue(orden);
    });
    this.ordenForm.get('metodoEntrega').valueChanges
    .subscribe(resp => {this.SetDeliveryMethodValidations(resp); console.log(resp); });

    this.ordenForm.get('zona').valueChanges
    .subscribe((resp) => {this.SetPrecioDelivery(); console.log(resp);
    });
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
      const orden: OrdenesModel = this.ordenForm.value;
      if (this.edit) { this.PutOrden(this.ordenId, orden ); }
      else { this.PostOrden(orden); }

    } else {
      console.log('Datos Invalidos en el formulario');
    }

  }

  AddProductos(orden: OrdenesModel): boolean{
    if (this.cartService.productos.length > 0){
      const productosOrden: ProductoOrdenModel[] = [];
      this.cartService.productos.forEach(producto => {
        const productoOrden: ProductoOrdenModel = {
          id: 0,
          ordenId: 0,
          productoId: producto.producto.id,
          cantidad: producto.cantidad,
          precio: producto.producto.precio,
          subtotal: producto.producto.precio * producto.cantidad
        };
        productosOrden.push(productoOrden);
      });
      orden.productoOrdenNavigation = productosOrden;
      return true;
    } else {
       return false;
    }
  }
  SetDeliveryMethodValidations(deliveryMethod: number) {
    // this.ordenForm.get().updateValueAndValidity();
    // this.ordenForm.get('zozonane').updateValueAndValidity();
    if(this.ordenForm !== null){
        if (deliveryMethod === 0) {
          this.ordenForm.get('direccion1').setValidators(this.deliveryValidators.concat(Validators.required));
          this.ordenForm.get('direccion2').setValidators(this.deliveryValidators.concat(Validators.required));
          this.ordenForm.get('zona').setValidators(this.deliveryValidators.concat(Validators.required));
          this.ordenForm.get('ciudad').setValidators(this.deliveryValidators.concat(Validators.required));
        } else {
          this.ordenForm.get('direccion1').setValidators(this.deliveryValidators);
          this.ordenForm.get('direccion2').setValidators(this.deliveryValidators);
          this.ordenForm.get('zona').setValidators(this.deliveryValidators);
          this.ordenForm.get('ciudad').setValidators(this.deliveryValidators);
        }
        this.ordenForm.get('ciudad').updateValueAndValidity();
        this.ordenForm.get('zona').updateValueAndValidity();
        this.ordenForm.get('direccion1').updateValueAndValidity();
        this.ordenForm.get('direccion2').updateValueAndValidity();
        console.log(this.deliveryValidators.toString());
      }

    }

  IniOrden(){
    if (this.edit){
      console.log('Edit OrderForm');
      console.log(this.ordenService.orden);
      // this.ordenForm.setValue(new OrdenesModel());

    } else {
      this.NuevaOrden();
    }
  }

  NuevaOrden(){
    const orden = new OrdenesModel();
    orden.monto = this.cartService.AmountInCart();
    this.ordenForm.setValue(orden);

  }

  PostOrden(orden: OrdenesModel){
    if (this.AddProductos(orden)){
      console.log(orden);
      this.ordenService.PostOrden(orden).subscribe((Response: OrdenesModel) => {
        console.log(Response);
      });
    } else {
      console.log(' No hay productos en la orden');
    }
  }
  PutOrden(ordenId: string, orden: OrdenesModel){

    this.ordenService.PutOrden(ordenId, orden).subscribe( Response => {
      console.log(Response);
    });
  }

  SetPrecioDelivery(){
    console.log('Setting Delivery Price');

    if (this.ordenForm.controls.metodoEntrega.value === MetodoEntrega.Delivery){
      const sectorIdSelected = this.ordenForm.controls.zona.value;
      console.log(sectorIdSelected);

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
    const monto = this.ordenForm.controls.monto.value;
    const precioDelivery = this.ordenForm.controls.precioDelivery.value;
    const montoTotal = monto + precioDelivery;
    this.ordenForm.controls.montoTotal.setValue(montoTotal);
  }



  GetSectores(){
    this.sectoresService.GetSectores().subscribe((Response: SectorModel[]) => {
      this.sectores = Response;
      console.log(this.sectores);

    });
  }

}

enum MetodoEntrega {
  Delivery,
  Pickup
}


