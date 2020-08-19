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
    FOR EACH ROW
    EXECUTE PROCEDURE actualizar_fecha_conexion();

DROP TRIGGER IF EXISTS ultima_conexion on usuario CASCADE;

-- 2.- Actualizar la cantidad de seguidores

CREATE OR REPLACE FUNCTION actualizar_cantidad_seguidores_()
    RETURN trigger AS $cantidad_seguidores$
        BEGIN
            NEW.n_seguidores := SELECT COUNT() FROM 

CREATE TRIGGER cantidad_seguidores_usuario
    AFTER UPDATE OF estado ON usuario
    FOR 
    

CREATE TRIGGER cantidad_seguidores_seguir
    AFTER INSERT OR DELETE 

-- 3.- Actualizar la cantidad de seguidos

-- 4.- Actualizar la cantidad de publicaciones

-- 5.- Actualizar el estado en base a la membresia de eliminacion

-- TRIGGERS PUBLICACION

-- 1.- Actualizar la cantidad de likes

-- 2.- Actualizar la cantidad de dislikes

-- 3.- Actualizar la cantidad de comentarios

-- TRIGGERS COMENTARIO

-- 1.- Actualizar fecha de modificacion
-- 2.- Agregar notificacion (QUIZAS SEA NECESARIO CREAR TABLA DE NOTIFICACIONES)

-- TRIGGERS EVALUACION

-- 1.- Agregar notificacion (QUIZAS SEA NECESARIO CREAR TABLA DE NOTIFICACIONES)

-- TRIGGERS SEGUIR

-- 1.- Agregar notigicacion (QUIZAS SEA NECESARIO CREAR TABLA DE NOTIFICACIONES)

-- TRIGGERS TOPICO

-- 0.- Nada