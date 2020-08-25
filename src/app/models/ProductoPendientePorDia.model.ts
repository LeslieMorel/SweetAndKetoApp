import { ProductoPorDia } from './ProductoPorDia.model';

export class ProductoPendientePorDia {
  productoId: number;
  descripcion: string;
  imgUrl: string;
  cantidadTotal: number;
  productosPorDias: ProductoPorDia[];
}
