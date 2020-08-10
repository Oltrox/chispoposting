import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './shared/routing/app-routing.module';
import { AppComponent } from './app.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { LoginComponent } from './components/autenticacion/login/login.component';
import { PruebaComponent } from './components/inicio/prueba/prueba.component';

@NgModule({
  declarations: [
    AppComponent,
    AutenticacionComponent,
    LoginComponent,
    PruebaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
