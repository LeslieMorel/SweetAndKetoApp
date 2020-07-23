import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoModel } from 'src/app/models/producto.model';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: ProductoModel[];
  constructor(private productosService: ProductosService, public cartService: CarritoService) { }

  ngOnInit(): void {
    this.GetProductos();
  }

  GetProductos(){
    this.productosService.GeProductos().subscribe((Response: ProductoModel[])=>{
      console.log(Response);
      this.productos = Response;
    });
  }



}
