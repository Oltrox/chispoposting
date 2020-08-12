import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from 'src/app/shared/models/comentario';

@Component({
  selector: 'app-publicacion-comentario',
  templateUrl: './publicacion-comentario.component.html',
  styleUrls: ['./publicacion-comentario.component.css']
})
export class PublicacionComentarioComponent implements OnInit {

  @Input() comentarios: Array<Comentario> = new Array<Comentario>();

  constructor() { }

  ngOnInit(): void {
    
  }

}
