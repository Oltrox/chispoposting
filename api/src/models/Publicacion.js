import Sequelize, { INET } from 'sequelize';
import { sequelize } from '../database/database';
import Usuario from './Usuario';

const Publicacion = sequelize.define('publicacion', {
    c_publicacion: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    c_usuario: {
        type: Sequelize.INTEGER
    },
    link: {
        type: Sequelize.CHAR(256)
    },
    titulo: {
        type: Sequelize.CHAR(64)
    },
    descripcion: {
        type: Sequelize.CHAR(400)
    },
    n_likes: {
        type: Sequelize.INTEGER
    },
    n_dislikes: {
        type: Sequelize.INTEGER
    },
    n_comentarios: {
        type: Sequelize.INTEGER
    },
    f_creacion: {
        type: Sequelize.DATE
    },
    visible: {
        type: Sequelize.SMALLINT
    },
    eliminado: {
        type: Sequelize.SMALLINT
    }
},{
    timestamps: false
});

export default Publicacion;

// Falta añadir las referencias (FOREIGN KEY)