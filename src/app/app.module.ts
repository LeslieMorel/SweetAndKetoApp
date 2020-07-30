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
import { AttachFilesService } from './services/attach-files.service';
import { OrdenConfirmacionComponent } from './components/orden-confirmacion/orden-confirmacion.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SnackbarService } from './services/snackbar.service';
import { ProductosPendientesComponent } from './components/productos-pendientes/productos-pendientes.component';
import { ListaProductosPendientesComponent } from './components/lista-productos-pendientes/lista-productos-pendientes.component';
import { ProductoOrdenService } from './services/producto-orden.service';
import { ImagesComponent } from './components/images/images.component';
import { LocalStorageService } from './services/local-storage.service';
import { ProductoModule } from './ProductoModule/producto.module';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthService } from './services/auth.service';
import { DialogImagenesComponent } from './components/dialog-imagenes/dialog-imagenes.component';
import { HorarioEntregaPipePipe } from './customPipes/horario-entrega-pipe.pipe';
import { HorarioEntregaService } from './services/horario-entrega.service';


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
    ProductosOrdenComponent,
    OrdenConfirmacionComponent,
    SnackbarComponent,
    ProductosPendientesComponent,
    ListaProductosPendientesComponent,
    ImagesComponent,
    LoginComponent,
    RegisterComponent,
    DialogImagenesComponent,
    HorarioEntregaPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ProductoModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    OrdenesService,
    CarritoService,
    ProductosService,
    AttachFilesService,
    SnackbarService,
    ProductoOrdenService,
    LocalStorageService,
    AuthService,
    HorarioEntregaService
  ],
  entryComponents: [
    SnackbarComponent,
    DialogImagenesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
