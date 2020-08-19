import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { Comentario } from 'src/app/shared/models/comentario';
import { ComentariosService } from 'src/app/shared/services/comentarios.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  tipo:string = "publicacion";

  publicacion: Publicacion = new Publicacion();
  comentarios: Array<Comentario> = new Array<Comentario>();
  
  isLoadadedPublicaciones = false;
  isLogged: boolean = false;
  isSameUser: boolean = false;
  isYoutube: boolean = false; //hacer que funque en publicacion sola
  ytUrl: any = "";

  isImg: boolean = false;
  imgUrl: any = "";


  constructor(
    private ServicioPublicacion: PublicacionesService,
    private ServicioComentarios: ComentariosService,
    public ServicioUsuarios: UsuariosService,
    private rutaActual: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { 

    this.estaLogueado();

    var id = JSON.parse(this.rutaActual.snapshot.params.id);
    // var id_usuario = JSON.parse(this.rutaActual.snapshot.params.id);

    this.ServicioPublicacion.leerPublicacion(id).subscribe((res)=>{
      
      console.log(res);
      this.publicacion = res.data as Publicacion;
      this.publicacion.usuario = res.usuario as Usuario;


      if (res.message == "Publicacion invisible"){
        this.router.navigate(["/inicio/publicaciones"]);
      }


      console.log(this.isYoutube);
      console.log(this.publicacion.link);
      console.log(this.publicacion.usuario);

      if(this.publicacion.link.includes("www.youtube.com")){
        this.ytUrl = "https://www.youtube.com/embed/" + this.publicacion.link.replace('https://www.youtube.com/watch?v=','');
        this.ytUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.ytUrl);
        this.isYoutube = true;
        
        console.log(this.isYoutube);
        console.log(this.ytUrl);
        
      }

      if( this.publicacion.link.includes(".jpg") || this.publicacion.link.includes(".png") || this.publicacion.link.includes(".gif")  ){
        this.imgUrl = this.publicacion.link;
        this.imgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imgUrl);
        this.isImg = true;
      }
      

      console.log(localStorage.getItem("usuario"));
      if(localStorage.getItem("usuario") == this.publicacion.usuario.id){
        this.isSameUser = true;
      }

      this.isLoadadedPublicaciones = true;

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
