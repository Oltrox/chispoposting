import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { Router } from '@angular/router';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';


@Component({
  selector: 'app-navegacion-moderador',
  templateUrl: './navegacion-moderador.component.html',
  styleUrls: ['./navegacion-moderador.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class NavegacionModeradorComponent implements OnInit {

  @Input() publicacionActual: Publicacion = new Publicacion();
  @Input() tipo: string = "ninguna";
  @Input() usuario: Usuario = new Usuario();

  public navbar2Collapsed = true;

  lockMembresiaCastigo = false;
  lockMembresiaEliminacion = false;
  lockModeracion = false;

  tiempo:number = 0;
  
  constructor(
    private ServicioPublicaciones: PublicacionesService,
    private ServicioUsuarios: UsuariosService,
    private router:Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  ver(){
    console.log(this.publicacionActual);
  }

  marcarPublicacionRiesgosa(){
    this.ServicioPublicaciones.marcarPublicacion(this.publicacionActual.c_publicacion).subscribe((res)=>{

      if(res.message == "marcada correctamente"){
        alert("Publicacion marcada correctamente");
        this.router.navigate(["/"]);
      }else{
        alert("No se ha podido marcar la publicacion");
      }

    });
  }

  openAsignarCastigo(content:any) {
    this.modalService.open(content);
  }

  asignarCastigo(){
    if(typeof(this.tiempo) != 'number'){
      alert("Verifica el numero ingresado");
    }else{

      if(this.tiempo <= 0){
        alert("El tiempo debe ser mayor a 0");
        return;
      }

      let json = {
        c_usuario: this.usuario.c_usuario,
        tiempo: this.tiempo
      }

      this.ServicioUsuarios.castigarUsuario(json).subscribe((res)=>{
          
        if(res.message == "Usuario castigado"){
          alert("EL usuario ha sido castigado correctamente");
          this.tiempo = 0;
        }else if (res.message == "Usuario ya castigado"){
          alert("El usuario esta castigado, no se puede volver a castigar");
          this.tiempo = 0;
        }else if (res.message == "Usuario a evitado castigo"){
          alert("El usuario ha evitado un castigo por que contaba con una membresia");
          this.tiempo = 0;
        }else{
          alert("Ha habido un error con el backend");
        }
        this.modalService.dismissAll();

      });

      
    }
  }

  asignarMembresiaCastigo(){

    if(!this.lockMembresiaCastigo){
      this.lockMembresiaCastigo = true;

      this.ServicioUsuarios.asignarMembresiaCastigo({ c_usuario: this.usuario.c_usuario }).subscribe((res)=>{
          console.log("asignarmembresiacastigo",res);

          if(res.message == "Membresia asignada" ){
            alert("Se ha otorgado la membresia de castigo correctamente");
          }else if (res.message == "Ya tiene membresia"){
            alert("Este usuario ya tiene asignada una membresia de castigo");
          }else if (res.message == "Ya tuvo membresia"){
            alert("El usuario ya se le fue asignada una membresia de castigo, y ya la usó");
          }else{
            alert("Ha habido un problema con el backend");
          }

          this.lockMembresiaCastigo = false;
      });
    }
      
  }

  asignarMembresiaEliminacion(){

    if(!this.lockMembresiaEliminacion){
      this.lockMembresiaEliminacion = true;

      this.ServicioUsuarios.asignarMembresiaEliminacion({ c_usuario: this.usuario.c_usuario }).subscribe((res)=>{
          console.log("asignarmembresiacastigo",res);

          if(res.message == "Membresia asignada" ){
            alert("Se ha otorgado la membresia de eliminacion correctamente");
          }else if (res.message == "Ya tiene membresia"){
            alert("Este usuario ya tiene asignada una membresia de eliminacion");
          }else if (res.message == "Ya tuvo membresia"){
            alert("El usuario ya se le fue asignada una membresia de eliminacion, y ya la usó");
          }else{
            alert("Ha habido un problema con el backend");
          }

          this.lockMembresiaEliminacion = false;
      });
    }
      
  }

  asignarModeracion(){
    if(!this.lockModeracion){
      this.lockModeracion = true;

      this.ServicioUsuarios.asignarModerador({ c_usuario: this.usuario.c_usuario }).subscribe((res)=>{
        console.log("asignarmoderacion",res);
        if(res.message == "Convertido en moderador"){
          alert("El usuario ahora es moderador");
          this.usuario.tipo = 1;
        }else if (res.message == "Ya es moderador"){
          alert("El usuario ya es moderador");
        }else{
          alert("Ha ocurrido un problema con el backend");
        }

        this.lockModeracion = false;

      });

    }
  }

  quitarModeracion(){
    if(!this.lockModeracion){

      this.ServicioUsuarios.quitarModerador({ c_usuario: this.usuario.c_usuario }).subscribe((res)=>{
        console.log("quitarmoderacion",res);
        if(res.message == "Convertido en usuario"){
          alert("El usuario ahora es un usuario normal");
          this.usuario.tipo = 0;
        }else if (res.message == "Ya es usuario"){
          alert("El usuario ya es un usuario normal");
        }else{
          alert("Ha ocurrido un problema con el backend");
        }

        this.lockModeracion = false;

      });
    }

  }



}
