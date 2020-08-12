export class Usuario{
    c_usuario: number;
    id: string;
    correo: string;
    password: string;
    topico: string;
    f_nacimiento: string;
    l_foto: string;
    tipo: number;
    descripcion: string;
    f_ultimo: string;
    f_creacion: string;
    n_seguidores: number;
    n_seguidos: number;
    n_publicaciones: number;
    m_castigo: number;
    m_elimicacion: number;
    estado: number;


    constructor(
        c_usuario: number = 0,
        id:string = "",
        correo:string = "",
        password:string = "",
        topico:string = "",
        f_nacimiento:string = "",
        l_foto: string = "",
        tipo: number = 0,
        descripcion: string = "",
        f_ultimo: string = "",
        f_creacion: string = "",
        n_seguidores: number = 0,
        n_seguidos: number = 0,
        n_publicaciones: number = 0,
        m_castigo: number = 0,
        m_elimicacion: number = 0,
        estado: number = 0
        ){

        this.c_usuario = c_usuario;
        this.id = id;
        this.correo = correo;
        this.password = password;
        this.topico = topico;
        this.f_nacimiento = f_nacimiento;
        this.l_foto = l_foto;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.f_ultimo = f_ultimo;
        this.f_creacion = f_creacion;
        this.n_seguidores = n_seguidores;
        this.n_seguidos = n_seguidos;
        this.n_publicaciones = n_publicaciones;
        this.m_castigo = m_castigo;
        this.m_elimicacion = m_elimicacion;
        this.estado = estado;

    }

    imprimir(){
        console.log(this);

    }

}