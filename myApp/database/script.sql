CREATE SCHEMA dataBaseut;

USE dataBaseut;

CREATE TABLE users (
/*          nombreColumna           tipoDato            restricciones                           */
            id                      INT                 UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            nombre                  VARCHAR(50)         NOT NULL,
            apellido                VARCHAR(50)         NOT NULL,
            email                   VARCHAR(150)        NOT NULL,
            contrasenia             VARCHAR(200)        NOT NULL,
            fecha_nacimiento        DATE                NOT NULL,
            numero_documento        INT                 NOT NULL,
            foto_perfil             VARCHAR(1000)       NOT NULL,
            created_at              TIMESTAMP           NULL,
            updated_at              TIMESTAMP           NULL
);

CREATE TABLE products (
/*          nombreColumna           tipoDato            restricciones                           */
            id                      INT                 UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            title                   VARCHAR(50)         NOT NULL,
            descrip                 VARCHAR(1000)       NOT NULL,
            image                   VARCHAR(1000),
            user_id                 INT                 UNSIGNED,
            createdAt               TIMESTAMP            NOT NULL,
            updatedAt               TIMESTAMP            NULL,
            deletedAt               TIMESTAMP            NULL,
FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments (
/*          nombreColumna           tipoDato            restricciones                           */
            id                      INT                 UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            user_id                 INT                 UNSIGNED,
            product_id              INT                 UNSIGNED,
            comment_description     VARCHAR(1500)       NOT NULL,
            created_at              DATETIME            NOT NULL,
            updated_at              DATE                NULL,
            deleted_at              DATETIME            NULL,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE followers (
/*			nombreColumna			tipoDato			restricciones							*/
			id						INT					UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            user_id_follower 		INT                 UNSIGNED NOT NULL,
            user_id_following	    INT                 UNSIGNED NOT NULL,
            createdAt               TIMESTAMP            NOT NULL,
            updatedAt               TIMESTAMP            NULL,
            deletedAt               TIMESTAMP            NULL,     
FOREIGN KEY (user_id_follower) REFERENCES users(id),
FOREIGN KEY (user_id_following) REFERENCES users(id)
);


-- INSERCION DATOS DE USUARIOS --
INSERT INTO `users` (`id`,`nombre`,`apellido`,`email`,`contrasenia`,`fecha_nacimiento`,`numero_documento`,`foto_perfil`,`created_at`,`updated_at`) VALUES (1,'Walter','White','walterw@gmail.com','$2a$10$0gG2E1.3EAe8vvCF.HtcQOI63AqHFKW.enB.5s6NlOkoG3dKYz7Ea','1973-02-12',24560275,'foto_perfil-1655933146994.jpg','2022-06-22 15:34:39', NULL);
INSERT INTO `users` (`id`,`nombre`,`apellido`,`email`,`contrasenia`,`fecha_nacimiento`,`numero_documento`,`foto_perfil`,`created_at`,`updated_at`) VALUES (2,'Valeria','Mercado','valemer@hotmail.com','$2a$10$6.896GScPl58gC7Bx7xjEe8/SmT8kAGkgKVfaalYqHoqVxc5gdsAu','1990-06-25',34660798,'foto_perfil-1655923071499.jpg','2022-06-22 15:37:51',NULL);
INSERT INTO `users` (`id`,`nombre`,`apellido`,`email`,`contrasenia`,`fecha_nacimiento`,`numero_documento`,`foto_perfil`,`created_at`,`updated_at`) VALUES (3,'Constanza','??lvarez','conialvarez@yahoo.com','$2a$10$fwhWi90CDQbvkhKi9QVQXu8hvM3qRr1OvPdLmBvhhKaQfvDoFFUQC','2002-12-17',44987543,'foto_perfil-1655923140272.jpg','2022-06-22 15:39:00',NULL);

-- INSERCION DATOS DE PRODUCTOS --
INSERT INTO `products` (`id`,`title`,`descrip`,`image`,`user_id`,`createdAt`,`updatedAt`,`deletedAt`) VALUES (1,'Mouse Logitech G502 Lightspeed Wireless','Ahora puedes jugar con m??s rapidez y precisi??n con G502 LIGHTSPEED, dotado de conectividad inal??mbrica superr??pida de 1 ms. Un sensor HERO de pr??xima generaci??n ofrece rendimiento de 16.000 dpi y eficiencia energ??tica superiores, d??ndote hasta 60 horas de juego ininterrumpido. Once botones programables te ayudan a optimizar el juego con enlaces de teclas y macros personalizadas. Los botones principales tienen tensi??n de resorte met??lico para una actuaci??n r??pida y precisa. Seis pesas personalizables te permiten configurar la sensaci??n del rat??n en la mano. RGB LIGHTSYNC proporciona ~16,8 millones de colores para crear un entorno de juego emocionante e inmersivo. El bot??n rueda para desplazamiento superr??pido permite recorrer a toda velocidad men??s y documentos largos. Empareja con POWERPLAY para disponer de carga infinita.','imgProduct-1655923352956.jpg',1,'2022-06-22 15:42:32','2022-06-22 15:42:32',NULL);
INSERT INTO `products` (`id`,`title`,`descrip`,`image`,`user_id`,`createdAt`,`updatedAt`,`deletedAt`) VALUES (2,'Teclado HP HyperX Alloy CORE RGB LA','Este teclado HyperX de alto rendimiento permite que puedas disfrutar de horas ilimitadas de juegos. Est?? dise??ado especialmente para que puedas expresar tanto tus habilidades como tu estilo. Podr??s mejorar tu experiencia de gaming, ya seas un aficionado o todo un experto y hacer que tus jugadas alcancen otro nivel.  Distinci??n a todo color Su retroiluminaci??n le da un toque diferente a tu equipo y resalta su composici??n cuando es utilizado en espacios poco iluminados.  Tecnolog??a antighosting Este dispositivo tiene teclas antighosting. Esta cualidad es indispensable si requer??s de un uso intensivo del perif??rico. Gracias a esto podr??s evitar fallas al tocar varias teclas al mismo tiempo.','imgProduct-1655923990688.jpg',1,'2022-06-22 16:59:33','2022-06-22 15:53:10','2022-06-22 16:59:33');
INSERT INTO `products` (`id`,`title`,`descrip`,`image`,`user_id`,`createdAt`,`updatedAt`,`deletedAt`) VALUES (3,'Auriculares ASUS ROG Theta 7.1 USB-C Aura Sync RGB','La presentaci??n del Asus Rog Theta 7.1 llega en una caja tipo cofre con una cubierta exterior con formato de estuche. En ella nos recibe de inmediato el logo de Asus junto con la imagen y nombre del modelo. En la zona derecha de la portada es donde apreciamos un conjunto de sellos y certificados:  Premio IF Design Award 2019 Certificado Teamspeak Certificado Discord Audio Hi-Res Sonido envolvente 7.1 con ocho altavoces asus essence y subwoofers virtuales para sumergirte en los juegos con graves potentes El micr??fono con cancelaci??n de ruido por ia ofrece una comunicaciones claras mientras juegas Los cuatro amplificadores ess 9601 y el dac 7.1 personalizado por rog producen sonido sin p??rdidas El conector usb-c permite conectarloa a ordenadores pc, mac, consolas ps4 y nintendo switch y dispositivos inteligentes Las almohadillas rog hybrid ear especiales se enfr??an r??pidamente y cuentan con unos canales blandos que reducen la presi??n sobre las gafas Consultar el precio del producto antes','imgProduct-1655924087715.jpg',1,'2022-06-22 15:54:47','2022-06-22 15:54:47',NULL);
INSERT INTO `products` (`id`,`title`,`descrip`,`image`,`user_id`,`createdAt`,`updatedAt`,`deletedAt`) VALUES (4,'Auriculares Logitech G935 LightSync Inalambrico 7 ','??Experiment?? la adrenalina de sumergirte en la escena de otra manera! Tener auriculares espec??ficos para jugar cambia completamente tu experiencia en cada partida. Con los Logitech G935 no te perd??s ning??n detalle y escuch??s el audio tal y como fue dise??ado por los creadores.\r\n\r\nEl formato perfecto para vos\r\nEl dise??o over-ear brinda una comodidad insuperable gracias a sus suaves almohadillas. Al mismo tiempo, su sonido envolvente del m??s alto nivel se convierte en el protagonista de la escena.','imgProduct-1655926463149.jpg',2,'2022-06-22 16:34:23','2022-06-22 16:34:23',NULL);
INSERT INTO `products` (`id`,`title`,`descrip`,`image`,`user_id`,`createdAt`,`updatedAt`,`deletedAt`) VALUES (5,'Teclado ASUS TUF GAMING K3 Aura Sync RGB','Teclado ASUS TUF Gaming K5 RGB con teclas de sensaci??n mec??nica, revestimiento especializado para mayor durabilidad, resistencia a derrames e iluminaci??n Aura Sync. Teclas de sensaci??n mec??nica, 24 key-rollover para un mayor rendimiento. Validado para uso rudo, con un recubrimiento especializado para mayor durabilidad y resistencia a los derrames. Cinco zonas de iluminaci??n ASUS Aura Sync RGB personalizables individualmente con sincronizaci??n entre dispositivos. Teclas multimedia dedicadas en la parte superior izquierda para ajustes instant??neos de volumen sin interrumpir tu juego. Reposamu??ecas ergon??mico integrado y ajuste de ??ngulo de dos niveles para una comodidad ??ptima. Teclas totalmente programables con grabaci??n de macros sobre la marcha y memoria integrada para un juego personalizado. Armory II, utilidad con controles extensos y una interfaz de usuario intuitiva para f??ciles configuraciones.','imgProduct-1655927205700.jpg',2,'2022-06-22 16:46:45','2022-06-22 16:46:45',NULL);
INSERT INTO `products` (`id`,`title`,`descrip`,`image`,`user_id`,`createdAt`,`updatedAt`,`deletedAt`) VALUES (6,'Mouse ASUS ROG Gladius II Origin PNK ','Para trabajar desde casa con la computadora o aprovechar los momentos de ocio, necesit??s comodidad y facilidad de movimiento. Con tu Asus ROG Gladius II Origin encontr?? eso que busc??s en un solo aparato con la mejor tecnolog??a.\r\n\r\nAdaptado a tus movimientos\r\nEl mouse de juego te ofrecer?? la posibilidad de marcar la diferencia y sacar ventajas en tus partidas. Su conectividad y sensor suave ayudar?? a que te desplaces r??pido por la pantalla.\r\n\r\nLa funcionalidad al alcance de tu mano\r\nEl sistema de detecci??n de movimiento ??ptico te permitir?? mover el cursor de una manera m??s precisa y sensible que en los sistemas tradicionales.\r\n\r\nRapidez y confiabilidad de los botones\r\nCon sus 6 botones podr??s tener mayor control e independencia para ejecutar.\r\n\r\nApto para f??cil traslado\r\nNaveg?? r??pidamente por documentos y p??ginas web gracias su dise??o ultra delgado, ergon??mico, liviano y conveniente para llevar a donde quieras o viajar.','imgProduct-1655927460097.jpg',2,'2022-06-22 16:51:00','2022-06-22 16:51:00',NULL);
INSERT INTO `products` (`id`,`title`,`descrip`,`image`,`user_id`,`createdAt`,`updatedAt`,`deletedAt`) VALUES (7,'Mouse Logitech G PRO X Superlight Pink   ','Logitech dise??a productos y experiencias que ocupan un lugar cotidiano en la vida de las personas, poniendo foco en la innovaci??n y la calidad. Su objetivo es crear momentos verdaderamente ??nicos y significativos para sus usuarios. Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. Sin necesidad de mover el brazo para deslizar el cursor, tu mano se fatigar?? menos. Son ideales para cualquier espacio de trabajo y quienes tienen la mesa llena de diversos objetos.\r\n\r\nAdaptado a tus movimientos\r\nEl mouse de juego te ofrecer?? la posibilidad de marcar la diferencia y sacar ventajas en tus partidas. Su conectividad y sensor suave ayudar?? a que te desplaces r??pido por la pantalla.\r\n\r\nRapidez y confiabilidad de los botones\r\nCon sus 5 botones podr??s tener mayor control e independencia para ejecutar.\r\n\r\nPlug And Play\r\nSolo deb??s colocar el receptor en un puerto USB de la computadora y ya pod??s empezar a usarlo. No hace falta emparejar el mouse ni descargar','imgProduct-1655927652938.jpg',3,'2022-06-22 16:54:28','2022-06-22 16:54:28',NULL);
INSERT INTO `products` (`id`,`title`,`descrip`,`image`,`user_id`,`createdAt`,`updatedAt`,`deletedAt`) VALUES (8,'Teclado gamer Redragon Kumara K552 QWERTY','La gran calidad del Redragon Kumara K552, y su precio econ??mico lo vuelven un atractivo ideal para que te diviertas frente a la pantalla. Su ergonom??a, su base antidelizante y su r??pido tiempo de respuesta permite que tus juegos favoritos se sientan m??s cerca que nunca, al alcance de tus manos.\r\n\r\nDistinci??n a todo color\r\nSu retroiluminaci??n le da un toque diferente a tu equipo y resalta su composici??n cuando es utilizado en espacios poco iluminados.\r\n\r\nTecnolog??a antighosting\r\nEste dispositivo tiene teclas antighosting. Esta cualidad es indispensable si requer??s de un uso intensivo del perif??rico. Gracias a esto podr??s evitar fallas al tocar varias teclas al mismo tiempo.','imgProduct-1655927810074.png',3,'2022-06-22 17:27:44','2022-06-22 17:27:44',NULL);
INSERT INTO `products` (`id`,`title`,`descrip`,`image`,`user_id`,`createdAt`,`updatedAt`,`deletedAt`) VALUES (9,'Auriculares gamer Redragon Zeus X ','??Experiment?? la adrenalina de sumergirte en la escena de otra manera! Tener auriculares espec??ficos para jugar cambia completamente tu experiencia en cada partida. Con los Redragon Zeus X no te perd??s ning??n detalle y escuch??s el audio tal y como fue dise??ado por los creadores.\r\n\r\nEl formato perfecto para vos\r\nEl dise??o over-ear brinda una comodidad insuperable gracias a sus suaves almohadillas. Al mismo tiempo, su sonido envolvente del m??s alto nivel se convierte en el protagonista de la escena.','imgProduct-1655927929633.png',3,'2022-06-22 17:27:30','2022-06-22 17:27:30',NULL);

-- INSERCION DATOS DE SEGUIDORES --
INSERT INTO `followers` (`id`,`user_id_follower`,`user_id_following`) VALUES (1,2,3);
INSERT INTO `followers` (`id`,`user_id_follower`,`user_id_following`) VALUES (2,1,3);
INSERT INTO `followers` (`id`,`user_id_follower`,`user_id_following`) VALUES (3,1,2);

-- INSERCION DATOS DE COMENTARIOS --
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (7,1,8,'??Excelente Teclado!','2022-06-22 21:10:30',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (8,2,8,'El mejor del condado!','2022-06-22 21:13:17',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (9,2,1,'Muy buena movilidad','2022-06-22 21:18:00',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (10,2,7,'Muy lindo color!','2022-06-22 21:18:29',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (11,1,9,'Gran cancelaci??n de sonido','2022-06-22 21:19:37',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (12,1,7,'Muy colorido, no me gusta','2022-06-22 21:19:58',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (13,2,3,'Buen dise??o','2022-06-22 21:20:26',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (14,3,1,'Algo tosco','2022-06-22 21:21:07',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (15,3,3,'Me encanto','2022-06-22 21:21:18',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (16,3,4,'Mucha marca, no cumple mis expectativas','2022-06-22 21:21:40',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (17,1,5,'La verdad, no me gusta','2022-06-22 21:22:13',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (18,1,5,'A la basura','2022-06-22 21:22:47',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (19,1,4,'Opa','2022-06-22 21:23:02',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (20,1,6,'Tremendooo','2022-06-22 21:23:13',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (21,1,6,'Puede ser para regalo?','2022-06-22 21:23:23',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (22,2,9,'No me gustan los dragones, puede ser otro animal?','2022-06-22 21:24:00',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (23,3,5,'No banco','2022-06-22 21:24:49',NULL,NULL);
INSERT INTO `comments` (`id`,`user_id`,`product_id`,`comment_description`,`created_at`,`updated_at`,`deleted_at`) VALUES (24,3,6,'Hermoso color y estructura','2022-06-22 21:25:11',NULL,NULL);