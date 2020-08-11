"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Publicacion = _database.sequelize.define('publicacion', {
  c_publicacion: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  c_usuario: {
    type: _sequelize["default"].INTEGER
  },
  link: {
    type: _sequelize["default"].CHAR(256)
  },
  titulo: {
    type: _sequelize["default"].CHAR(64)
  },
  descripcion: {
    type: _sequelize["default"].CHAR(400)
  },
  n_likes: {
    type: _sequelize["default"].INTEGER
  },
  n_dislikes: {
    type: _sequelize["default"].INTEGER
  },
  n_comentarios: {
    type: _sequelize["default"].INTEGER
  },
  f_creacion: {
    type: _sequelize["default"].DATE
  },
  visible: {
    type: _sequelize["default"].SMALLINT
  },
  eliminado: {
    type: _sequelize["default"].SMALLINT
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var _default = Publicacion; // Falta añadir las referencias (FOREIGN KEY)

exports["default"] = _default;