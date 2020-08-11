import Publicacion from '../models/Publicacion';
import Usuarios from '../models/Usuario';
const { QueryTypes } = require('sequelize');
import { sequelize } from '../database/database';

export async function createPublicacion( req, res ) {
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

export async function getPublicaciones( req, res ) {
    console.log(req.body);
    try {
        var publicaciones = await Publicacion.findAll({
            where:{
                visible: 0,
                eleminado: 0,
            }
        });
        res.json({
            data: publicaciones
        });
    } catch (error) {
        console.json(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    };
};

export async function getPublicacion( req, res ) {
    console.log(req.body);
    try {
        var { c_publicacion } = req.params;
        var publicacion = await Publicacion.findOne({
            where:{
                c_publicacion: c_publicacion,
                visible: 0,
                eleminado: 0,
            }
        });
        res.json({
            data: publicacion
        });
    } catch (error) {
        console.json(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    };
};

export async function getPublicacionesTopico ( req, res ) {
    console.log(req.params);
    try {
        var { topico } = req.params;

        var publicaciones = await sequelize.query(
            'SELECT * FROM publicacion WHERE c_usuario IN (SELECT c_usuario FROM usuario WHERE topico = $topico);',
            {
                bind: { topico: topico },
                type: QueryTypes.SELECT
            }
        );
        res.json({
            data:publicaciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    };
};

export async function invisiblePublicacion (req, res) {
    console.log(req.params);
    try {
        var { c_publicacion } = req.params;
        var publicacion = await Publicacion.update({
            visible: 1
        },{
            where: {
                c_publicacion: c_publicacion
            },
            returning: true,
            plain: true
        });
        res.json({
            data:publicacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    };
};

export async function deletePublicacion (req, res) {
    console.log(req.params);
    try {
        var { c_publicacion } = req.params;
        var publicacion = await Publicacion.update({
            eliminado: 1
        },{
            where: {
                c_publicacion: c_publicacion
            },
            returning: true,
            plain: true
        });
        res.json({
            data:publicacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    };
};

export async function updatePublicacion ( req, res ) {
    console.log(req.params);
    try {
        var { c_publicacion } = req.params;
        var { titulo, descripcion } = req.body;
        var publicacion = await Publicacion.update({
            titulo: titulo,
            descripcion: descripcion
        },{
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