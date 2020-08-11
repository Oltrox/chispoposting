"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPublicacion = createPublicacion;
exports.getPublicaciones = getPublicaciones;
exports.getPublicacion = getPublicacion;

var _Publicacion = _interopRequireDefault(require("../models/Publicacion"));

var _Usuario = _interopRequireDefault(require("../models/Usuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createPublicacion(_x, _x2) {
  return _createPublicacion.apply(this, arguments);
}

function _createPublicacion() {
  _createPublicacion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, c_usuario, link, titulo, descripcion, newPublicacion;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body);
            _req$body = req.body, c_usuario = _req$body.c_usuario, link = _req$body.link, titulo = _req$body.titulo, descripcion = _req$body.descripcion;
            _context.prev = 2;
            _context.next = 5;
            return _Publicacion["default"].create({
              c_usuario: c_usuario,
              link: link,
              titulo: titulo,
              descripcion: descripcion,
              n_likes: 0,
              n_dislikes: 0,
              n_comentarios: 0,
              f_creacion: Date.now(),
              visible: 0,
              eliminado: 0
            });

          case 5:
            newPublicacion = _context.sent;

            if (newPublicacion) {
              res.json({
                message: 'Publicacion created successfully',
                data: newPublicacion
              });
            }

            ;
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Something goes wrong',
              data: {}
            });

          case 14:
            ;

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));
  return _createPublicacion.apply(this, arguments);
}

;

function getPublicaciones(_x3, _x4) {
  return _getPublicaciones.apply(this, arguments);
}

function _getPublicaciones() {
  _getPublicaciones = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var publicaciones;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(req.body);
            _context2.prev = 1;
            _context2.next = 4;
            return _Publicacion["default"].findAll();

          case 4:
            publicaciones = _context2.sent;
            res.json({
              data: publicaciones
            });
            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.json(_context2.t0);
            res.status(500).json({
              message: 'something goes wrong',
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
  return _getPublicaciones.apply(this, arguments);
}

;

function getPublicacion(_x5, _x6) {
  return _getPublicacion.apply(this, arguments);
}

function _getPublicacion() {
  _getPublicacion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var topico, usuarios, publicaciones;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log(req.params);
            _context5.prev = 1;
            topico = req.params.topico;
            _context5.next = 5;
            return _Usuario["default"].findAll({
              where: {
                topico: topico
              }
            });

          case 5:
            usuarios = _context5.sent;
            publicaciones = [];

            if (usuarios.length > 0) {
              console.log('1#########################');
              usuarios.forEach( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(usuario) {
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return _Publicacion["default"].findAll({
                            where: {
                              c_usuario: usuario.c_usuario
                            }
                          }).then( /*#__PURE__*/function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(publicacion) {
                              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                  switch (_context3.prev = _context3.next) {
                                    case 0:
                                      _context3.next = 2;
                                      return publicaciones.push(publicacion);

                                    case 2:
                                    case "end":
                                      return _context3.stop();
                                  }
                                }
                              }, _callee3);
                            }));

                            return function (_x8) {
                              return _ref2.apply(this, arguments);
                            };
                          }());

                        case 2:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                return function (_x7) {
                  return _ref.apply(this, arguments);
                };
              }());
              res.json({
                data: publicaciones
              });
              console.log(publicaciones);
            }

            ;
            _context5.next = 15;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            res.status(500).json({
              message: 'something goes wrong',
              data: {}
            });

          case 15:
            ;

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 11]]);
  }));
  return _getPublicacion.apply(this, arguments);
}

;