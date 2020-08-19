import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';

import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  constructor(
    public ServicioUsuarios: UsuariosService,
    public ServicioPublicaciones: PublicacionesService,
    private router: Router
  ) { 

    this.comprobarAdmin();
    
  }

  ngOnInit(): void {

  }


  comprobarAdmin(){

    this.ServicioUsuarios.verUsuario({ id: localStorage.getItem("usuario") } as Usuario).subscribe((res)=>{
      console.log(res as Usuario);
      let usr:Usuario = res.data as Usuario;
      if (usr.tipo != 2){
        this.router.navigate(["/inicio/publicaciones"]);
      }
    });

  }

}
