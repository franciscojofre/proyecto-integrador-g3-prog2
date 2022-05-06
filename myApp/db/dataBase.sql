CREATE TABLE usuario (
/*			nombreColumna			tipoDato			restracciones							*/
			id_usuario				INT					UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            nombre					VARCHAR(50)			NOT NULL,
            apellido				VARCHAR(50)			NOT NULL,
            email					VARCHAR(150)		NOT NULL,                   
            contrasenia				VARCHAR(50)			NOT NULL,
            fechaNacimiento			DATE 				NOT NULL,
            numeroDocumento			INT					NOT NULL,
            fotoPerfil				VARCHAR(500)
            
);

CREATE TABLE products (
/*			nombreColumna			tipoDato			restracciones							*/
			id_product				INT					UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            title					VARCHAR(50)			NOT NULL,
            descrip					VARCHAR(50)			NOT NULL,
            comments				INT					NOT NULL,                   
            novedad					BOOLEAN				NOT NULL,
            image					VARCHAR(500)
            
);

CREATE TABLE comments (
/*			nombreColumna			tipoDato			restracciones							*/
            userName				VARCHAR(50)			NOT NULL,
            commentDescription		VARCHAR(1500)		NOT NULL,
            image					VARCHAR(500)
            
);

