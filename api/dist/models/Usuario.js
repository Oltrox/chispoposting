"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Usuario = _database.sequelize.define('usuario', {
  c_usuario: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id: {
    type: _sequelize["default"].CHAR(12),
    unique: true
  },
  password: {
    type: _sequelize["default"].CHAR(64)
  },
  l_foto: {
    type: _sequelize["default"].CHAR(256)
  },
  correo: {
    type: _sequelize["default"].CHAR(76)
  },
  tipo: {
    type: _sequelize["default"].SMALLINT
  },
  descripcion: {
    type: _sequelize["default"].CHAR(400)
  },
  topico: {
    type: _sequelize["default"].CHAR(16)
  },
  f_nacimiento: {
    type: _sequelize["default"].DATE
  },
  f_ultimo: {
    type: _sequelize["default"].DATE
  },
  f_creacion: {
    type: _sequelize["default"].DATE
  },
  n_seguidores: {
    type: _sequelize["default"].INTEGER
  },
  n_seguidos: {
    type: _sequelize["default"].INTEGER
  },
  n_publicaciones: {
    type: _sequelize["default"].INTEGER
  },
  m_castigo: {
    type: _sequelize["default"].SMALLINT
  },
  m_elimicacion: {
    type: _sequelize["default"].SMALLINT
  },
  estado: {
    type: _sequelize["default"].SMALLINT
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var _default = Usuario;
exports["default"] = _default;