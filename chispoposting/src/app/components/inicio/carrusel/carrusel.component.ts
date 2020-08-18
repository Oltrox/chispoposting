import { Component, OnInit, Input } from '@angular/core';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {

  link_publicacion: string = "";

  @Input() isLoadedUsuario: Boolean = new Boolean();
  @Input() isYoutube: Boolean;

  isLoadadedPublicaciones = false;

  publicaciones: Array<Publicacion> = new Array<Publicacion>(); 
  publicacionActual: Publicacion = new Publicacion();

  pos = 0;

  sub;

  constructor(
    public ServicioPublicaciones: PublicacionesService,
    private router: Router,
    private modalService: NgbModal
  ) { 
    console.log("ENTRADA LOADED USUAIRO", this.isLoadedUsuario);
    this.sub = this.ServicioPublicaciones.leerPosts().subscribe((publicaciones_recibidas)=>{
      this.ServicioPublicaciones.publicaciones = publicaciones_recibidas.data as Array<Publicacion>;

      this.publicaciones =  publicaciones_recibidas.data as Array<Publicacion>;
      console.log(this.publicaciones);
      this.publicacionActual = this.publicaciones[this.pos];

      this.isLoadadedPublicaciones = true;
    });

    // this.publicacionActual = this.ServicioPublicaciones.publicaciones[this.pos];

  }

  ngOnInit(): void {

  }

  prev(): void {

    if(this.pos > 0){
      this.pos -=1;
    }else{
      this.pos = this.publicaciones.length;
    }
    
    this.publicacionActual = this.publicaciones[this.pos];
    if(this.publicacionActual.link.includes("www.youtube.com")){
      this.isYoutube = true;
    }else{
      this.isYoutube = false;
    }

  }

  sig(): void {
    this.pos += 1;
    this.pos =  this.pos % this.publicaciones.length;
    this.publicacionActual = this.publicaciones[this.pos];
    if(this.publicacionActual.link.includes("www.youtube.com")){
      this.isYoutube = true;
    }else{
      this.isYoutube = false;
    }

  }

  irPublicacion(){
    this.router.navigate([`/publicacion/${this.publicacionActual.c_publicacion}`]);
  }

  mostrarLink(content) {
    this.link_publicacion = `http://localhost:4200/publicacion/${this.publicacionActual.c_publicacion}`;
    this.modalService.open(content, { centered: true });
  }


}
