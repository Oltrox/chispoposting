import Evaluacion from '../models/Evaluacion';
import Usuario from '../models/Usuario';
import { sequelize } from '../database/database';

export async function createEvaluacion(req, res) {
    console.log("####################");
    console.log(req.body);

    var { id, c_publicacion, evaluacion } = req.body;
    await Usuario.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('id')),
            sequelize.fn('lower', id.toLowerCase())
        )
    }).then((usuario) => {
        if (usuario) {
            console.log(1);
            Evaluacion.create({
                c_usuario: usuario.c_usuario,
                c_publicacion: c_publicacion,
                evaluacion: evaluacion
            }).then((evaluacion) => {
                if (evaluacion) {
                    console.log(4);
                    res.json({
                        message: 'Evaluacion creada',
                        data: { evaluacion }
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
                message: 'Usuario no encontrada',
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

export async function getEvaluacionPublicacion(req, res) {
    console.log(req.params);
    var { c_publicacion } = req.params;
    await Evaluacion.findAll({
        attributes: ['c_usuario', 'evaluacion'],
        where: {
            c_publicacion: c_publicacion
        }
    }).then((evaluaciones) => {
        if (evaluaciones) {
            res.json({
                message: 'Evaluaciones obtenidas',
                data: evaluaciones
            });
        };
    }).catch((error) => {
        console.log(error);
        res.json({
            message: 'Something goes wrong',
            data: {}
        });
    });
};

export async function getEvaluacionUsuario(req, res) {
    console.log(req.body);
    var { id, c_publicacion } = req.body;
    await Usuario.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('id')),
            sequelize.fn('lower', id.toLowerCase())
        )
    }).then((usuario) => {
        if (usuario) {
            console.log(1);
            Evaluacion.findOne({
                attributes: ['evaluacion'],
                where: {
                    c_usuario: usuario.c_usuario,
                    c_publicacion: c_publicacion
                }
            }).then((evaluacion) => {
                if (evaluacion) {
                    console.log(4);
                    res.json({
                        message: 'Evaluacion obtenido',
                        data: { evaluacion }
                    });
                } else {
                    res.json({
                        message: 'Evaluacion no encontrada',
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
                message: 'Usuario no encontrada',
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

export async function deleteEvaluacion(req, res) {
    console.log(req.body);
    var { id, c_publicacion } = req.body;
    await Usuario.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('id')),
            sequelize.fn('lower', id.toLowerCase())
        )
    }).then((usuario) => {
        if (usuario) {
            console.log(1);
            Evaluacion.destroy({
                where: {
                    c_usuario: usuario.c_usuario,
                    c_publicacion: c_publicacion
                }
            }).then((evaluacion) => {
                if (evaluacion) {
                    console.log(4);
                    res.json({
                        message: 'Evaluacion eliminada',
                        data: { evaluacion }
                    });
                } else {
                    res.json({
                        message: 'Evaluacion no encontrada',
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
                message: 'Usuario no encontrada',
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

export async function updateEvaluacion(req, res){
    console.log(req.body);
    var { id, c_publicacion, evaluacion } = req.body;
    await Usuario.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('id')),
            sequelize.fn('lower', id.toLowerCase())
        )
    }).then((usuario) => {
        if (usuario) {
            console.log(1);
            Evaluacion.findOne({
                where: {
                    c_usuario: usuario.c_usuario,
                    c_publicacion: c_publicacion
                }
            }).then((updateEvaluacion) => {
                if (updateEvaluacion) {
                    updateEvaluacion.evaluacion = evaluacion;
                    updateEvaluacion.save();
                    updateEvaluacion.reload();
                    res.json({
                        message: 'Evaluacion actualizada',
                        data: { updateEvaluacion }
                    });
                } else {
                    res.json({
                        message: 'Evaluacion no encontrada',
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
                message: 'Usuario no encontrada',
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