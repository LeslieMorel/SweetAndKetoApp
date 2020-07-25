import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { OrdenesService } from './services/ordenes.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoCardComponent } from './components/producto-card/producto-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarritoService } from './services/carrito.service';
import { CartComponent } from './components/cart/cart.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { OrdenFormComponent } from './components/orden-form/orden-form.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EstadoOrdenPipePipe } from './customPipes/estado-orden-pipe.pipe';
import { ListaOrdenesComponent } from './components/lista-ordenes/lista-ordenes.component';
import { ProductosService } from './services/productos.service';
import { EditarOrdenComponent } from './components/editar-orden/editar-orden.component';
import { ProductosOrdenComponent } from './components/productos-orden/productos-orden.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdenesComponent,
    NavigationComponent,
    ProductosComponent,
    ProductoCardComponent,
    CartComponent,
    CartProductComponent,
    OrdenFormComponent,
    CheckoutComponent,
    EstadoOrdenPipePipe,
    ListaOrdenesComponent,
    EditarOrdenComponent,
    ProductosOrdenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    OrdenesService,
    CarritoService,
    ProductosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
