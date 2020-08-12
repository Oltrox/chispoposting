import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from 'src/app/shared/models/publicacion';

@Component({
  selector: 'app-publicacion-detalle',
  templateUrl: './publicacion-detalle.component.html',
  styleUrls: ['./publicacion-detalle.component.css']
})
export class PublicacionDetalleComponent implements OnInit {

  @Input() publicacion: Publicacion = new Publicacion();
  
  constructor() { }

  ngOnInit(): void {

  }

}
