import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  constructor(
    private ServicioAutenticacion: AutenticacionService,
    private router:Router) { }

  ngOnInit(): void {
  }

  cerrar_sesion(){
    this.ServicioAutenticacion.cerrarSesion();
    this.router.navigate(["auth"]);
  }

}
