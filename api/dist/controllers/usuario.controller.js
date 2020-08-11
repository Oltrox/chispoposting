"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUsuario = createUsuario;
exports.getUsuarios = getUsuarios;
exports.getUsuario = getUsuario;
exports.deleteUsuario = deleteUsuario;
exports.updateUsuario = updateUsuario;
exports.testlogin = testlogin;

var _Usuario = _interopRequireDefault(require("../models/Usuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createUsuario(_x, _x2) {
  return _createUsuario.apply(this, arguments);
}

function _createUsuario() {
  _createUsuario = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, id, password, correo, topico, f_nacimiento, newUsuario;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body);
            _req$body = req.body, id = _req$body.id, password = _req$body.password, correo = _req$body.correo, topico = _req$body.topico, f_nacimiento = _req$body.f_nacimiento;
            _context.prev = 2;
            _context.next = 5;
            return _Usuario["default"].create({
              id: id,
              password: password,
              l_foto: 'foto',
              correo: correo,
              tipo: '0',
              descripcion: 'descripcion',
              topico: topico,
              f_nacimiento: f_nacimiento,
              f_ultimo: Date.now(),
              f_creacion: Date.now(),
              n_seguidores: 0,
              n_seguidos: 0,
              n_publicaciones: 0,
              m_castigo: 0,
              m_elimicacion: 0,
              estado: 0
            });

          case 5:
            newUsuario = _context.sent;

            if (newUsuario) {
              res.json({
                message: 'Usuario created successfully',
                data: newUsuario
              });
            }

            ;
            _context.next = 15;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);

            //añadir error por usuario unico
            if (_context.t0.errors[0].type == "unique violation") {
              res.status(200).json({
                message: 'ID used',
                data: {}
              });
            }

            ;
            res.status(500).json({
              message: 'Something goes wrong',
              data: {}
            });

          case 15:
            ;

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));
  return _createUsuario.apply(this, arguments);
}

;

function getUsuarios(_x3, _x4) {
  return _getUsuarios.apply(this, arguments);
}

function _getUsuarios() {
  _getUsuarios = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var usuarios;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(req.body);
            _context2.prev = 1;
            _context2.next = 4;
            return _Usuario["default"].findAll();

          case 4:
            usuarios = _context2.sent;
            res.json({
              data: usuarios
            });
            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.status(500).json({
              message: 'Something goes wrong',
              data: {}
            });

          case 12:
            ;

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return _getUsuarios.apply(this, arguments);
}

; // Falta agregar busqueda por relacion en la id
// Falta arreglar la busqueda por minusculas y mayusculas

function getUsuario(_x5, _x6) {
  return _getUsuario.apply(this, arguments);
}

function _getUsuario() {
  _getUsuario = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, usuario;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(req.body);
            _context3.prev = 1;
            id = req.params.id;
            _context3.next = 5;
            return _Usuario["default"].findOne({
              where: {
                id: id
              }
            });

          case 5:
            usuario = _context3.sent;
            res.json({
              data: usuario
            });
            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            res.status(500).json({
              message: 'Something goes wrong',
              data: {}
            });

          case 13:
            ;

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));
  return _getUsuario.apply(this, arguments);
}

; //pasar de eliminar a modificar el estado del usuario
// Actualizar base de datos para añadir estado 0: no eliminado - 1: eliminado

function deleteUsuario(_x7, _x8) {
  return _deleteUsuario.apply(this, arguments);
}

function _deleteUsuario() {
  _deleteUsuario = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, usuario;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(req.body);
            _context4.prev = 1;
            id = req.params.id;
            _context4.next = 5;
            return _Usuario["default"].destroy({
              where: {
                id: id
              }
            });

          case 5:
            usuario = _context4.sent;
            res.json({
              data: usuario
            });
            _context4.next = 13;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.status(500).json({
              message: 'Something goes wrong',
              data: {}
            });

          case 13:
            ;

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));
  return _deleteUsuario.apply(this, arguments);
}

;

function updateUsuario(_x9, _x10) {
  return _updateUsuario.apply(this, arguments);
}

function _updateUsuario() {
  _updateUsuario = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id_usuario, _req$body2, id, password, correo, topico, f_nacimiento, usuario;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log(req.body);
            console.log(req.params);
            _context5.prev = 2;
            id_usuario = req.params.id_usuario;
            _req$body2 = req.body, id = _req$body2.id, password = _req$body2.password, correo = _req$body2.correo, topico = _req$body2.topico, f_nacimiento = _req$body2.f_nacimiento;
            _context5.next = 7;
            return _Usuario["default"].update({
              id: id,
              password: password
            }, {
              where: {
                id: id_usuario
              },
              returning: true,
              plain: true
            });

          case 7:
            usuario = _context5.sent;
            res.json({
              message: 'User Updated Successfully',
              data: usuario
            });
            _context5.next = 15;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](2);
            console.log(_context5.t0);
            res.status(500).json({
              message: 'Something goes wrong',
              data: {}
            });

          case 15:
            ;

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 11]]);
  }));
  return _updateUsuario.apply(this, arguments);
}

;

function testlogin(_x11, _x12) {
  return _testlogin.apply(this, arguments);
}

function _testlogin() {
  _testlogin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log(req.body);
            res.json({
              message: 'ok'
            });

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _testlogin.apply(this, arguments);
}

;