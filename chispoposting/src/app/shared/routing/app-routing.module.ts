import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacionComponent } from '../../components/autenticacion/autenticacion.component';
import { InicioComponent } from '../../components/inicio/inicio.component';
import { PerfilComponent } from '../../components/inicio/perfil/perfil.component';

import { AutenticacionGuard } from '../guard/autenticacion.guard';
import { NotificacionesComponent } from 'src/app/components/inicio/notificaciones/notificaciones.component';
import { CarruselComponent } from 'src/app/components/inicio/carrusel/carrusel.component';
import { PublicacionComponent } from 'src/app/components/publicacion/publicacion.component';
import { ModificarPerfilComponent } from 'src/app/components/inicio/perfil/modificar-perfil/modificar-perfil.component';
import { AgregarPublicacionComponent } from 'src/app/components/publicacion/agregar-publicacion/agregar-publicacion.component';
import { ModificarPublicacionComponent } from 'src/app/components/publicacion/modificar-publicacion/modificar-publicacion.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'auth', pathMatch: 'full'
  },
  {
    path: 'auth', component: AutenticacionComponent
  },
  {
    path: 'inicio', component: InicioComponent, canActivate: [AutenticacionGuard], children: [
      { path:'', redirectTo: 'publicaciones', pathMatch: 'full' },
      { path: 'perfil/:id', component: PerfilComponent },
      { path: 'modificarperfil', component: ModificarPerfilComponent },
      { path: 'publicaciones', component: CarruselComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: 'publicar', component: AgregarPublicacionComponent },
      { path: 'modificar/publicacion', component: ModificarPublicacionComponent }
    ]
  },
  {
    path:'publicacion/:id', component: PublicacionComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
