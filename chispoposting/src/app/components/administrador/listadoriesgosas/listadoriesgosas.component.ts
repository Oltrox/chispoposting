import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { Publicacion } from 'src/app/shared/models/publicacion';

@Component({
  selector: 'app-listadoriesgosas',
  templateUrl: './listadoriesgosas.component.html',
  styleUrls: ['./listadoriesgosas.component.css']
})
export class ListadoriesgosasComponent implements OnInit {
  isLoaded: boolean = false;

  todasPubRiesgosas: Array<Publicacion> = new Array<Publicacion>();

  constructor(
    private ServicioPubllicaciones: PublicacionesService
  ) { 
    this.ServicioPubllicaciones.publicacionesRiesgosas().subscribe((res)=>{

      if(res.message == "publicaciones obtenidas" ){
        this.todasPubRiesgosas = res.data.publicacionesUsuarios as Array<Publicacion>;
      }else{

      }
      this.isLoaded = true;
      console.log("riesgosas",this.todasPubRiesgosas);
    });
  }

  ngOnInit(): void {
    
  }

  quitarRiesgo(publicacion:Publicacion, indice: number){
    this.ServicioPubllicaciones.quitarRiesgo(publicacion.c_publicacion).subscribe((res)=>{
      
      console.log("quitar riesgo",res);

      if(res.message == "desmarcada correctamente"){
        this.todasPubRiesgosas.splice(indice,1);
        alert("Se ha quitado el riesgo de la publicacion");
      }else{
        alert("Ha habido un problema en el backend");
      }

    });
  }

  eliminarPublicacionRiesgosa(publicacion:Publicacion, indice: number){
    console.log("eliminar publicacion riesgo",publicacion, indice)

    this.ServicioPubllicaciones.eliminarPublicacion(publicacion.c_publicacion).subscribe((res)=>{

      console.log(res);

      if(res.message == "Publicacion eliminada"){
        this.todasPubRiesgosas.splice(indice,1);
        alert("Se ha eliminado la publicacion correctamente");
      }else{
        alert("Ha habido un problema en el backend");
      }


    })

  }

}
