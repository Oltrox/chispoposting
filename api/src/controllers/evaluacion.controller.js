import Evaluacion from '../models/Evaluacion';

export async function createEvaluacion ( req, res ) {
    console.log("####################");
    console.log(req.body);
    try {
        var { c_usuario, c_publicacion, evalucion } = req.body;
        let evaluacion = await Evaluacion.create({
            c_usuario: c_usuario,
            c_publicacion: c_publicacion,
            evaluacion
        });

        if (evaluacion) {
            res.json({
                message: 'Evaluacion created successfully',
                data: evaluacion
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