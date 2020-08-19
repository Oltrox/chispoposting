import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-listadousuarios',
  templateUrl: './listadousuarios.component.html',
  styleUrls: ['./listadousuarios.component.css']
})
export class ListadousuariosComponent implements OnInit {

  isLoaded: boolean = false;
  isLock: boolean = false;

  todosUsuarios: Array<Usuario> = new Array<Usuario>();

  constructor(
    private ServicioUsuarios: UsuariosService
  ) { 

    this.ServicioUsuarios.todosUsuarios().subscribe((res)=>{
      
      this.todosUsuarios = res.data as Array<Usuario>;
      console.log(this.todosUsuarios);
      this.isLoaded = true;

    });

  }

  ngOnInit(): void {
  }


  eliminarUsuario(usuario: Usuario, indice: number){

    if (!this.isLock){
      this.isLock = true;
      this.ServicioUsuarios.eliminarUsuario(usuario.c_usuario).subscribe((res)=>{
  
        console.log(res);
  
        if(res.message == "Usuario eliminado"){
            alert("Usuario eliminado correctamente");
            this.todosUsuarios.splice(indice,1);
        }else if(res.message == "Usuario ya eliminado"){
            alert("El usuario ya estaba eliminado");
        }else if (res.message == "Usuario perdonado"){
            alert("El usuario ha sido perdonado con la membresia otorgada");
        }else{
          alert("Ha habido un problema con el backend");
        }
        this.isLock = false;
      });

    }
  }


}


// •	ID
// •	Fecha de creación de la cuenta
// •	Cantidad de publicaciones
// •	Cantidad de publicaciones riesgosas
// •	Cantidad de comentarios promedio por publicación
// •	Cantidad de visitas al perfil
// •	Cantidad de me gustas promedio por publicación
// •	Tópico seleccionado
// •	Tiene un castigo asignado
// •	Tiene una membresía asignada
