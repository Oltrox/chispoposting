import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacionComponent } from '../../components/autenticacion/autenticacion.component';
import { PruebaComponent } from 'src/app/components/inicio/prueba/prueba.component';

const routes: Routes = [
  {
    path: 'auth', component: AutenticacionComponent
  },
  {
    path: 'test', component: PruebaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
