import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/usuario';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

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
    private ServicioUsuarios: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem("usuario")){
      this.router.navigate(["inicio"]);
    }

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

    var login_usuario:Usuario = this.formularioLogin.value as Usuario;

    if (this.formularioLogin.valid){
      this.ServicioUsuarios.login(login_usuario).subscribe((res)=>{

        if(res.message == "Correctamente logeado"){
          console.log(res.token);
          this.ServicioUsuarios.crearSesion(login_usuario.id, res.token);
          this.router.navigate(["inicio"]);
        }

        if(res.message == "Contrasena incorrecta"){
          alert("Usuario o contraseña incorrectos");
        }

      })
    }

  }

}
