import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { Comentario } from 'src/app/shared/models/comentario';
import { ComentariosService } from 'src/app/shared/services/comentarios.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  publicacion: Publicacion = new Publicacion();
  comentarios: Array<Comentario> = new Array<Comentario>();
  
  isLogged: boolean = false;

  constructor(
    private ServicioPublicacion: PublicacionesService,
    private ServicioComentarios: ComentariosService,
    private rutaActual: ActivatedRoute 
  ) { 


    var id = JSON.parse(this.rutaActual.snapshot.params.id);
    // var id_usuario = JSON.parse(this.rutaActual.snapshot.params.id);

    this.ServicioPublicacion.leerPublicacion(id).subscribe((res)=>{
      this.publicacion = res.data as Publicacion;
    });

    this.ServicioComentarios.leerComentariosPublicacion(id).subscribe((res)=>{
      this.comentarios = res.data as Array<Comentario>;
    })

  }

  ngOnInit(): void {


    this.estaLogueado();


  }
  
  estaLogueado(){
    if (localStorage.getItem("usuario")){
      this.isLogged = true;
    }
  }
}
