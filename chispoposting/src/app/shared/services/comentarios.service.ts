import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  ruta: string = "http://localhost:4000/api/comentario"

  constructor( private http: HttpClient ) { }

  leerComentariosPublicacion(c_publicacion: number): Observable<any>{
    return this.http.get<any>(`${this.ruta}/publicacion/${c_publicacion}`);
  }

  

}
