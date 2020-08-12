export class Comentario {
    c_comentario: number;
    c_usuario: number;
    c_publicacion: number;
    f_creacion: string;
    f_modificacion: string;
    comentario: string;

    constructor(    
        c_comentario: number = 0,
        c_usuario: number = 0,
        c_publicacion: number = 0,
        f_creacion: string = "",
        f_modificacion: string = "",
        comentario: string = ""
    ){
    
        this.c_comentario = c_comentario;
        this.c_usuario = c_usuario;
        this.c_publicacion = c_publicacion;
        this.f_creacion = f_creacion;
        this.f_modificacion = f_modificacion;
        this.comentario = comentario;
    
    }


}