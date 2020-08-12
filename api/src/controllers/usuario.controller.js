import Usuario from '../models/Usuario';
import Topico from '../models/Topico';
import bcrypt, { compareSync } from 'bcrypt';
import jwt from 'jwt-simple';
import moment from 'moment';

// correo tiene que ser unico
const createToken = (user) => {
    let payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'day').unix()
    };
    return jwt.encode(payload, "Token-de-pana");
};

export const checkToken = ( req, res, next ) => {
    if (!req.headers['usario_token']) {
        return res.json({
            message: 'Debe incluir el token',
            data:{}
        });
    };
    const token = req.headers['usuario_token'];
    let payload = null;
    try {
        payload = jwt.decode(token, "Token-de-pana");
    } catch (error) {
        return res.json({
            message: 'Token invalido',
            data: {}
        });        
    };
    if (moment().unix() > payload.expiresAt) {
        return res.json({
            message: 'Token expirado'
        });
    };
    req.id = payload.id;
    next();
};

export async function createUsuario(req, res) {
    console.log(req.body);

    try {

        req.body.password = bcrypt.hashSync(req.body.password, 10);
        var { id, password, correo, topico, f_nacimiento } = req.body;

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
            });
        };
    } catch (error) {
        //console.log(error);
        if (error.errors[0].message == "id must be unique") {
            res.status(501).json({
                message: 'ID used',
                data: {}
            });
        };
        if (error.errors[0].message == "correo must be unique") {
            res.status(502).json({
                message: 'Correo used',
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
        if (usuarios) {
            res.json({
                data: usuarios
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
        if (usuario) {
            res.json({
                data: usuario
            });
        } else {
            res.json({
                message: 'Usuario no encontrado',
                data: {}
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

//pasar de eliminar a modificar el estado del usuario
// Actualizar base de datos para añadir estado 0: no eliminado - 1: eliminado
export async function deleteUsuario(req, res) {
    console.log(req.body);
    try {
        var { c_usuario } = req.params;
        var usuario = await Usuario.findOne({
            where: {
                c_usuario: c_usuario
            }
        });
        if (usuario.m_elimicacion == 0) {

            var usuario = await Usuario.update({
                m_elimicacion: -1
            }, {
                where: {
                    c_usuario: c_usuario
                }
            });
        } else {
            var usuario = await Usuario.update({
                m_elimicacion: 0
            }, {
                where: {
                    c_usuario: c_usuario
                }
            });
        };
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

        var { tipo, valor } = req.body;
        if (Object.keys(req.body).length === 0) {
            res.json({
                message: 'Json Vacio',
                data: {}
            });
        };
        // validar que sea la contraseña actual
        // validar que no fuera la misma contraseña

        // devolver las respuestas de los errores

        var usuario = await Usuario.findOne({
            where: {
                id: id_usuario
            }
        });

        if (tipo == 1) {
            
            var { c_antigua, c_nueva } = req.body.valor;
            console.log(bcrypt.compareSync( c_antigua, usuario.password ));

            if (!bcrypt.compareSync( c_antigua, usuario.password )) {
                return res.json({
                    message: 'Contrasena incorrecta',
                    data: {}
                });
            } if (c_antigua == c_nueva) {
                return res.json({
                    message: 'La nueva contrasena es la misma que la antigua',
                    data: {}
                });
            } else {
                usuario.password = bcrypt.hashSync(c_nueva, 10);
                await usuario.save();
                await usuario.reload();
            };
        };

        if (tipo == 2) {
            var { valor } = req.body;
            console.log(valor);
            // verificar que el topico existe en la DB

            var topico = await Topico.findOne({
                where: {
                    c_topico: valor
                }
            });

            if (topico.length > 0) {
                return res.json({
                    message: 'El topico no existe'
                });
            } if (valor == usuario.topico) {
                return res.json({
                    message: 'El nuevo topico es el mismo que el antiguo',
                    data: {}
                });
            } else {
                usuario.topico = topico.c_topico;
                await usuario.save();
                await usuario.reload();
            }
        };

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



// Terminar de crear el login
export async function login(req, res) {
    console.log(req.body);
    try {
        var { id, password } = req.body;
        let usuario = await Usuario.findOne({
            where: {
                id: id
            }
        });
        if (usuario === undefined) {
            res.json({
                message: 'Usuario no existe'
            });
        } else {
            const equals = bcrypt.compareSync( password, usuario.password );
            if (!equals) {
                res.json({
                    message: 'Contrasena incorrecta'
                });
            } else {
                res.json({
                    message: 'Correctamente logeado',
                    data: createToken(usuario),
                });
            };
        };
        res.json({
            message: 'ok'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    };
};