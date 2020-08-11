import Usuario from '../models/Usuario';

export async function createUsuario(req, res) {
    console.log(req.body);
    var { id, password, correo, topico, f_nacimiento } = req.body;
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
            m_elimicacion: 0,
            estado: 0
        });
        if (newUsuario) {
            res.json({
                message: 'Usuario created successfully',
                data: newUsuario
            })
        };
    } catch (error) { //añadir error por usuario unico
        if (error.errors[0].type == "unique violation"){
            res.status(200).json({
                message: 'ID used',
                data: {}
            });
        };
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    };
};

export async function getUsuarios(req, res) {
    console.log(req.body);
    try {
        var usuarios = await Usuario.findAll();
        res.json({
            data: usuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    };
};

// Falta agregar busqueda por relacion en la id

// Falta arreglar la busqueda por minusculas y mayusculas
export async function getUsuario(req, res) {
    console.log(req.body);
    try {
        var { id } = req.params;
        var usuario = await Usuario.findOne({
            where: {
                id: id
            }
        });
        res.json({
            data: usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    };
    
};

//pasar de eliminar a modificar el estado del usuario
// Actualizar base de datos para añadir estado 0: no eliminado - 1: eliminado

export async function deleteUsuario(req, res) {
    console.log(req.body);
    try {
        var { id } = req.params;
        var usuario = await Usuario.destroy({
            where: {
                id: id
            }
        });
        if (usuario) {
            res.json({
                data: usuario
            });
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    };
};

export async function updateUsuario(req, res) {
    console.log(req.body);
    console.log(req.params);
    try {
        const { id_usuario } = req.params;
        var { id, password, correo, topico, f_nacimiento } = req.body;

        let usuario = await Usuario.update({
            id: id,
            password: password
        },{
            where: {
                id:id_usuario
            },
            returning: true,
            plain: true
        });

        if (usuario) {
            res.json({
                message: 'User Updated Successfully',
                data: usuario
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    };
};

export async function testlogin(req, res) {
    console.log(req.body);

    res.json({
        message: 'ok'
    })
};