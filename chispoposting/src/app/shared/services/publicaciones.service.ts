import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Publicacion } from '../models/publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  ruta: string = "http://localhost:4000"

  constructor( private http: HttpClient ) { }


  leerPosts(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.ruta}/post`);
  }

}
