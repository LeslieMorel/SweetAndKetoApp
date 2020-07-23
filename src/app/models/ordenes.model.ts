export class OrdenesModel {
  id: number;
  nombreCliente: string;
  email: null;
  telefono: number;
  fechaCreacion: Date;
  fechaRequerida: Date;
  estadoOrden: number;
  direcccion: string;
  zona: string;
  metodoEntrega: number;
  autorizada: boolean;
  usuarioAutorizo: string;
  monto: number;
}
