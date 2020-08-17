import Comentario from '../models/Comentario';

// 
export async function createComentario ( req, res ) {
    console.log("########################33");
    console.log(req.body);
    try {
        var { c_usuario, c_publicacion, comentario } = req.body;

        let newComentario = await Comentario.create({
            c_usuario: c_usuario,
            c_publicacion: c_publicacion,
            f_creacion: Date.now(),
            f_modificacion: Date.now(),
            comentario: comentario
        });

        if(newComentario){
            res.json({
                message: 'Comentario created successfully',
                data: newComentario
            });
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something goes wrong',
            data: {}
        });
    };
};

export async function getComentario ( req, res ) {
    console.log(req.params);
    try {
        var { c_comentario } = req.params;

        let comentario = await Comentario.findOne({
            where: {
                c_comentario: c_comentario
            }
        });

        if (comentario) {
            res.json({
                data: comentario
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

export async function getComentariosPublicacion ( req, res ) {
    console.log(req.params);
    try {
        var { c_publicacion } = req.params;
        let comentarios = await Comentario.findAll({
            where: {
                c_publicacion: c_publicacion
            }
        });
        if (comentarios) {
            res.json({
                data: comentarios
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

export async function getComentariosUsuario ( req, res ) {
    console.log(req.params);
    try {
        var { c_usuario } = req.params;
        let comentarios = await Comentario.findAll({
            where: {
                c_usuario: c_usuario
            }
        });
        if (comentarios) {
            res.json({
                data: comentarios
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

export async function getComentarios ( req, res ) {
    try {
        let comentarios = await Comentario.findAll();
        if (comentarios) {
            res.json({
                data: comentarios
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

export async function deleteComentario ( req, res ) {
    console.log(req.params);
    try {
        var { c_comentario } = req.params;
        let comentario = await Comentario.destroy({
            where: {
                c_comentario: c_comentario
            }
        });
        if (comentario) {
            res.json({
                message: 'Comentario deleted',
                data: comentario
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

export async function updateComentario ( req, res ) {
    console.log(req.body);
    console.log(req.params);
    try {
        const { c_comentario } = req.params;
        var { detalle } = req.body;

        let comentario = await Comentario.update({
            comentario: detalle
        },{
            where:{
                c_comentario: c_comentario
            }
        });

        if (comentario) {
            res.json({
                message: 'Comentario Updated Successfully'
            });
        };
    } catch (error) {
        console.log(error);
        res.json({
            message: 'Something goes wrong',
            data: {}
        });
    };
};