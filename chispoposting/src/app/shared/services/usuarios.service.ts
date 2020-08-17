import { Injectable } from '@angular/core';

import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // llega
  modificarUsuarioPass(modificacion: any, id_usuario: string): Observable<any>{
    return this.http.put<any>(`${this.ruta}/usuario/${id_usuario}`, modificacion);
  }

  modificarUsuarioTopico(modificacion: any, id_usuario: string): Observable<any>{
    return this.http.put<any>(`${this.ruta}/usuario/${id_usuario}`, modificacion);
  }

  // llega
  verUsuario(usuario: Usuario): Observable<any>{
    return this.http.get<any>(`${this.ruta}/usuario/${usuario.id}`, {headers:{'usuario_token':localStorage.getItem("token")}});
  }

  // llega
  login(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(`${this.ruta}/usuario/login`, usuario);
  }

  crearSesion(usuario:string, token:string){
    localStorage.setItem("usuario",usuario);
    localStorage.setItem("token",token);
  }

  cerrarSesion(){
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

  }
  

}
