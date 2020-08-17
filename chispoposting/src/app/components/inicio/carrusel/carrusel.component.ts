import { Component, OnInit, Input } from '@angular/core';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { Publicacion } from 'src/app/shared/models/publicacion';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {


  @Input() isLoadedUsuario: Boolean = new Boolean();
  isLoadadedPublicaciones = false;

  publicaciones: Array<Publicacion> = new Array<Publicacion>(); 
  publicacionActual: Publicacion = new Publicacion();

  pos = 0;

  sub;

  constructor(
    public ServicioPublicaciones: PublicacionesService
  ) { 
    console.log("ENTRADA LOADED USUAIRO", this.isLoadedUsuario);
    this.sub = this.ServicioPublicaciones.leerPosts().subscribe((publicaciones_recibidas)=>{
      this.ServicioPublicaciones.publicaciones = publicaciones_recibidas.data as Array<Publicacion>;

      this.publicaciones =  publicaciones_recibidas.data as Array<Publicacion>;
      console.log(this.publicaciones);
      this.publicacionActual = this.publicaciones[this.pos];

      this.isLoadadedPublicaciones = true;
    });

    // this.publicacionActual = this.ServicioPublicaciones.publicaciones[this.pos];

  }

  ngOnInit(): void {

  }

  prev(): void {

    if(this.pos > 0){
      this.pos -=1;
    }else{
      this.pos = this.publicaciones.length;
    }
    
    this.publicacionActual = this.publicaciones[this.pos];

  }

  sig(): void {
    this.pos += 1;
    this.pos =  this.pos % this.publicaciones.length;
    this.publicacionActual = this.publicaciones[this.pos];

  }
  

}
