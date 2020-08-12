import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from 'src/app/shared/models/comentario';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { ComentariosService } from 'src/app/shared/services/comentarios.service';

@Component({
  selector: 'app-publicacion-comentario',
  templateUrl: './publicacion-comentario.component.html',
  styleUrls: ['./publicacion-comentario.component.css']
})
export class PublicacionComentarioComponent implements OnInit {

  nuevo_comentario: string = "";

  @Input() comentarios: Array<Comentario> = new Array<Comentario>();

  constructor(
    public ServicioUsuarios: UsuariosService,
    private ServicioComentarios: ComentariosService,
    private rutaActiva: ActivatedRoute 
    ) { }

  ngOnInit(): void {
    this.nuevo_comentario = this.nuevo_comentario;
  }

  agregarComentario(){

    if (this.nuevo_comentario == ""){ return ;}

    var comenta = {
      comentario:this.nuevo_comentario, 
      c_usuario: this.ServicioUsuarios.usuarioActivo.c_usuario,
      c_publicacion: Number(this.rutaActiva.snapshot.params.id) 
    } as Comentario;

    this.ServicioComentarios.crearComentario(comenta).subscribe((res)=>{
      this.nuevo_comentario = "";
      this.comentarios.push(res.data as Comentario);
    });


  }

  eliminarComentario(c_comentario:number, indice:number){
    


    this.ServicioComentarios.eliminarComentario(c_comentario).subscribe((res)=>{
      console.log(res);

      if(res.message == "Comentario deleted"){
        alert("Su comentario se ha borrado exitosamente");
        this.comentarios.splice(indice,1);
      }

    })

  }

}
