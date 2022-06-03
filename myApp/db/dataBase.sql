CREATE SCHEMA dataBaseut;

USE dataBaseut;

CREATE TABLE usuario (
/*			nombreColumna			tipoDato			restricciones							*/
			id						INT					UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            nombre					VARCHAR(50)			NOT NULL,
            apellido				VARCHAR(50)			NOT NULL,
            email					VARCHAR(150)		NOT NULL,
            username				VARCHAR(50)			NOT NULL,
            contrasenia				VARCHAR(50)			NOT NULL,
            fechaNacimiento			DATE 				NOT NULL,
            numeroDocumento			INT					NOT NULL,
            fotoPerfil				VARCHAR(1000)
            
);

CREATE TABLE products (
/*			nombreColumna			tipoDato			restricciones							*/
			id						INT					UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            title					VARCHAR(50)			NOT NULL,
            descrip					VARCHAR(1000)		NOT NULL,
            comments				INT					NOT NULL,                   
            novedad					BOOLEAN				NOT NULL,
            image					VARCHAR(1000),
            user_id					INT 				UNSIGNED,
FOREIGN KEY (user_id) REFERENCES usuario(id)
);

CREATE TABLE comments (
/*			nombreColumna			tipoDato			restricciones							*/
			id						INT					UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            userName				VARCHAR(50)			NOT NULL,
            user_id 				INT                 UNSIGNED,
            product_id				INT                 UNSIGNED,
            commentDescription		VARCHAR(1500)		NOT NULL,
            image					VARCHAR(1000),
FOREIGN KEY (user_id) REFERENCES usuario(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE followers (
/*			nombreColumna			tipoDato			restricciones							*/
			id						INT					UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            user_id_seguidor 		INT                 UNSIGNED NOT NULL,
            user_id_seguido			INT                 UNSIGNED NOT NULL,

            
FOREIGN KEY (user_id_seguidor) REFERENCES usuario(id),
FOREIGN KEY (user_id_seguido) REFERENCES usuario(id)
);
