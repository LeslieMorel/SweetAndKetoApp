import { OrdenesModel } from './ordenes.model';
import { ProductoOrdenModel } from './productoOrden.model';

export class OrdenWithProductos {
  orden: OrdenesModel;
  productos: ProductoOrdenModel[];
}
