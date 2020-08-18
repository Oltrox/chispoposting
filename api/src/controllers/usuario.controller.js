import Usuario from '../models/Usuario';
import Topico from '../models/Topico';
import bcrypt, { compareSync } from 'bcrypt';
import jwt from 'jwt-simple';
import moment from 'moment';
import { sequelize } from '../database/database';

//aplicar lowercast
// correo tiene que ser unico

// Funciones utiles
const createToken = (id) => {
    let payload = {
        userId: id,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'day').unix()
    };
    return jwt.encode(payload, "Token-de-pana");
};

export async function checkToken(req, res, next) {
    if (!req.headers['usuario_token']) {
        return res.json({
            message: 'Debe incluir el token',
            data: {}
        });
    };
    const token = req.headers['usuario_token'];
    let payload = null;
    try {
        payload = jwt.decode(token, "Token-de-pana");
        if (moment().unix() > payload.expiresAt) {
            return res.json({
                message: 'Token expirado'
            });
        };
        let usuario = await Usuario.findOne({
            where: {
                id: payload.userId
            }
        });
        if (usuario) {
            if (usuario.token.localeCompare(token) == 0) {
                console.log("##########Token valido###############");

                req.id = payload.id;
                next();
            } else {
                return res.json({
                    message: 'Token invalido'
                });
            };
        };
    } catch (error) {
        console.log(error);
        return res.json({
            message: 'Token invalido',
            data: {}
        });
    };
};

// Funciones de la api

export async function createUsuario(req, res) {
    console.log(req.body);

    try {

        req.body.password = bcrypt.hashSync(req.body.password, 10);
        req.body.id = req.body.id.replace(/\s/g, '');
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
            estado: 0,
            token: createToken(id)
        });

        if (newUsuario) {
            newUsuario.password = undefined;
            res.json({
                message: 'Usuario created successfully',
                data: newUsuario,
                token: newUsuario.token
            });
        };
    } catch (error) {
        console.log(error);
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
            usuarios.forEach(usuario => {
                usuario.password = undefined;
            });
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
            where: sequelize.where(
                sequelize.fn('lower', sequelize.col('id')),
                sequelize.fn('lower', id.toLowerCase())
            )
        });
        if (usuario) {
            usuario.password = undefined;
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

export async function getUsuarioId(req, res) {
    try {
        let usuarios = await Usuario.findAll({
            attributes: ['id'],
            where:{
                estado: 0
            }
        });
        res.json({
            message: 'Usuarios encontrados',
            data: usuarios
        });
    } catch (error) {
        console.log(error);
        res.json({
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
            where: sequelize.where(
                sequelize.fn('lower', sequelize.col('id')),
                sequelize.fn('lower', id.toLowerCase())
            )
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

        if (Object.keys(req.body).length === 0) {
            res.json({
                message: 'Json Vacio',
                data: {}
            });
        };
        var { tipo, valor } = req.body;
        // validar que sea la contraseña actual
        // validar que no fuera la misma contraseña

        // devolver las respuestas de los errores

        var usuario = await Usuario.findOne({
            where: sequelize.where(
                sequelize.fn('lower', sequelize.col('id')),
                sequelize.fn('lower', id_usuario.toLowerCase())
            )
        });

        if (tipo == 1) {

            var { c_antigua, c_nueva } = req.body.valor;

            if (!bcrypt.compareSync(c_antigua, usuario.password)) {
                return res.json({
                    message: 'Contrasena incorrecta',
                    data: {}
                });
            } if (!bcrypt.compareSync(c_nueva, usuario.password)) {
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

export async function login(req, res) {
    console.log(req.body);

    var { id, password } = req.body;

    await Usuario.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('id')),
            sequelize.fn('lower', id.toLowerCase())
        )
    }).then(async (usuario) => {
        if (usuario === undefined) {
            res.json({
                message: 'Usuario no existe'
            });
        } else {
            const equals = bcrypt.compareSync(password, usuario.password);
            if (!equals) {
                res.json({
                    message: 'Contrasena incorrecta'
                });
            } else {
                usuario.token = createToken(usuario.id);
                await usuario.save();
                await usuario.reload().then(() => {
                    res.json({
                        message: 'Correctamente logeado',
                        token: usuario.token
                    });
                });
            };
        };
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    });
};

export async function logout(req, res) {
    console.log(req.body);
    try {
        var { id } = req.body;

        let usuario = await Usuario.findOne({
            where: sequelize.where(
                sequelize.fn('lower', sequelize.col('id')),
                sequelize.fn('lower', id.toLowerCase())
            )
        });

        if (usuario) {
            usuario.token = null;
            await usuario.save();
            await usuario.reload().then(() => {
                res.json({
                    message: 'logout exitoso',
                    data: {}
                });
            });
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Somethin goes wrong',
            data: {}
        });
    }
};