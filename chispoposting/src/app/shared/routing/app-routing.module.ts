import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacionComponent } from '../../components/autenticacion/autenticacion.component';
import { InicioComponent } from '../../components/inicio/inicio.component';
import { PerfilComponent } from '../../components/inicio/perfil/perfil.component';
import { PublicacionDetalleComponent } from '../../components/publicacion/publicacion-detalle/publicacion-detalle.component';

import { AutenticacionGuard } from '../guard/autenticacion.guard';
import { NotificacionesComponent } from 'src/app/components/inicio/notificaciones/notificaciones.component';
import { CarruselComponent } from 'src/app/components/inicio/carrusel/carrusel.component';
import { PublicacionComponent } from 'src/app/components/publicacion/publicacion.component';

const routes: Routes = [
  {
    path: 'auth', component: AutenticacionComponent
  },
  {
    path: 'inicio', component: InicioComponent, canActivate: [AutenticacionGuard], children: [
      { path:'', redirectTo: 'publicaciones', pathMatch: 'full' },
      { path: 'perfil/:id', component: PerfilComponent },
      { path: 'publicaciones', component: CarruselComponent },
      { path: 'notificaciones', component: NotificacionesComponent }
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
