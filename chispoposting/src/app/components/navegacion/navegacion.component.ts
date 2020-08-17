import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  usuario: string;
  public navbarCollapsed = true;

  constructor(
    public ServicioUsuarios: UsuariosService,
    private router:Router 
  ) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem("usuario");
  }

  cerrar_sesion(){
    this.ServicioUsuarios.cerrarSesion();
    this.router.navigate(["/auth"]);
  }


  ver_usuario(){
    console.log(this.ServicioUsuarios.usuarioActivo);
  }



}
