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
            createAt                DATE                NOT NULL
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


INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (1,'Teclado gamer Marvo KG901','Este teclado Marvo de alto rendimiento permite que puedas disfrutar de horas ilimitadas de juegos. Está diseñado especialmente para que puedas expresar tanto tus habilidades como tu estilo. Podrás mejorar tu experiencia de gaming, ya seas un aficionado o todo un experto y hacer que tus jugadas alcancen otro nivel.',11,1,'/images/products/marvo.jpg',NULL,'2022-04-13');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (2,'Teclado Redragon Dark','Disfrutá de tus partidas en otro nivel con Redragon, marca reconocida que se especializa en brindar la mejor experiencia de juego al público gamer desde hace más de 20 años. Sus teclados se adaptan a todo tipo de jugadores y esto los convierten en un fiel reflejo de la alta gama y calidad que la compañía ofrece.',14,1,'/images/products/dark-avenger.png',NULL,'2022-01-01');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (3,'Teclado Redragon Kumara','La gran calidad del Redragon Kumara K552, y su precio económico lo vuelven un atractivo ideal para que te diviertas frente a la pantalla. Su ergonomía, su base antidelizante y su rápido tiempo de respuesta permite que tus juegos favoritos se sientan más cerca que nunca, al alcance de tus manos.',17,1,'/images/products/kumara-k552.jpg',NULL,'2021-12-11');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (4,'Mouse Logitech G502','Logitech diseña productos y experiencias que ocupan un lugar cotidiano en la vida de las personas, poniendo foco en la innovación y la calidad. Su objetivo es crear momentos verdaderamente únicos y significativos para sus usuarios. Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. Sin necesidad de mover el brazo para deslizar el cursor, tu mano se fatigará menos. Son ideales para cualquier espacio de trabajo y quienes tienen la mesa llena de diversos objetos.',19,1,'/images/products/g502.jpg',NULL,'2021-12-14');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (5,'Mouse Logitech G203','Logitech diseña productos y experiencias que ocupan un lugar cotidiano en la vida de las personas, poniendo foco en la innovación y la calidad. Su objetivo es crear momentos verdaderamente únicos y significativos para sus usuarios. Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. Sin necesidad de mover el brazo para deslizar el cursor, tu mano se fatigará menos. Son ideales para cualquier espacio de trabajo y quienes tienen la mesa llena de diversos objetos.',7,0,'/images/products/g203.jpg',NULL,'2021-09-04');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (6,'Auriculares Logitech G733','¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los Logitech G733 no te perdés ningún detalle y escuchás el audio tal y como fue diseñado por los creadores.',12,1,'/images/products/logitech-gseries.jpg',NULL,'2021-09-10');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (7,'Teclado HyperX Alloy Origins','Este teclado HyperX de alto rendimiento permite que puedas disfrutar de horas ilimitadas de juegos. Está diseñado especialmente para que puedas expresar tanto tus habilidades como tu estilo. Podrás mejorar tu experiencia de gaming, ya seas un aficionado o todo un experto y hacer que tus jugadas alcancen otro nivel.',4,0,'/images/products/hyperx-alloy.jpg',NULL,'2021-08-29');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (8,'Teclado Redragon Draconic','Disfrutá de tus partidas en otro nivel con Redragon, marca reconocida que se especializa en brindar la mejor experiencia de juego al público gamer desde hace más de 20 años. Sus teclados se adaptan a todo tipo de jugadores y esto los convierten en un fiel reflejo de la alta gama y calidad que la compañía ofrece.',5,0,'/images/products/k530.jpg',NULL,'2021-08-20');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (9,'Auriculares HyperX Cloud','¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los HyperX Stinger S no te perdés ningún detalle y escuchás el audio tal y como fue diseñado por los creadores.',11,1,'/images/products/cloud-stinger.jpg',NULL,'2021-08-08');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (10,'Auriculares Redragon Zeus','Potentes, hermosos, totales. Con retroiluminación RGB, un micrófono excepcional, construcción cómoda y robusta, y -lo más importante- una calidad de sonido arrolladora, los aclamados Zeus vuelven con más: conoce su nueva versión X H510-RGB y experimenta la totalidad.',5,0,'/images/products/redragon-zeusx.jpg',NULL,'2021-05-05');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (11,'Mouse Logitech G903','Logitech diseña productos y experiencias que ocupan un lugar cotidiano en la vida de las personas, poniendo foco en la innovación y la calidad. Su objetivo es crear momentos verdaderamente únicos y significativos para sus usuarios. Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. Sin necesidad de mover el brazo para deslizar el cursor, tu mano se fatigará menos. Son ideales para cualquier espacio de trabajo y quienes tienen la mesa llena de diversos objetos.',10,1,'/images/products/g903.jpg',NULL,'2022-02-03');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (12,'Mouse Redragon M710','Redragon diseña productos y experiencias que ocupan un lugar cotidiano en la vida de las personas, poniendo foco en la innovación y la calidad. Su objetivo es crear momentos verdaderamente únicos y significativos para sus usuarios. Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. Sin necesidad de mover el brazo para deslizar el cursor, tu mano se fatigará menos. Son ideales para cualquier espacio de trabajo y quienes tienen la mesa llena de diversos objetos.',13,1,'/images/products/m710.jpg',NULL,'2022-01-10');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (13,'Mouse Razer Basilisk V2','Olvídate de lo que digan los demás: defiende tu propio estilo de juego con el Razer Basilisk V2. Ajusta, cambia y afina tu ejecución con este ratón de juego extremadamente personalizable para crear tu propia marca de supremacía que dejará huella en el campo de batalla.',8,1,'/images/products/mouseRazer.jpg',NULL,'2022-01-02');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (14,'Mouse HyperX Pulsefire','HyperX diseña productos y experiencias que ocupan un lugar cotidiano en la vida de las personas, poniendo foco en la innovación y la calidad. Su objetivo es crear momentos verdaderamente únicos y significativos para sus usuarios. Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. Sin necesidad de mover el brazo para deslizar el cursor, tu mano se fatigará menos. Son ideales para cualquier espacio de trabajo y quienes tienen la mesa llena de diversos objetos.',3,0,'/images/products/hp.jpg',NULL,'2022-03-04');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (15,'Teclado Redragon K550','Redragon diseña productos y experiencias que ocupan un lugar cotidiano en la vida de las personas, poniendo foco en la innovación y la calidad. Su objetivo es crear momentos verdaderamente únicos y significativos para sus usuarios. Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. Sin necesidad de mover el brazo para deslizar el cursor, tu mano se fatigará menos. Son ideales para cualquier espacio de trabajo y quienes tienen la mesa llena de diversos objetos.',2,0,'/images/products/k550.jpg',NULL,'2022-04-03');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (16,'Teclado Logitech G213','Logitech diseña productos y experiencias que ocupan un lugar cotidiano en la vida de las personas, poniendo foco en la innovación y la calidad. Su objetivo es crear momentos verdaderamente únicos y significativos para sus usuarios. Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. Sin necesidad de mover el brazo para deslizar el cursor, tu mano se fatigará menos. Son ideales para cualquier espacio de trabajo y quienes tienen la mesa llena de diversos objetos.',1,0,'/images/products/g213.jpg',NULL,'2021-06-06');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (17,'Teclado XPG Infarex K10','XPG diseña productos y experiencias que ocupan un lugar cotidiano en la vida de las personas, poniendo foco en la innovación y la calidad. Su objetivo es crear momentos verdaderamente únicos y significativos para sus usuarios. Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. Sin necesidad de mover el brazo para deslizar el cursor, tu mano se fatigará menos. Son ideales para cualquier espacio de trabajo y quienes tienen la mesa llena de diversos objetos.',2,0,'/images/products/k10.jpg',NULL,'2021-09-10');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (18,'Auriculares Logitech G433','Potentes, hermosos, totales. Con retroiluminación RGB, un micrófono excepcional, construcción cómoda y robusta, y -lo más importante- una calidad de sonido arrolladora, los aclamados Zeus vuelven con más: conoce su nueva versión X H510-RGB y experimenta la totalidad.',14,1,'/images/products/g433.jpg',NULL,'2021-07-11');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (19,'Auriculares Redragon H901','Potentes, hermosos, totales. Con retroiluminación RGB, un micrófono excepcional, construcción cómoda y robusta, y -lo más importante- una calidad de sonido arrolladora, los aclamados Zeus vuelven con más: conoce su nueva versión X H510-RGB y experimenta la totalidad.',7,0,'/images/products/h901.jpg',NULL,'2022-01-01');
INSERT INTO `products` (`id`,`title`,`descrip`,`comments`,`novedad`,`image`,`user_id`,`createAt`) VALUES (20,'Auriculares Logitech G935','Potentes, hermosos, totales. Con retroiluminación RGB, un micrófono excepcional, construcción cómoda y robusta, y -lo más importante- una calidad de sonido arrolladora, los aclamados Zeus vuelven con más: conoce su nueva versión X H510-RGB y experimenta la totalidad.',3,0,'/images/products/g935.jpg',NULL,'2021-12-30');
