import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoModel } from 'src/app/models/producto.model';
import { CarritoService } from 'src/app/services/carrito.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  loading = false;
  productos: ProductoModel[];
  constructor(private productosService: ProductosService,
              public cartService: CarritoService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetProductos();
    this.activeRoute.url.subscribe((resp) => {
      console.log('path');
      console.log(resp);
    });
  }

  GetProductos(){
    this.loading = true;
    this.productosService.GeProductos().subscribe((Response: ProductoModel[])=>{
      console.log(Response);
      this.loading = false;
      this.productos = Response;
    }, e => {
        this.loading = false;
    });
  }



}
