import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Evaluacion = sequelize.define('evaluacion', {
    c_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    c_publicacion: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    evaluacion: {
        type: Sequelize.SMALLINT
    }
},{
    timestamps: false,
    freezeTableName: true
});

export default Evaluacion;