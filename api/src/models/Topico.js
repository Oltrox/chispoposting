import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Topico =sequelize.define('topico', {
    c_topico: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    topico:{
        type: Sequelize.SMALLINT
    }
},{
    timestamps: false,
    freezeTableName: true
});

export default Topico;