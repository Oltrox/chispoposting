import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ServicioAutenticacion: AutenticacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();

  }

  crearFormulario(){
    this.formularioLogin = this.formBuilder.group({
      id:['', Validators.required],
      password:['',Validators.compose([
        Validators.required, Validators.minLength(8)
      ])],
    });

  }

  login(){
    this.isSubmitted = true;

    if (this.formularioLogin.valid){
      this.ServicioAutenticacion.login(this.formularioLogin.value as Usuario).subscribe((res)=>{

        if(res.message == "ok"){

          
        }

      })
    }

    


  }

}
