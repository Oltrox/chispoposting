import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  isLoadedUsuario = false;

  constructor(
    private ServicioUsuarios: UsuariosService
  ) { 
    console.log("RECONSTRUCTED INICIO");
    this.ServicioUsuarios.verUsuario({ id:localStorage.getItem("usuario") } as Usuario).subscribe((res)=>{
      this.ServicioUsuarios.usuarioActivo = res.data as Usuario;
      this.isLoadedUsuario = true;
    });

  }

  ngOnInit(): void {

  }


}
