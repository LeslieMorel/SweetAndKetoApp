import { Component, OnInit } from '@angular/core';
import { SalesbiService } from '../../services/salesbi.service';
import { ProductoOrdenBi, ProductoBi } from '../../models/ProductoOrdenBi.model';

@Component({
  selector: 'app-product-bi',
  templateUrl: './product-bi.component.html',
  styleUrls: ['./product-bi.component.scss']
})
export class ProductBiComponent implements OnInit {

  meses: number[] = [];
  mesSelected: number;
  semanas: number[] = [];
  semanaSelected: number;
  productos: ProductoOrdenBi[] = [];
  productosBi: ProductoBi[] = [];
  TotalVenta = 0;
  constructor(private salesBiServ: SalesbiService) { }

  ngOnInit(): void {

    this.GetProductoOrdenBi();

  }

  GetProductoOrdenBi() {
    console.log('Get ProductoBi');

    this.salesBiServ.GetProductosOrdenBi().subscribe((Response: ProductoOrdenBi[]) => {
      console.log(Response);
      this.productos = Response;
      this.SetFilters(this.productos);
      this.SetProductosBi();

    });
  }

  SetFilters(productos: ProductoOrdenBi[]) {
    this.meses = productos.map(p => p.mes).filter(this.onlyUnique);
    this.semanas = productos.map(p => p.semana).filter(this.onlyUnique);
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  FilterProductosBi(productos: ProductoOrdenBi[]): ProductoOrdenBi[]{
    if (this.mesSelected){
      productos = productos.filter(p=> p.mes === this.mesSelected)
    }
    if (this.semanaSelected){
      productos = productos.filter(p=> p.semana === this.semanaSelected)
    }
    return productos;
  }
  SetProductosBi(){
    let productos = this.productos.slice();
    productos =  this.FilterProductosBi(productos);
      const productosUnique = productos.map(p=>p.producto).filter(this.onlyUnique);
    let productosBi: ProductoBi[] = [];
      productosUnique.forEach(prodUnique => {
          // productos[]
          var productosOrdenBi = productos.filter(p=>p.producto === prodUnique);
          // producto.First
          var productoOrdenBi = productos.filter(p=>p.producto === prodUnique)[0];

          let productoBi: ProductoBi = {
            producto: prodUnique ,
            descripcion: productoOrdenBi.descripcion,
            imgUrl: productoOrdenBi.imgUrl,
            cantidad: productosOrdenBi.map(p=>p.cantidad).reduce((p,c)=> p + c),
            subtotal: productosOrdenBi.map(p=>p.subtotal).reduce((p,c)=> p + c)
          };
          productosBi.push(productoBi);
      });

      return productosBi;


  }

  CalcularTotal(){
    if (this.productos.length === 0 )
    return 0;
    let productos = this.FilterProductosBi(this.productos);
    return productos.map(p=>p.subtotal).reduce((a,b)=> a + b)
  }
  CalcularTotalUnidades(){
    if (this.productos.length === 0 )
    return 0;
    let productos = this.FilterProductosBi(this.productos);
    return productos.map(p=>p.cantidad).reduce((a,b)=> a + b)
  }

  ClearFilters(){
    this.mesSelected = undefined;
    this.semanaSelected = undefined;
  }






}
