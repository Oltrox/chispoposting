"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Seguir = _database.sequelize.define('seguir', {
  c_usuario_1: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  c_usuario_2: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  f_seguir: {
    type: DATE
  }
}, {
  timestamps: false
});

var _default = Seguir;
exports["default"] = _default;