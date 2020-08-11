import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  publicaciones: Array<Publicacion> = new Array<Publicacion>();

  constructor(
    private ServicioPublicaciones: PublicacionesService
  ) { }

  ngOnInit(): void {

    this.ServicioPublicaciones.leerPosts().subscribe((publicaciones_recibidas)=>{
      this.publicaciones = publicaciones_recibidas;
      console.log(this.publicaciones);
    });

  }


}
