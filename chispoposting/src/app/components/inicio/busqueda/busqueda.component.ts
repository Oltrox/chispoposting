import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  topicos = {"1": "Cine", "2": "Memes", "3":"Anime", "4":"Game", "5":"Blog"};

  usuariosTotales: Array<Usuario> = new Array<Usuario>();
  busqueda: string = "";

  isTopico: boolean = false;
  isLoadedUsuarios: boolean = false;

  formulario: FormGroup;

  usuariosTabla: Array<Usuario> = new Array<Usuario>();

  constructor(
    private ServicioUsuarios: UsuariosService,
    private formBuilder: FormBuilder
  ) { 

    this.ServicioUsuarios.obtenerUsuariosBusqueda().subscribe((res)=>{
      console.log(res);
      if (res.message="Usuarios encontrados"){
        this.usuariosTotales = res.data as Array<Usuario>;
        this.isLoadedUsuarios = true;
      }else{
        alert("Ha habido un problema con el backend");
      }
    })

  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      topico:['']
    });
  }
    

  buscar(){

    if(this.isLoadedUsuarios){

      this.usuariosTabla = [];
      if(this.busqueda != ""){
        for(var _i=0; _i < this.usuariosTotales.length; _i++ ){
          if (this.usuariosTotales[_i].id.toLowerCase().includes(this.busqueda.toLowerCase())){
            this.usuariosTabla.push(this.usuariosTotales[_i]);
          }
        }
      }
      console.log("usuariostabla",this.usuariosTabla);
    }
  }

  buscarTopico(){

    if (!this.formulario.value.topico){
      alert("Debe elegir un topico");
    }else{ 
      if(this.isLoadedUsuarios){
  
        this.usuariosTabla = [];
        if(this.busqueda != ""){
  
          console.log("topico",this.formulario.value.topico);
  
          var topico = this.formulario.value.topico;
  
          for(var _i=0; _i < this.usuariosTotales.length; _i++ ){
            console.log(topico == this.usuariosTotales[_i].topico);
            if (this.usuariosTotales[_i].id.toLowerCase().includes(this.busqueda.toLowerCase()) &&
              topico == this.usuariosTotales[_i].topico){
                console.log("wea");
              this.usuariosTabla.push(this.usuariosTotales[_i]);  
            }
          }
        }
      }
    }

  }

}
