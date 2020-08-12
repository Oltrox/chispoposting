import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { Publicacion } from 'src/app/shared/models/publicacion';

@Component({
  selector: 'app-agregar-publicacion',
  templateUrl: './agregar-publicacion.component.html',
  styleUrls: ['./agregar-publicacion.component.css']
})
export class AgregarPublicacionComponent implements OnInit {

  formularioPublicar: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private ServicioUsuarios: UsuariosService,
    private ServicioPublicaciones: PublicacionesService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formularioPublicar = this.formBuilder.group({
      link:['', Validators.required],
      titulo:['', Validators.required],
      descripcion:['',Validators.required]
    });
  }

  publicar(){
    this.isSubmitted = true;
    
    if(this.formularioPublicar.valid){
      var formulario = this.formularioPublicar.value as Publicacion;
      formulario["c_usuario"] = Number(this.ServicioUsuarios.usuarioActivo.c_usuario);
      
      this.ServicioPublicaciones.publicar(formulario).subscribe((res)=>{


        if(res.message == "Publicacion created successfully"){
          alert("Publicacion creada exitosamente");
          this.formularioPublicar.reset();
          this.isSubmitted = false;
        }else{
          alert("Ha habido algun error con el backend");
        }

      })
    }


  }

}
