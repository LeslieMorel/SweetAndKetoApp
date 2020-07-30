import { ProductoOrdenModel } from './productoOrden.model';

export class OrdenesModel {
  id: number;
  nombreCliente: string;
  email: string;
  telefono: number;
  fechaCreacion: Date;
  fechaRequerida: Date;
  estadoOrden: number;
  direccion1: string;
  direccion2: string;
  ciudad: string;
  zona: string;
  metodoEntrega: number;
  autorizada: boolean;
  usuarioAutorizo: string;
  precioDelivery: number;
  monto: number;
  montoTotal: number;
  comprobanteId?: number;
  horarioEntregaId?: number;

  productoOrdenNavigation?: ProductoOrdenModel[];

  constructor(){
    this.id = 0;
    this.comprobanteId = null;
    this.nombreCliente = null;
    this.email = null;
    this.telefono = null;
    this.fechaCreacion = new Date();
    this.fechaRequerida = new Date();
    this.estadoOrden = 65;
    this.direccion1 = null;
    this.direccion2 = null;
    this.zona = null;
    this.ciudad = 'DN';
    this.metodoEntrega = null;
    this.autorizada = false;
    this.usuarioAutorizo = null;
    this.monto = 0;
    this.montoTotal = 0;
    this.precioDelivery = 0;
    this.horarioEntregaId = null;

  }
}
