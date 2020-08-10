import Usuario from '../models/Usuario';

export async function createUsuario(req, res) {
    console.log(req.body);
    var { id, password, correo, topico, f_nacimiento} = req.body;
    try {
        let newUsuario = await Usuario.create({
            id: id,
            password: password,
            l_foto: 'foto',
            correo: correo,
            tipo: '0',
            descripcion: 'descripcion',
            topico: topico,
            f_nacimiento: f_nacimiento,
            f_ultimo: Date.now(),
            f_creacion: Date.now(),
            n_seguidores: 0,
            n_seguidos: 0,
            n_publicaciones: 0,
            m_castigo: 0,
            m_elimicacion: 0
        });
        if (newUsuario) {
            res.json({
                message: 'Usuario created successfully',
                data: newUsuario
            })
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    };
};