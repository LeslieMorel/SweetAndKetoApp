import { OrdenesModel } from './ordenes.model';
import { ProductoOrdenModel } from './productoOrden.model';

export class OrdenBundleDTO {
  orden: OrdenesModel;
  productos: ProductoOrdenModel[];

}
