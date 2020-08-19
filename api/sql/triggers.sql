-- TRIGGERS Y PROCEDURE USUARIO

-- 1.- Actualizar fecha de la ultima conexion

CREATE OR REPLACE FUNCTION actualizar_fecha_conexion()
    RETURNS trigger AS $ultima_conexion$
        BEGIN
            NEW.f_ultimo := NOW();
            RETURN NEW;
        END;
    $ultima_conexion$
LANGUAGE plpgsql;

CREATE TRIGGER ultima_conexion
    BEFORE UPDATE OF token ON usuario
    FOR ROW
    EXECUTE PROCEDURE actualizar_fecha_conexion();

DROP TRIGGER IF EXISTS ultima_conexion on usuario CASCADE;

-- 2.- Actualizar la cantidad de seguidores y seguidos

-- 2.1.- Para la tabla usuario

CREATE OR REPLACE FUNCTION actualizar_cantidad_seguidores_usuario()
    RETURNS trigger AS $cantidad_seguidores_usuario$
        BEGIN
            IF (NEW.estado = 1) THEN
                DELETE FROM seguir WHERE c_usuario_1 = OLD.c_usuario;
            END IF;
            RETURN NULL;
        END;
    $cantidad_seguidores_usuario$
LANGUAGE plpgsql;

CREATE TRIGGER cantidad_seguidores_usuario
    AFTER UPDATE OF estado ON usuario
    FOR ROW
    EXECUTE PROCEDURE actualizar_cantidad_seguidores_usuario();

-- 2.2.- Para insertar en la tabla seguir

CREATE OR REPLACE FUNCTION actualizar_cantidad_seguidores_seguir_insertar()
    RETURNS trigger AS $cantidad_seguidores_seguir_insertar$
        BEGIN
            UPDATE usuario SET n_seguidores = (SELECT COUNT(*) FROM seguir WHERE c_usuario_2 = NEW.c_usuario_2) WHERE c_usuario = NEW.c_usuario_2;
            UPDATE usuario SET n_seguidos = (SELECT COUNT(*) FROM seguir WHERE c_usuario_1 = NEW.c_usuario_1) WHERE c_usuario = NEW.c_usuario_1;
            RETURN NULL;
        END;
    $cantidad_seguidores_seguir_insertar$
LANGUAGE plpgsql;

CREATE TRIGGER cantidad_seguidores_seguir_insertar
    AFTER INSERT ON seguir
    FOR EACH ROW
    EXECUTE PROCEDURE actualizar_cantidad_seguidores_seguir_insertar();

-- 2.3.- Para eliminar en la tabla seguir

CREATE OR REPLACE FUNCTION actualizar_cantidad_seguidores_seguir_eliminar()
    RETURNS trigger AS $cantidad_seguidores_seguir_eliminar$
        BEGIN
            UPDATE usuario SET n_seguidores = (SELECT COUNT(*) FROM seguir WHERE c_usuario_2 = OLD.c_usuario_2) WHERE c_usuario = OLD.c_usuario_2;
            UPDATE usuario SET n_seguidos = (SELECT COUNT(*) FROM seguir WHERE c_usuario_1 = OLD.c_usuario_1) WHERE c_usuario = OLD.c_usuario_1;
            RETURN NULL;
        END;
    $cantidad_seguidores_seguir_eliminar$
LANGUAGE plpgsql;

CREATE TRIGGER cantidad_seguidores_seguir_eliminar
    AFTER DELETE ON seguir
    FOR EACH ROW
    EXECUTE PROCEDURE actualizar_cantidad_seguidores_seguir_eliminar();

-- 4.- Actualizar la cantidad de publicaciones

-- 4.1.- Para insertar en la tabla publicacion

CREATE OR REPLACE FUNCTION actualizar_cantidad_publicaciones_insertar()
    RETURNS trigger AS $cantidad_publicaciones_insertar$
        BEGIN
            UPDATE usuario SET n_publicaciones = (SELECT COUNT(*) FROM publicacion where (c_usuario = NEW.c_usuario AND eliminado = 0)) where c_usuario = NEW.c_usuario;
            RETURN NULL;
        END;
    $cantidad_publicaciones_insertar$
LANGUAGE plpgsql;

CREATE TRIGGER cantidad_publicaciones_insertar
    AFTER INSERT ON publicacion
    FOR EACH ROW
    EXECUTE PROCEDURE actualizar_cantidad_publicaciones_insertar();

-- 4.2.- Para eliminar en la tabla publicacion

CREATE OR REPLACE FUNCTION actualizar_cantidad_publicaciones_eliminar()
    RETURNS trigger AS $cantidad_publicaciones_eliminar$
        BEGIN
            UPDATE usuario SET n_publicaciones = (SELECT COUNT(*) FROM publicacion WHERE (c_usuario = NEW.c_usuario AND eliminado = 0)) WHERE c_usuario = NEW.c_usuario;
            RETURN NULL;
        END;
    $cantidad_publicaciones_eliminar$
LANGUAGE plpgsql;

CREATE TRIGGER cantidad_publicaciones_eliminar
    AFTER UPDATE ON publicacion
    FOR EACH ROW
    EXECUTE PROCEDURE actualizar_cantidad_publicaciones_eliminar();

-- TRIGGERS PUBLICACION

-- 1.- Actualizar la cantidad de likes y dislikes insertados

CREATE OR REPLACE FUNCTION actualizar_cantidad_evaluaciones_publicacion()
    RETURNS trigger AS $cantidad_evaluaciones_publicacion$
        BEGIN
            UPDATE publicacion SET n_likes = (SELECT COUNT(*) FROM evaluacion WHERE (c_publicacion = NEW.c_publicacion AND evaluacion = 1)) where c_publicacion = NEW.c_publicacion;
            UPDATE publicacion SET n_dislikes = (SELECT COUNT(*) FROM evaluacion WHERE (c_publicacion = NEW.c_publicacion AND evaluacion = -1)) where c_publicacion = NEW.c_publicacion;
            RETURN NULL;
        END;
    $cantidad_evaluaciones_publicacion$
LANGUAGE plpgsql;

CREATE TRIGGER cantidad_evaluaciones_publicacion
    AFTER INSERT ON evaluacion
    FOR ROW
    EXECUTE PROCEDURE actualizar_cantidad_evaluaciones_publicacion();

-- 2.- Actualizar la cantidad de likes y dislikes modificados

CREATE OR REPLACE FUNCTION actualizar_cantidad_evaluaciones_publicacion_update()
    RETURNS trigger AS $cantidad_evaluaciones_publicacion_update$
        BEGIN
            UPDATE publicacion SET n_likes = (SELECT COUNT(*) FROM evaluacion WHERE (c_publicacion = NEW.c_publicacion AND evaluacion = 1)) where c_publicacion = NEW.c_publicacion;
            UPDATE publicacion SET n_dislikes = (SELECT COUNT(*) FROM evaluacion WHERE (c_publicacion = NEW.c_publicacion AND evaluacion = -1)) where c_publicacion = NEW.c_publicacion;
            RETURN NULL;
        END;
    $cantidad_evaluaciones_publicacion_update$
LANGUAGE plpgsql;

CREATE TRIGGER cantidad_evaluaciones_publicacion_update
    AFTER UPDATE ON evaluacion
    FOR ROW
    EXECUTE PROCEDURE actualizar_cantidad_evaluaciones_publicacion_update();

-- 3.- Actualizar la cantidad de likes y dislikes eliminados

CREATE OR REPLACE FUNCTION actualizar_cantidad_evaluaciones_publicacion_delete()
    RETURNS trigger AS $cantidad_evaluaciones_publicacion_delete$
        BEGIN
            UPDATE publicacion SET n_likes = (SELECT COUNT(*) FROM evaluacion WHERE (c_publicacion = OLD.c_publicacion AND evaluacion = 1)) where c_publicacion = OLD.c_publicacion;
            UPDATE publicacion SET n_dislikes = (SELECT COUNT(*) FROM evaluacion WHERE (c_publicacion = OLD.c_publicacion AND evaluacion = -1)) where c_publicacion = OLD.c_publicacion;
            RETURN NULL;
        END;
    $cantidad_evaluaciones_publicacion_delete$
LANGUAGE plpgsql;

CREATE TRIGGER cantidad_evaluaciones_publicacion_delete
    AFTER DELETE ON evaluacion
    FOR ROW
    EXECUTE PROCEDURE actualizar_cantidad_evaluaciones_publicacion_delete();

-- 3.- Actualizar la cantidad de comentarios

-- 3.1.- Actualizar la cantidad de comentarios insertados en una publicacion
CREATE OR REPLACE FUNCTION actualizar_cantidad_comentarios_publicacion_insert()
    RETURNS trigger AS $cantidad_comentarios_publicacion_insert$
        BEGIN
            UPDATE publicacion SET n_comentarios = (SELECT COUNT(*) FROM comentario WHERE c_publicacion = NEW.c_publicacion) where c_publicacion = NEW.c_publicacion;
            RETURN NULL;
        END;
    $cantidad_comentarios_publicacion_insert$
LANGUAGE plpgsql;

CREATE TRIGGER cantidad_comentarios_publicacion_insert
    AFTER INSERT ON comentario
    FOR ROW
    EXECUTE PROCEDURE actualizar_cantidad_comentarios_publicacion_insert();

-- 3.2.- Actualizar la cantidad de comentarios eliminados en una publicacion

CREATE OR REPLACE FUNCTION actualizar_cantidad_comentarios_publicacion_delete()
    RETURNS trigger AS $cantidad_comentarios_publicacion_delete$
        BEGIN
            UPDATE publicacion SET n_comentarios = (SELECT COUNT(*) FROM comentario WHERE c_publicacion = OLD.c_publicacion) WHERE c_publicacion = OLD.c_publicacion;
            RETURN NULL;
        END;
    $cantidad_comentarios_publicacion_delete$
LANGUAGE plpgsql;

CREATE TRIGGER cantidad_comentarios_publicacion_delete
    AFTER DELETE ON comentario
    FOR ROW
    EXECUTE PROCEDURE actualizar_cantidad_comentarios_publicacion_delete();

-- TRIGGERS COMENTARIO

-- 1.- Actualizar fecha de modificacion
-- 2.- Agregar notificacion (QUIZAS SEA NECESARIO CREAR TABLA DE NOTIFICACIONES)

-- TRIGGERS EVALUACION

-- 1.- Agregar notificacion (QUIZAS SEA NECESARIO CREAR TABLA DE NOTIFICACIONES)

-- TRIGGERS SEGUIR

-- 1.- Agregar notigicacion (QUIZAS SEA NECESARIO CREAR TABLA DE NOTIFICACIONES)

-- TRIGGERS TOPICO

-- 0.- Nada