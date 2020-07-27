export class OrdenDtoModel {
  id: number;
  nombreCliente: string;
  email: string;
  telefono: number;
  fechaCreacion: Date;
  fechaRequerida: Date;
  diasParaEntrega: number;
  ciudad: string;
  direccion2: string;
  direccion1: string;
  zona: string;
  autorizada: boolean;
  usuarioAutorizo?: string;
  precioDelivery: number;
  monto: number;
  montoTotal: number;
  comprobanteId?: any;
}
