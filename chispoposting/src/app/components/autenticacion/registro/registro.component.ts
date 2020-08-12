import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [DatePipe]
})
export class RegistroComponent implements OnInit {

  topicos = {"1": "Cine", "2": "Memes", "3":"Anime", "4":"Game", "5":"Blog"};
  formularioRegistro: FormGroup;
  isSubmitted: boolean = false;
  isAccepted: boolean = false;

  f_maxima: string = this.datepipe.transform((new Date()).setFullYear((new Date().getFullYear())-18),'yyyy-MM-dd');;


  constructor(
    private formBuilder: FormBuilder, 
    private ServicioUsuarios: UsuariosService,
    private datepipe: DatePipe,
    private router: Router
    ) { }

  ngOnInit(): void {
    
    this.crearFormulario();
  }

  crearFormulario(){
    this.formularioRegistro = this.formBuilder.group({
      id:['', Validators.required],
      correo:['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password:['',Validators.compose([
        Validators.required, Validators.minLength(8)
      ])],
      f_nacimiento: [this.f_maxima,Validators.compose([
        Validators.required
      ])],
      topico: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  registrar(){
    this.isSubmitted = true;
    
    if(!this.isAccepted){ return }

    if (this.formularioRegistro.valid){

      var registro_usuario = this.formularioRegistro.value as Usuario; 
      console.log(registro_usuario);
      
      this.ServicioUsuarios.crearUsuario(registro_usuario).subscribe((res)=>{

        if(res.message == "Usuario created successfully"){

          this.ServicioUsuarios.crearSesion(registro_usuario.id);
          this.router.navigate(["inicio"]);

        }

      })
    }

    
    // console.log(this.formularioRegistro.controls['acuerdo']);

    // console.log('registro');
  }

}
