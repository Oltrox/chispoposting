import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input() isLoadedUsuario: Boolean = new Boolean();

  tipo:string = "perfil";

  isLoadedPublicaciones = false;
  isLoadedUsuarioForaneo = false;
  isLoadedEstado = false;

  isForeign = true;
  isUser = false;

  publicacionesUsuario: Array<Publicacion> = new Array<Publicacion>();
  usuario: Usuario = new Usuario();
  paramRuta: string;

  seguidoState: string = "CARGANDO ESTADO";
  seguidoStateBoolean: boolean = false;

  miniaturas: Array<number> = new Array<number>();

  sub;

  constructor(
    public ServicioUsuario: UsuariosService,
    private ServicioPublicaciones: PublicacionesService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) { 
    console.log("reconstructed perfil");

    this.sub = this.rutaActiva.paramMap.subscribe(params => { 

      this.isForeign = true; // Usuario foraneo
      this.isUser = false; // Usuario encontrado
      this.isLoadedPublicaciones = false; // Publicaciones cargadas
      this.isLoadedUsuarioForaneo = false; // Usuario foraneo cargado
      
      this.paramRuta = params.get('id'); 
      
      if (!this.paramRuta){
        this.router.navigate["inicio"];
      }
      
      this.esForaneo();

      if (this.isForeign){
        console.log("21");

        console.log("wea");
        this.ServicioPublicaciones.leerPublicacionesUsuarioForaneo(this.paramRuta).subscribe((res)=>{
          this.publicacionesUsuario = res.data[0] as Array<Publicacion>;
          console.log("sadasdas",this.publicacionesUsuario);


          for (let entry of this.publicacionesUsuario) {
            if(entry.link.includes("www.youtube.com")){
              this.miniaturas.push(1);
            }
            else if(entry.link.includes(".jpg") || entry.link.includes(".png") || entry.link.includes(".gif")){
              this.miniaturas.push(2);
            }
            else{
              this.miniaturas.push(0);
            }
          }

          this.isLoadedPublicaciones = true;
          

        });

        this.ServicioUsuario.verUsuario({id:this.paramRuta} as Usuario).subscribe((res)=>{
          
          if(res.message != "Usuario no encontrado"){
            this.isUser = true;
            this.usuario = res.data as Usuario;            
          }

          this.ServicioUsuario.getSeguimientoPerfil({id_1: localStorage.getItem("usuario"), id_2: this.usuario.id }).subscribe((res)=>{
              console.log("seguimiento",res);

              this.isLoadedEstado = true;

              if(res.message == "No siguiendo"){
                
                this.seguidoState = "SEGUIR AL USUARIO";
                this.seguidoStateBoolean = false;

              }else if (res.message == "Siguiendo" ){

                this.seguidoState = "DEJAR DE SEGUIR";
                this.seguidoStateBoolean = true;

              }

          });
          
          this.isLoadedUsuarioForaneo = true;

        });



      }else{
        console.log("22");
        this.ServicioPublicaciones.leerPublicacionesUsuarioPropio(localStorage.getItem("usuario")).subscribe((res)=>{
          this.publicacionesUsuario = res.data as Array<Publicacion>;
          for (let entry of this.publicacionesUsuario) {
            if(entry.link.includes("www.youtube.com")){
              this.miniaturas.push(1);
            }
            else if(entry.link.includes(".jpg") || entry.link.includes(".png") || entry.link.includes(".gif")){
              this.miniaturas.push(2);
            }
            else{
              this.miniaturas.push(0);
            }
          }
          this.isLoadedPublicaciones = true;
        });
      }

    });

  }

  ngOnInit(): void {
  }

  esForaneo(){
    if (localStorage.getItem("usuario") == this.paramRuta){
      this.isForeign = false;
    }
    console.log("1");
  }

  irPublicacion(id:number){
    this.router.navigate([`publicacion/${id}`]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  cambiarSeguir(){
    if (this.isLoadedEstado){
      
      this.isLoadedEstado = false;
      this.seguidoState = "CARGANDO ESTADO";

      let json = {
        id_1: localStorage.getItem("usuario"),
        id_2: this.usuario.id 
      }

      if (this.seguidoStateBoolean){

        this.ServicioUsuario.dejarSeguirPerfil(json).subscribe((res)=>{
          console.log("dejarseguir",res);

          if (res.message == "Seguir eliminado"){
            
            this.seguidoState = "SEGUIR AL USUARIO";
            this.seguidoStateBoolean = false;
          }else{
            alert("Ha habido un problema con el backend");
          }

          this.isLoadedEstado = true;

        });

      }else{
        
        this.ServicioUsuario.seguirPerfil(json).subscribe((res)=>{
          console.log("seguir",res);

          if (res.message == "Seguir creado"){
            this.seguidoState = "DEJAR DE SEGUIR";
            this.seguidoStateBoolean = true;
          }else{
            alert("Ha habido un problema con el backend");
          }

          this.isLoadedEstado = true;

        });

      }

    }
  }


}
