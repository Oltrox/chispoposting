import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  
  ruta: string = "http://localhost:4000"

  constructor( private http: HttpClient ) { }

  imprimiralgo() {
    console.log('servicio works');
  }

  obtenerUsuarios() : Observable<any> {
    return this.http.get<any>(`${this.ruta}/users`);
  }

  login(usuario: Usuario) : Observable<any> {
    console.log(usuario);
    return this.http.post<any>(`${this.ruta}/login`, usuario);
  }


  crearSesion(usuario:string){
    localStorage.setItem("usuario",usuario);
  }

  cerrarSesion(){
    localStorage.removeItem("usuario");
  }
  

}
