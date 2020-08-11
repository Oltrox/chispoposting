import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Usuario = sequelize.define('usuario', {
    c_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id: {
        type: Sequelize.CHAR(12),
        unique: true
    },
    password: {
        type: Sequelize.CHAR(64)
    },
    l_foto: {
        type: Sequelize.CHAR(256)
    },
    correo: {
        type: Sequelize.CHAR(76)
    },
    tipo: {
        type: Sequelize.SMALLINT
    },
    descripcion: {
        type: Sequelize.CHAR(400)
    },
    topico: {
        type: Sequelize.CHAR(16)
    },
    f_nacimiento: {
        type: Sequelize.DATE
    },
    f_ultimo: {
        type: Sequelize.DATE
    },
    f_creacion: {
        type: Sequelize.DATE
    },
    n_seguidores: {
        type: Sequelize.INTEGER
    },
    n_seguidos: {
        type: Sequelize.INTEGER
    },
    n_publicaciones: {
        type: Sequelize.INTEGER
    },
    m_castigo: {
        type: Sequelize.SMALLINT
    },
    m_elimicacion: {
        type: Sequelize.SMALLINT
    },
    estado: {
        type: Sequelize.SMALLINT
    }
},{
    timestamps: false,
    freezeTableName: true
});

export default Usuario;