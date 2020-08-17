import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from 'src/app/shared/models/comentario';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { ComentariosService } from 'src/app/shared/services/comentarios.service';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-publicacion-comentario',
  templateUrl: './publicacion-comentario.component.html',
  styleUrls: ['./publicacion-comentario.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class PublicacionComentarioComponent implements OnInit {

  nuevo_comentario: string = "";
  closeResult = '';

  editandoComentario: string = "";
  id_comentarioEditado: number = 0;
  indice_comentarioEditado: number = 0;


  @Input() comentarios: Array<Comentario> = new Array<Comentario>();

  constructor(
    public ServicioUsuarios: UsuariosService,
    private ServicioComentarios: ComentariosService,
    private rutaActiva: ActivatedRoute,
    private modalService: NgbModal
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

  open(content:any, id_comentario:number, comentario:string, indice:number) {
    this.indice_comentarioEditado = indice;
    this.id_comentarioEditado = id_comentario;
    this.editandoComentario = comentario;

    this.modalService.open(content);
  }

  guardarEdicion(){
  
    this.ServicioComentarios.actualizarComentario(this.id_comentarioEditado, this.editandoComentario).subscribe((res)=>{
        if(res.message == "Comentario Updated Successfully"){
          alert("Comentario actuaizado satisfactoriamente");
          this.comentarios[this.indice_comentarioEditado].comentario = this.editandoComentario;
          this.modalService.dismissAll();
        }else{
          alert("No se ha podido actualizar su comentario");
        }
            
    })

  }

}
