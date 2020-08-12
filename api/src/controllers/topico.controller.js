import Topico from '../models/Topico';

export async function createTopico( req, res ){
    console.log(req.body);
    try {
        var { topico } = req.body;
        let newTopico = await Topico.create({
            topico: topico
        });
        if ( newTopico ) {
            res.json({
                message: 'Topico creado',
                data: newTopico
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

export async function getTopicos( req, res ){
    try {
        let topicos = await Topico.findAll();
        if (topicos) {
            res.json({
                message: 'Topicos',
                data: topicos
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