import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Comentario = sequelize.define('comentario', {
    c_comentario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    c_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    c_publicacion: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    f_creacion: {
        type: Sequelize.DATE
    },
    f_modificacion: {
        type: Sequelize.DATE
    },
    comentario: {
        type: Sequelize.TEXT
    }
},{
    timestamps: false,
    freezeTableName: true
});


export default Comentario;