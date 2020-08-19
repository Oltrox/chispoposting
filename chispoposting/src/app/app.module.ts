import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './shared/routing/app-routing.module';

import { AppComponent } from './app.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { LoginComponent } from './components/autenticacion/login/login.component';
import { RegistroComponent } from './components/autenticacion/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PerfilComponent } from './components/inicio/perfil/perfil.component';
import { NotificacionesComponent } from './components/inicio/notificaciones/notificaciones.component';
import { CarruselComponent } from './components/inicio/carrusel/carrusel.component';
import { PublicacionComponent } from './components/publicacion/publicacion.component';
import { PublicacionComentarioComponent } from './components/publicacion/publicacion-comentario/publicacion-comentario.component';
import { PublicacionDetalleComponent } from './components/publicacion/publicacion-detalle/publicacion-detalle.component';
import { ModificarPerfilComponent } from './components/inicio/perfil/modificar-perfil/modificar-perfil.component';
import { BusquedaComponent } from './components/inicio/busqueda/busqueda.component';
import { AgregarPublicacionComponent } from './components/publicacion/agregar-publicacion/agregar-publicacion.component';
import { ModificarPublicacionComponent } from './components/publicacion/modificar-publicacion/modificar-publicacion.component';
import { NavegacionModeradorComponent } from './components/navegacion-moderador/navegacion-moderador.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { ListadousuariosComponent } from './components/administrador/listadousuarios/listadousuarios.component';
import { ListadopublicacionesComponent } from './components/administrador/listadopublicaciones/listadopublicaciones.component';
import { ListadoriesgosasComponent } from './components/administrador/listadoriesgosas/listadoriesgosas.component';

import { PublicacionesService } from './shared/services/publicaciones.service';
import { UsuariosService } from './shared/services/usuarios.service';
import { ComentariosService } from './shared/services/comentarios.service';
import { EvaluacionService } from './shared/services/evaluacion.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AutenticacionComponent,
    LoginComponent,
    RegistroComponent,
    PublicacionDetalleComponent,
    InicioComponent,
    NavegacionComponent,
    PerfilComponent,
    NotificacionesComponent,
    CarruselComponent,
    PublicacionComponent,
    PublicacionComentarioComponent,
    ModificarPerfilComponent,
    AgregarPublicacionComponent,
    ModificarPublicacionComponent,
    NavegacionModeradorComponent,
    BusquedaComponent,
    AdministradorComponent,
    ListadousuariosComponent,
    ListadopublicacionesComponent,
    ListadoriesgosasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    PublicacionesService,
    UsuariosService,
    ComentariosService,
    EvaluacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
