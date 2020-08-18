import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Seguir = sequelize.define('seguir', {    
    c_usuario_1: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    c_usuario_2: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    f_seguir: {
        type: Sequelize.DATE
    }
},{
    timestamps: false,
    freezeTableName: true
});

export default Seguir;