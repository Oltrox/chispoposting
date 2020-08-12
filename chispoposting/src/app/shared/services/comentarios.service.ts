import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  ruta: string = "http://localhost:4000/api/comentario"

  constructor( private http: HttpClient ) { }

  leerComentariosPublicacion(c_publicacion: number): Observable<any>{
    return this.http.get<any>(`${this.ruta}/publicacion/${c_publicacion}`);
  }

  crearComentario(comentario: Comentario): Observable<any>{
    return this.http.post<any>(`${this.ruta}/`,comentario);
  }

  eliminarComentario(comentario: number): Observable<any>{
    return this.http.delete<any>(`${this.ruta}/${comentario}`)
  }

  

}
