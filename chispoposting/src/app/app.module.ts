import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './shared/routing/app-routing.module';

import { AppComponent } from './app.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { LoginComponent } from './components/autenticacion/login/login.component';
import { RegistroComponent } from './components/autenticacion/registro/registro.component';
import { PublicacionDetalleComponent } from './components/inicio/publicacion-detalle/publicacion-detalle.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';

import { AutenticacionService } from './shared/services/autenticacion.service';
import { PublicacionesService } from './shared/services/publicaciones.service';

@NgModule({
  declarations: [
    AppComponent,
    AutenticacionComponent,
    LoginComponent,
    RegistroComponent,
    PublicacionDetalleComponent,
    InicioComponent,
    NavegacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AutenticacionService,
    PublicacionesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
