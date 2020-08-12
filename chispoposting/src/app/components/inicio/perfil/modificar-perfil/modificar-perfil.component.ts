import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent implements OnInit {

  topicos = {"1": "Cine", "2": "Memes", "3":"Anime", "4":"Game", "5":"Blog"};

  formularioModificacionPass: FormGroup;
  formularioModificacionTopico: FormGroup;

  isSubmittedPass: boolean = false;
  isSubmittedTopico: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public ServicioUsuario: UsuariosService
  ) { }

  ngOnInit(): void {
    
    this.crearFormularios();

  }

  crearFormularios(){

    this.formularioModificacionPass = this.formBuilder.group({
      c_antigua:['',Validators.compose([
        Validators.required, Validators.minLength(8)
      ])],
      c_nueva:['',Validators.compose([
        Validators.required, Validators.minLength(8)
      ])]
    });

    this.formularioModificacionTopico = this.formBuilder.group({
      topico: [ this.ServicioUsuario.usuarioActivo.topico, Validators.required ]
    });

  }

  modificarPass(){

    this.isSubmittedPass = true;

    if (this.formularioModificacionPass.valid){

      var formulario = {
        tipo:1,
        valor:this.formularioModificacionPass.value
      }
    
      this.ServicioUsuario.modificarUsuarioPass(formulario,this.ServicioUsuario.usuarioActivo.id).subscribe((res)=>{
        if (res.message == "User Updated Successfully"){
          alert("Se ha cambiado la contraseña correctamente");
          this.formularioModificacionPass.reset();
          this.isSubmittedPass = false;
        }else if (res.message == "Contrasena incorrecta"){
          alert("La contraseña actual ingresada no es correcta");
        }

      })

    }

  }

  modificarTopico(){

    this.isSubmittedTopico = true;

    if (this.formularioModificacionTopico.valid){
      
      var formulario = {
        tipo:2,
        valor: Number(this.formularioModificacionTopico.value.topico)
      }
  
      this.ServicioUsuario.modificarUsuarioTopico(formulario,this.ServicioUsuario.usuarioActivo.id).subscribe((res)=>{
        console.log(res);
        if (res.message == "User Updated Successfully"){
          this.ServicioUsuario.usuarioActivo = res.data as Usuario;
          alert("Ha cambiado el tópico satisfactoriamente");
        }else if (res.message == "El nuevo topico es el mismo que el antiguo" ){
          alert(res.message);
        }else{
          alert("Ha ocurrido un error en el backend"); console.log(res);
        }
        
        this.formularioModificacionTopico.reset();
        this.isSubmittedTopico = false;
        
      })
    }


  }

}
