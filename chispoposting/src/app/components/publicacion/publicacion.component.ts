import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { Comentario } from 'src/app/shared/models/comentario';
import { ComentariosService } from 'src/app/shared/services/comentarios.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  publicacion: Publicacion = new Publicacion();
  comentarios: Array<Comentario> = new Array<Comentario>();
  
  isLogged: boolean = false;
  isSameUser: boolean = false;
  isYoutube: boolean = false; //hacer que funque en publicacion sola


  constructor(
    private ServicioPublicacion: PublicacionesService,
    private ServicioComentarios: ComentariosService,
    private ServicioUsuarios: UsuariosService,
    private rutaActual: ActivatedRoute 
  ) { 

    this.estaLogueado();

    var id = JSON.parse(this.rutaActual.snapshot.params.id);
    // var id_usuario = JSON.parse(this.rutaActual.snapshot.params.id);

    this.ServicioPublicacion.leerPublicacion(id).subscribe((res)=>{
      
      console.log(res);
      this.publicacion = res.data as Publicacion;
      this.publicacion.usuario = res.usuario[0] as Usuario;

      console.log(this.isYoutube);
      console.log(this.publicacion.link);
      if(this.publicacion.link.includes("www.youtube.com")){
        this.isYoutube = true;
        console.log(this.isYoutube);
      }
      

      console.log(localStorage.getItem("usuario"));
      if(localStorage.getItem("usuario") == this.publicacion.usuario.id){
        this.isSameUser = true;
      }
    });

    if(this.isLogged){
      this.ServicioComentarios.leerComentariosPublicacion(id).subscribe((res)=>{
        console.log(res);
        this.comentarios = res.data as Array<Comentario>;
        this.comentarios = this.comentarios.reverse();
      })
  
      this.ServicioUsuarios.verUsuario({ id:localStorage.getItem("usuario") } as Usuario).subscribe((res)=>{
        this.ServicioUsuarios.usuarioActivo = res.data as Usuario;
      });
    }


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
