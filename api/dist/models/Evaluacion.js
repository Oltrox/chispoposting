"use strict";

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Evaluacion = _database.sequelize.define('evaluacion', {
  c_usuario: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  c_publicacion: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  evaluacion: {
    type: _sequelize["default"].SMALLINT
  }
}, {
  timestamps: false
});