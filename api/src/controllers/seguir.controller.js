import Seguir from '../models/Seguir';
import Usuario from '../models/Usuario';
import { sequelize } from '../database/database';

export async function createSeguir(req, res) {
    console.log(req.body);
    var { id_1, id_2 } = req.body;

    await Usuario.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('id')),
            sequelize.fn('lower', id_1.toLowerCase())
        )
    }).then((usuario_1) => {
        if (usuario_1) {
            if (usuario_1.estado == 0) {
                Usuario.findOne({
                    where: sequelize.where(
                        sequelize.fn('lower', sequelize.col('id')),
                        sequelize.fn('lower', id_2.toLowerCase())
                    )
                }).then((usuario_2) => {
                    if (usuario_2) {
                        if (usuario_2.estado == 0) {
                            Seguir.create({
                                c_usuario_1: usuario_1.c_usuario,
                                c_usuario_2: usuario_2.c_usuario,
                                f_seguir: Date.now()
                            }).then((newSeguir) => {
                                if (newSeguir) {
                                    res.json({
                                        message: 'Seguir creado',
                                        data: { newSeguir }
                                    });
                                };
                            }).catch((error) => {
                                console.log(error);
                                res.status(500).json({
                                    message: 'Something goes wrong',
                                    data: {}
                                });
                            });
                        } else {
                            res.json({
                                message: 'Usuario 2 eliminado',
                                data: {}
                            });
                        }
                    } else {
                        res.json({
                            message: 'Usuario 2 no encontrado',
                            data: {}
                        });
                    }
                });
            } else {
                res.json({
                    message: 'Usuario 1 eliminado',
                    data: {}
                });
            }
        } else {
            res.json({
                message: 'Usuario 1 no encontrado',
                data: {}
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    });
};

export async function getSeguirSeguidores(req, res) {
    console.log(req.params);
    var { id } = req.params;

    await Usuario.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('id')),
            sequelize.fn('lower', id.toLowerCase())
        )
    }).then((usuario) => {
        if (usuario) {
            Seguir.findAll({
                attribute: ['c_usuario_1'],
                where: {
                    c_usuario_2: usuario.c_usuario
                }
            }).then((seguidores) => {
                res.json({
                    message: 'Seguidores obtenidos',
                    data: seguidores
                });
            }).catch((error) => {
                res.status(500).json({
                    message: 'Something gores wrong',
                    data: {}
                });
            });
        } else {
            res.json({
                message: 'Usuario no encontrado',
                data: {}
            });
        };
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    });
};

export async function getSeguirSeguidos(req, res) {
    console.log(req.params);
    var { id } = req.params;

    await Seguir.findAll({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('id')),
            sequelize.fn('lower', id.toLowerCase())
        )
    }).then((usuario) => {
        if (usuario) {
            Seguir.findAll({
                attribute: ['c_usuario_1'],
                where: {
                    c_usuario_1: usuario.c_usuario
                }
            }).then((seguidos) => {
                res.json({
                    message: 'Seguidos obtenidos',
                    data: seguidos
                });
            }).catch((error) => {
                res.status(500).json({
                    message: 'Something gores wrong',
                    data: {}
                });
            });
        } else {
            res.json({
                message: 'Usuario no encontrado',
                data: {}
            });
        };
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    });
};

export async function getSeguirSeguido(req, res) {
    console.log(req.body);
    var { id_1, id_2 } = req.body;

    await Usuario.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('id')),
            sequelize.fn('lower', id_1.toLowerCase())
        )
    }).then((usuario_1) => {
        if (usuario_1) {
            Usuario.findOne({
                where: sequelize.where(
                    sequelize.fn('lower', sequelize.col('id')),
                    sequelize.fn('lower', id_2.toLowerCase())
                )
            }).then((usuario_2) => {
                if (usuario_2) {

                    Seguir.findOne({
                        where: {
                            c_usuario_1: usuario_1.c_usuario,
                            c_usuario_2: usuario_2.c_usuario,
                        }
                    }).then((seguir) => {
                        if (seguir) {
                            res.json({
                                message: 'Siguiendo',
                                data: { seguir }
                            });
                        } else {
                            res.json({
                                message: 'No siguiendo',
                                data: {}
                            });
                        };
                    }).catch((error) => {
                        console.log(error);
                        res.status(500).json({
                            message: 'Something goes wrong',
                            data: {}
                        });
                    });
                } else {
                    res.json({
                        message: 'Usuario 2 no encontrado',
                        data: {}
                    });
                }
            });
        } else {
            res.json({
                message: 'Usuario 1 no encontrado',
                data: {}
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    });
};

export async function deleteSeguir(req, res) {
    console.log(req.params);
    var { id_1, id_2 } = req.params;

    await Usuario.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('id')),
            sequelize.fn('lower', id_1.toLowerCase())
        )
    }).then((usuario_1) => {
        if (usuario_1) {
            Usuario.findOne({
                where: sequelize.where(
                    sequelize.fn('lower', sequelize.col('id')),
                    sequelize.fn('lower', id_2.toLowerCase())
                )
            }).then((usuario_2) => {
                if (usuario_2) {

                    Seguir.destroy({
                        where: {
                            c_usuario_1: usuario_1.c_usuario,
                            c_usuario_2: usuario_2.c_usuario,
                        }
                    }).then((seguido) => {
                        if (seguido) {
                            res.json({
                                message: 'Seguir eliminado',
                                data: { seguido }
                            });
                        } else {
                            res.json({
                                message: 'Seguir no encontrado',
                                data: {}
                            });
                        };
                    }).catch((error) => {
                        console.log(error);
                        res.status(500).json({
                            message: 'Something goes wrong',
                            data: {}
                        });
                    });
                } else {
                    res.json({
                        message: 'Usuario 2 no encontrado',
                        data: {}
                    });
                }
            });
        } else {
            res.json({
                message: 'Usuario 1 no encontrado',
                data: {}
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    });
};