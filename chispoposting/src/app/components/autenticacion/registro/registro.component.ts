import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [DatePipe]
})
export class RegistroComponent implements OnInit {

  formularioRegistro: FormGroup;
  isSubmitted: boolean = false;

  f_maxima: string = this.datepipe.transform((new Date()).setFullYear((new Date().getFullYear())-18),'yyyy-MM-dd');;


  constructor(
    private formBuilder: FormBuilder, 
    private ServicioAutenticacion: AutenticacionService,
    private datepipe: DatePipe) { }

  ngOnInit(): void {
    
    this.crearFormulario();
    this.ServicioAutenticacion.imprimiralgo();
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
    console.log('registro');

  }

  mostrarusuarios(){
    this.ServicioAutenticacion.obtenerUsuarios().subscribe((usuarios)=>{
      console.log(usuarios);
    })
  }

}
