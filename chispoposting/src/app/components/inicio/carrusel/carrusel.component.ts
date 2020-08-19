import { Component, OnInit, Input } from '@angular/core';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluacionService } from 'src/app/shared/services/evaluacion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {

  link_publicacion: string = "";
  tipo:string = "publicacion";

  @Input() isLoadedUsuario: Boolean = new Boolean();
  @Input() isYoutube: Boolean;
  @Input() ytUrl: any = "" ;
  @Input() isImg: Boolean = false;
  @Input() imgUrl: any = "";

  isLoadadedPublicaciones = false;
  isEvaluado: boolean = false;

  evaluadoState: string = "Buscando tu evaluacion";

  publicaciones: Array<Publicacion> = new Array<Publicacion>(); 
  publicacionActual: Publicacion = new Publicacion();

  pos = 0;

  sub:any;
  sub2:any;
  sub3:any;

  lockEvaluar: boolean = false;

  constructor(
    public ServicioPublicaciones: PublicacionesService,
    private ServicioEvaluaciones: EvaluacionService,
    public ServicioUsuarios: UsuariosService,
    private router: Router,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) { 
    console.log("ENTRADA LOADED USUAIRO", this.isLoadedUsuario);
    this.sub = this.ServicioPublicaciones.leerPosts().subscribe((publicaciones_recibidas)=>{
      this.ServicioPublicaciones.publicaciones = publicaciones_recibidas.data as Array<Publicacion>;

      this.publicaciones =  publicaciones_recibidas.data as Array<Publicacion>;
      this.publicacionActual = this.publicaciones[this.pos];

      this.getEvaluacion();

    });

  }

  ngOnInit(): void {

  }

  prev(): void {

    if(this.pos > 0){
      this.pos -=1;
    }else{
      this.pos = this.publicaciones.length -1 ;
    }
    console.log("valor previo", this.pos);
    
    this.publicacionActual = this.publicaciones[this.pos];

    if( this.publicacionActual.link.includes(".jpg") || this.publicacionActual.link.includes(".png") || this.publicacionActual.link.includes(".gif")  ){
      this.imgUrl = this.publicacionActual.link;
      this.imgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imgUrl);
      this.isImg = true;
    }else{
      this.isImg = false;
    }

    if(this.publicacionActual.link.includes("www.youtube.com")){
      this.isYoutube = true;
      this.ytUrl = "https://www.youtube.com/embed/" + this.publicacionActual.link.replace('https://www.youtube.com/watch?v=','');
      this.ytUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.ytUrl);
    }else{
      this.isYoutube = false;
    }

    this.getEvaluacion();

  }

  sig(): void {
    this.pos += 1;
    this.pos =  this.pos % this.publicaciones.length;
    this.publicacionActual = this.publicaciones[this.pos];

    console.log("valor previo", this.pos);

    if( this.publicacionActual.link.includes(".jpg") || this.publicacionActual.link.includes(".png") || this.publicacionActual.link.includes(".gif")  ){
      this.imgUrl = this.publicacionActual.link;
      this.imgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imgUrl);
      this.isImg = true;
    }else{
      this.isImg = false;
    }

    if(this.publicacionActual.link.includes("www.youtube.com")){
      this.isYoutube = true;
      this.ytUrl = "https://www.youtube.com/embed/" + this.publicacionActual.link.replace('https://www.youtube.com/watch?v=','');
      this.ytUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.ytUrl);
      
    }else{
      this.isYoutube = false;
    }

    this.getEvaluacion();

  }

  irPublicacion(){
    this.router.navigate([`/publicacion/${this.publicacionActual.c_publicacion}`]);
  }

  mostrarLink(content) {
    this.link_publicacion = `http://localhost:4200/publicacion/${this.publicacionActual.c_publicacion}`;
    this.modalService.open(content, { centered: true });
  }

  getEvaluacion(){
    let json = {
      id: localStorage.getItem("usuario"),
      c_publicacion: this.publicacionActual.c_publicacion
    }
    
    this.evaluadoState= "Buscando tu evaluacion";
    this.isEvaluado = true;

    this.sub3 = this.ServicioEvaluaciones.getEvaluacion(json).subscribe((res)=>{
      console.log(res);

      if(res.message == "Evaluacion obtenido"){
        this.isEvaluado = true;

        if (res.data.evaluacion.evaluacion == 0){
          this.evaluadoState = "Le has dado ME GUSTA";
        }else{
          this.evaluadoState = "Le has dado NO ME GUSTA";
        }

      }else if (res.message = "Evaluacion no encontrada"){
        this.isEvaluado = false;
      }

      this.isLoadadedPublicaciones = true;
      this.sub3.unsubscribe();
    });
  }


  evaluar(evaluacion:number){

    if (!this.lockEvaluar){
      this.lockEvaluar = true;

      let json = {
        id: localStorage.getItem("usuario"),
        c_publicacion: this.publicacionActual.c_publicacion,
        evaluacion: evaluacion
      }

      this.sub2 = this.ServicioEvaluaciones.evaluar(json).subscribe((res) => {
        if(res.message == "Evaluacion creada"){
          this.isEvaluado = true;
        }else{
          alert("Ha habido algun problema con el backend");  
        }
        
        this.lockEvaluar = false;

        this.getEvaluacion();
      })
    }


  }


}
