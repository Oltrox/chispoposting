import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Publicacion } from '../models/publicacion';
@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  publicaciones: Array<Publicacion> = new Array<Publicacion>();
  publicacionModificar: Publicacion = new Publicacion();
  publicacionActual: Publicacion = new Publicacion();
  
  
  ruta: string = "http://localhost:4000/api/publicacion"



  constructor( private http: HttpClient ) { }
 

  leerPosts(): Observable<any> {
    return this.http.get<any>(`${this.ruta}/`);
  }

  leerPublicacion(id: number): Observable<any> {
    return this.http.get<any>(`${this.ruta}/${id}`);
  }

  leerPublicacionesUsuarioForaneo(id: string): Observable<any> {
    return this.http.get<any>(`${this.ruta}/usuario/${id}`);
  }

  leerPublicacionesUsuarioPropio(id: string): Observable<any> {
    return this.http.get<any>(`${this.ruta}/propias/${id}`);
  }

  publicar(publicacion: Publicacion): Observable<any>{
    return this.http.post<any>(`${this.ruta}/`,publicacion);
  }

  modificarPublicacion(modificacion: Publicacion): Observable<any>{
    return this.http.put<any>(`${this.ruta}/${modificacion.c_publicacion}`, modificacion);
  }

  marcarPublicacion(c_publicacion: number): Observable<any>{
    return this.http.delete<any>(`${this.ruta}/invisible/${c_publicacion}`);
  }

  publicacionesAdmin():Observable<any>{
    return this.http.get<any>(`${this.ruta}/usuarioAdmin/`);
  }

  publicacionesRiesgosas():Observable<any>{
    return this.http.get<any>(`${this.ruta}/riesgosas/`);
  }


  quitarRiesgo(c_publicacion:number):Observable<any> {
    return this.http.put<any>(`${this.ruta}/visible/${c_publicacion}`,{});
  }

  eliminarPublicacion(c_publicacion:number):Observable<any>{
    return this.http.delete<any>(`${this.ruta}/delete/${c_publicacion}`);
  }

}
