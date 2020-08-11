export class Usuario{
    id: string;
    correo: string;
    password: string;
    topico: string;
    f_nacimiento: string;

    constructor(
        id:string,
        correo:string,
        password:string,
        topico:string,
        f_nacimiento:string){

        this.id = id;
        this.correo = correo;
        this.password = password;
        this.topico = topico;
        this.f_nacimiento = f_nacimiento;

    }

    imprimir(){
        console.log(this);

    }

}