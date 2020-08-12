import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  publicacionesUsuario: Array<Publicacion> = new Array<Publicacion>();
  usuario: Usuario = new Usuario();
  paramRuta: string;

  isForeign = true;
  isUser = false;

  sub;

  constructor(
    private formBuilder: FormBuilder,
    public ServicioUsuario: UsuariosService,
    private ServicioPublicaciones: PublicacionesService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) { 

    this.sub = this.rutaActiva.paramMap.subscribe(params => { 

      this.isForeign = true;
      this.isUser = false;
      
      this.paramRuta = params.get('id'); 
      
      if (!this.paramRuta){
        this.router.navigate["inicio"];
      }
      
      this.esForaneo();

      if (this.isForeign){
        console.log("21");

        this.ServicioPublicaciones.leerPublicacionesUsuarioForaneo(this.paramRuta).subscribe((res)=>{
          this.publicacionesUsuario = res.data as Array<Publicacion>;
        });

        this.ServicioUsuario.verUsuario({id:this.paramRuta} as Usuario).subscribe((res)=>{
          
          // console.log(res,this.paramRuta);

          if(res.message != "Usuario no encontrado"){
            this.isUser = true;
            this.usuario = res.data as Usuario;
          }

        });

      }else{
        console.log("22");
        this.ServicioPublicaciones.leerPublicacionesUsuarioPropio(localStorage.getItem("usuario")).subscribe((res)=>{
          this.publicacionesUsuario = res.data as Array<Publicacion>;
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



}
