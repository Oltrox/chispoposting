import { Injectable } from '@angular/core';

import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuarioActivo: Usuario = new Usuario();
  ruta: string = "http://localhost:4000/api"

  constructor(
    private http: HttpClient
  ) { }

  // llega
  crearUsuario(usuario: Usuario): Observable<any>{
    return this.http.post<any>(`${this.ruta}/usuario`, usuario);
  }

  modificarUsuario(usuario: Usuario){
    return this.http.put<any>(`${this.ruta}/modifyuser/${usuario.id}`, usuario);
  }

  eliminarUsuario(usuario: Usuario){
    return this.http.delete<any>(`${this.ruta}/deleteuser/${usuario.id}`);
  }

  // llega
  verUsuario(usuario: Usuario): Observable<any>{
    return this.http.get<any>(`${this.ruta}/usuario/${usuario.id}`);
  }

  // llega
  login(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(`${this.ruta}/usuario/login`, usuario);
  }

  crearSesion(usuario:string){
    localStorage.setItem("usuario",usuario);
  }

  cerrarSesion(){
    localStorage.removeItem("usuario");
  }
  

}
