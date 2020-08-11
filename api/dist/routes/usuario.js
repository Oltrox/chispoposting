"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _usuario = require("../controllers/usuario.controller");

var router = (0, _express.Router)();
// /api/usuario/...
router.post('/', _usuario.createUsuario);
router.get('/', _usuario.getUsuarios);
router.get('/:id', _usuario.getUsuario);
router["delete"]('/:id', _usuario.deleteUsuario);
router.put('/:id_usuario', _usuario.updateUsuario);
router.post('/login/', _usuario.testlogin);
var _default = router;
exports["default"] = _default;