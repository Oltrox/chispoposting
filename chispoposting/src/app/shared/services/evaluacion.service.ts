import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  ruta: string = "http://localhost:4000/api/evaluacion";

  constructor( private http: HttpClient ) { }

  evaluar(evaluacion:any): Observable<any>{
    return this.http.post<any>(`${this.ruta}/`,evaluacion);
  }

  getEvaluacion(publicacionUsuario: any): Observable<any>{
    return this.http.post<any>(`${this.ruta}/usuario/`, publicacionUsuario);
  }


}
