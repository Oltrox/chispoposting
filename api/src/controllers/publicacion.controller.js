import Publicacion from '../models/Publicacion';
const { QueryTypes, where, col } = require('sequelize');
import { sequelize } from '../database/database';
import Usuario from '../models/Usuario';

// paginar publicaciones

export async function createPublicacion(req, res) {
    console.log(req.body);
    var { c_usuario, link, titulo, descripcion } = req.body;
    try {
        let newPublicacion = await Publicacion.create({
            c_usuario: c_usuario,
            link: link,
            titulo: titulo,
            descripcion: descripcion,
            n_likes: 0,
            n_dislikes: 0,
            n_comentarios: 0,
            f_creacion: Date.now(),
            visible: 0,
            eliminado: 0
        });
        if (newPublicacion) {
            res.json({
                message: 'Publicacion created successfully',
                data: newPublicacion
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

export async function getPublicaciones(req, res) {

    var publicacionesUsuarios = [], publicaciones

    await Publicacion.findAll({
        where: {
            visible: 0,
            eliminado: 0
        }
    }).then(data => {
        publicaciones = data;
        var promesas = [];

        for (let i = 0; i < publicaciones.length; i++) {
            promesas.push(Usuario.findOne({
                where: {
                    c_usuario: publicaciones[i].c_usuario
                }
            }));
        }

        return Promise.all(promesas);
    }).then(result => {

        publicacionesUsuarios = publicaciones.map((elem, index) => {
            let objeto = elem.get({ plain: true });
            objeto.usuario = result[index].dataValues;
            return objeto;
        });

        // console.log(publicacionesUsuarios);
        return res.json({
            data: publicacionesUsuarios
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    });
};

export async function getPublicacionesUsuarios(req, res) {

    var publicacionesUsuarios = []
    await Usuario.findAll({
        where: {
            estado: 0
        }
    }).then((usuarios) => {

        var promesas = [];
        for (let i = 0; i < usuarios.length; i++) {
            promesas.push(
                Publicacion.findAll({
                    where: {
                        c_usuario: usuarios[i].c_usuario,
                        visible: 0,
                        eliminado: 0
                    }
                })
            );
        };
        return Promise.all(promesas);
    }).then(async (publicaciones) => {

        let usuarios = await Usuario.findAll({
            where: {
                estado: 0
            }
        });

        for (let i = 0; i < usuarios.length; i++) {
            for (let j = 0; j < publicaciones.length; j++) {
                if (publicaciones[j][0]) {
                    if (publicaciones[j][0].c_usuario == usuarios[i].c_usuario) {
                        console.log("###########################");
                        usuarios[i].password = undefined;
                        usuarios[i].token = undefined;

                        publicacionesUsuarios.push({
                            usuario: usuarios[i],
                            publicaciones: publicaciones[j]
                        })
                    }
                }
            }
        }
    }).then(() => {
        res.json({
            message: 'publicaciones obtenidas',
            data: { publicacionesUsuarios }
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: { perro: 'perro' }
        });
    });
};

export async function getPublicacionesUsuario(req, res) {

    console.log(req.body);

    var { id } = req.params;
    var publicacionesUsuario = []

    await Usuario.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('id')),
            sequelize.fn('lower', id.toLowerCase())
        )
    }).then((usuario) => {
        var promesas = [];
        promesas.push(
            Publicacion.findAll({
                where: {
                    c_usuario: usuario.c_usuario,
                    visible: 0,
                    eliminado: 0
                }
            })
        );
        return Promise.all(promesas).then((publicaciones) => {
            usuario.password = undefined;
            usuario.token = undefined;
            res.json({
                message: 'Publicaciones obtenidas',
                usuario: usuario,
                data: publicaciones
            });
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    });
};

export async function getPublicacion(req, res) {
    console.log(req.body);

    var { c_publicacion } = req.params;
    await Publicacion.findOne({
        where: {
            c_publicacion: c_publicacion,
            visible: 0,
            eliminado: 0
        }
    }).then(async (publicacion) => {
        await Usuario.findOne({
                where: {
                    c_usuario: publicacion.c_usuario,
                    estado: 0
                }
            }
        ).then((usuario) => {
            usuario.password = undefined;
            usuario.token = undefined;
            console.log(usuario);
            res.json({
                message: 'Publicacion obtenida',
                usuario: usuario,
                data: publicacion
            });
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    });
};

export async function getPublicacionesTopico(req, res) {
    var { topico } = req.params;

    var publicacionesUsuarios = []
    await Usuario.findAll({
        where: {
            topico: topico
        }
    }).then((usuarios) => {

        var promesas = [];
        for (let i = 0; i < usuarios.length; i++) {
            promesas.push(
                Publicacion.findAll({
                    where: {
                        c_usuario: usuarios[i].c_usuario,
                        visible: 0,
                        eliminado: 0
                    }
                })
            );
        };
        return Promise.all(promesas);
    }).then(async (publicaciones) => {

        let usuarios = await Usuario.findAll({
            where: {
                estado: 0
            }
        });

        for (let i = 0; i < usuarios.length; i++) {
            for (let j = 0; j < publicaciones.length; j++) {
                if (publicaciones[j][0]) {
                    if (publicaciones[j][0].c_usuario == usuarios[i].c_usuario) {
                        console.log("###########################");
                        usuarios[i].password = undefined;
                        usuarios[i].token = undefined;

                        publicacionesUsuarios.push({
                            usuario: usuarios[i],
                            publicaciones: publicaciones[j]
                        })
                    }
                }
            }
        }
    }).then(() => {
        res.json({
            message: 'publicaciones obtenidas',
            data: { publicacionesUsuarios }
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: { perro: 'perro' }
        });
    });
};

export async function getUsuariosTopico(req, res) {
    var { topico } = req.params;

    var publicacionesUsuarios = []
    await Usuario.findAll({
        where: {
            topico: topico
        }
    }).then((usuarios) => {
        for (let i = 0; i < usuarios.length; i++) {
            usuarios[i].password = undefined;
            usuarios[i].token = undefined;
        }
        res.json({
            message: 'Usuarios obtenidas',
            data: { usuarios }
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: { perro: 'perro' }
        });
    });
};

export async function getPublicacionesPropias(req, res) {

    console.log(req.body);
    try {
        var { id } = req.params;

        var publicaciones = await sequelize.query(
            'SELECT * FROM publicacion WHERE c_usuario IN (SELECT c_usuario FROM usuario WHERE id = $id);',
            {
                bind: { id: id },
                type: QueryTypes.SELECT
            }
        );
        res.json({
            data: publicaciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    };
};



export async function invisiblePublicacion(req, res) {
    console.log(req.params);
    try {
        var { c_publicacion } = req.params;
        var publicacion = await Publicacion.update({
            visible: 1
        }, {
            where: {
                c_publicacion: c_publicacion
            },
            returning: true,
            plain: true
        });
        res.json({
            data: publicacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    };
};

export async function deletePublicacion(req, res) {
    console.log(req.params);
    try {
        var { c_publicacion } = req.params;
        var publicacion = await Publicacion.update({
            eliminado: 1
        }, {
            where: {
                c_publicacion: c_publicacion
            },
            returning: true,
            plain: true
        });
        res.json({
            data: publicacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    };
};

export async function updatePublicacion(req, res) {
    console.log(req.params);
    try {
        var { c_publicacion } = req.params;
        var { titulo, descripcion } = req.body;
        var publicacion = await Publicacion.update({
            titulo: titulo,
            descripcion: descripcion
        }, {
            where: {
                c_publicacion: c_publicacion
            },
            returning: true,
            plain: true
        });
        res.json({
            data: publicacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    }
};