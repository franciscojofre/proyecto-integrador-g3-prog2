USE catalogo;

CREATE TABLE usuario (
/*			nombreColumna			tipoDato			restracciones							*/
			id_usuario				INT					UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            nombre					VARCHAR(50)			NOT NULL,
            apellido				VARCHAR(50)			NOT NULL,
            email					VARCHAR(150)		NOT NULL,
            username				VARCHAR(50)			NOT NULL,
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
			id_comment				INT					UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            userName				VARCHAR(50)			NOT NULL,
            user_id 				INT,
            product_id				INT,
            commentDescription		VARCHAR(1500)		NOT NULL,
            image					VARCHAR(500),
            
            FOREIGN KEY (user_id) REFERENCES usuario(id_usuario),
			FOREIGN KEY (product_id) REFERENCES products(id_product)
);

CREATE TABLE user_follow (
/*			nombreColumna			tipoDato			restracciones							*/
			id_user_follow			INT					UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            user1_id 				INT,
            user2_id				INT,

            
            FOREIGN KEY (user1_id) REFERENCES usuario(id_usuario),
			FOREIGN KEY (user2_id) REFERENCES usuario(id_usuario)
);

