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
  
  isYoutube: boolean = false;

  constructor(
    private ServicioPubliaciones: PublicacionesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.linkyt();
  }

  modificarPublicacion(publicacion: Publicacion){
    this.ServicioPubliaciones.publicacionModificar = publicacion;
    this.router.navigate(["/inicio/modificar/publicacion"]);
  }

  linkyt(){
    if(this.publicacion.link.includes("www.youtube.com")){
      this.isYoutube = true;
    }
  }
}
