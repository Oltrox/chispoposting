import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacionComponent } from '../../components/autenticacion/autenticacion.component';
import { InicioComponent } from '../../components/inicio/inicio.component';

import { AutenticacionGuard } from '../guard/autenticacion.guard';

const routes: Routes = [
  {
    path: 'auth', component: AutenticacionComponent
  },
  {
    path: 'inicio', component: InicioComponent, canActivate: [AutenticacionGuard]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
