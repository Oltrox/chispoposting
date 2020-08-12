import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private ServicioUsuarios: UsuariosService
  ) { 
    
    this.ServicioUsuarios.verUsuario({ id:localStorage.getItem("usuario") } as Usuario).subscribe((res)=>{
      this.ServicioUsuarios.usuarioActivo = res.data as Usuario;
    });

  }

  ngOnInit(): void {

  }


}
