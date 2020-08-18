import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-publicacion',
  templateUrl: './modificar-publicacion.component.html',
  styleUrls: ['./modificar-publicacion.component.css']
})
export class ModificarPublicacionComponent implements OnInit {

  publicacionModificar: Publicacion = new Publicacion(); 
  formularioModificar: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ServicioPublicaciones: PublicacionesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.publicacionModificar = this.ServicioPublicaciones.publicacionModificar;
    this.crearForumulario();
  }

  crearForumulario(){
    this.formularioModificar = this.formBuilder.group({
      c_publicacion: [this.publicacionModificar.c_publicacion],
      titulo:[this.publicacionModificar.titulo, Validators.required],
      descripcion:[this.publicacionModificar.descripcion, Validators.required]
    });
  }

  modificarPublicacion(){

    console.log(this.formularioModificar.value);

    this.ServicioPublicaciones.modificarPublicacion(this.formularioModificar.value as Publicacion).subscribe((res)=>{
      console.log(res);

      this.router.navigate([`/publicacion/${this.ServicioPublicaciones.publicacionModificar.c_publicacion}`])
    })

  }

}
