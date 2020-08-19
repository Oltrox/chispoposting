import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';

@Component({
  selector: 'app-listadopublicaciones',
  templateUrl: './listadopublicaciones.component.html',
  styleUrls: ['./listadopublicaciones.component.css']
})
export class ListadopublicacionesComponent implements OnInit {

  isLoaded: boolean = false;

  todasPublicaciones: Array<Publicacion> = new Array<Publicacion>(); 

  constructor(
    private ServicioPublicaciones: PublicacionesService
  ) { 

    // Verificar que sucede si no hay
    this.ServicioPublicaciones.publicacionesAdmin().subscribe((res)=>{
      // this.todasPublicaciones = res.

      if(res.message == "publicaciones obtenidas"){
        this.todasPublicaciones = res.data.publicacionesUsuarios as Array<Publicacion>;
      }else{

      }

      this.isLoaded = true;
      console.log(this.todasPublicaciones);
    })

  }

  ngOnInit(): void {
    
  }

  eliminarPublicacion(publicacion:Publicacion, indice: number){
    console.log("eliminar publicacion",publicacion, indice)

    this.ServicioPublicaciones.eliminarPublicacion(publicacion.c_publicacion).subscribe((res)=>{

      console.log(res);

      if(res.message == "Publicacion eliminada"){
        this.todasPublicaciones.splice(indice,1);
        alert("Se ha eliminado la publicacion correctamente");
      }else{
        alert("Ha habido un problema en el backend");
      }


    })

  }


}


// •	ID
// •	Estado de riesgo de la publicación
// •	Título
// •	Tópico
// •	Perfil que publica
// •	Fecha
// •	Enlace de acceso
// •	Cantidad de visualizaciones
// •	Cantidad de “Me gusta”
// •	Cantidad de “No me gusta”
// •	Cantidad de comentarios.
