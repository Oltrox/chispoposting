export class Publicacion {
    c_publicacion: number;
    c_usuario: number;
    link: string;
    titulo: string;
    descripcion: string;
    n_likes: number;
    n_dislikes: number;
    n_comentarios: number;
    f_creacion: string;
    visible: number;
    eliminado: number;

    constructor(
        c_publicacion: number = 0,
        c_usuario: number = 0,
        link: string = "",
        titulo: string= "",
        descripcion: string = "",
        n_likes: number = 0,
        n_dislikes: number = 0,
        n_comentarios: number = 0,
        f_creacion: string = "",
        visible: number = 0,
        eliminado: number = 0
    ){

        this.c_publicacion = c_publicacion;
        this.c_usuario = c_usuario;
        this.link = link;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.n_likes = n_likes;
        this.n_dislikes = n_dislikes;
        this.n_comentarios = n_comentarios;
        this.f_creacion = f_creacion;
        this.visible = visible;
        this.eliminado = eliminado;
    }


}