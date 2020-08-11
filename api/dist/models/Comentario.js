"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Comentario = _database.sequelize.define('comentario', {
  c_usuario: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  c_publicacion: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  f_creacion: {
    type: _sequelize["default"].DATE
  },
  f_modificacion: {
    type: _sequelize["default"].DATE
  },
  comentario: {
    type: _sequelize["default"].TEXT
  }
}, {
  timestamps: false
});

var _default = C_usuario;
exports["default"] = _default;