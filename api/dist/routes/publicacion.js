"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _publicacion = require("../controllers/publicacion.controller");

var router = (0, _express.Router)();
// /api/publicacion/...
router.post('/', _publicacion.createPublicacion);
router.get('/', _publicacion.getPublicaciones);
router.get('/:topico', _publicacion.getPublicacion);
var _default = router;
exports["default"] = _default;