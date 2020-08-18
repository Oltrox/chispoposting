import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicacion-detalle',
  templateUrl: './publicacion-detalle.component.html',
  styleUrls: ['./publicacion-detalle.component.css']
})
export class PublicacionDetalleComponent implements OnInit {

  @Input() publicacion: Publicacion = new Publicacion();
  @Input() isSameUser: Boolean = false; // Para el carrusel, este valor debe ser falso
  @Input() isYoutube: Boolean;


  constructor(
    private ServicioPubliaciones: PublicacionesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  modificarPublicacion(publicacion: Publicacion){
    this.ServicioPubliaciones.publicacionModificar = publicacion;
    this.router.navigate(["/inicio/modificar/publicacion"]);
  }

}
