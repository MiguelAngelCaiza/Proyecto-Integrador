/*
 Navicat Premium Data Transfer

 Source Server         : MySQLLenovo
 Source Server Type    : MySQL
 Source Server Version : 50562
 Source Host           : localhost:3306
 Source Schema         : portafolio

 Target Server Type    : MySQL
 Target Server Version : 50562
 File Encoding         : 65001

 Date: 31/01/2019 21:45:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for asignatura
-- ----------------------------
DROP TABLE IF EXISTS `asignatura`;
CREATE TABLE `asignatura`  (
  `idAsignatura` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `idCarrera` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idAsignatura`) USING BTREE,
  INDEX `idCarrera`(`idCarrera`) USING BTREE,
  CONSTRAINT `asignatura_ibfk_1` FOREIGN KEY (`idCarrera`) REFERENCES `carrera` (`idCarrera`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of asignatura
-- ----------------------------
INSERT INTO `asignatura` VALUES (2, 'INGENIERIA DEL SOFTWARE', 1);
INSERT INTO `asignatura` VALUES (3, 'TENDENCIAS ACTUALES DE PROGRAMACIÓN', 1);

-- ----------------------------
-- Table structure for asignatura_profesor
-- ----------------------------
DROP TABLE IF EXISTS `asignatura_profesor`;
CREATE TABLE `asignatura_profesor`  (
  `idAsignaturaProfesor` int(11) NOT NULL AUTO_INCREMENT,
  `idAsignatura` int(11) NULL DEFAULT NULL,
  `idProfesor` int(11) NULL DEFAULT NULL,
  `horas` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `periodoLectivo` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `periodoAcademico` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idAsignaturaProfesor`) USING BTREE,
  INDEX `idAsignatura`(`idAsignatura`) USING BTREE,
  INDEX `idProfesor`(`idProfesor`) USING BTREE,
  CONSTRAINT `asignatura_profesor_ibfk_1` FOREIGN KEY (`idAsignatura`) REFERENCES `asignatura` (`idAsignatura`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `asignatura_profesor_ibfk_2` FOREIGN KEY (`idProfesor`) REFERENCES `profesor` (`idProfesor`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of asignatura_profesor
-- ----------------------------
INSERT INTO `asignatura_profesor` VALUES (1, 2, 2, '10', '2018 - 2019', 'OCTUBRE - MARZO');
INSERT INTO `asignatura_profesor` VALUES (2, 3, 2, '5', '2018 - 2019', 'OCTUBRE - MARZO');

-- ----------------------------
-- Table structure for caratula
-- ----------------------------
DROP TABLE IF EXISTS `caratula`;
CREATE TABLE `caratula`  (
  `idCaratula` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `instituto` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `asignatura` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `docente` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `periodoAcedemico` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `periodoLectivo` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idCaratula`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of caratula
-- ----------------------------
INSERT INTO `caratula` VALUES (2, 'INSTITUTO TECNOLOGICO SUPERIOR BENITO JUAREZ', 'TENDENCIAS ACTUALES DE PROGRAMACIÃ“N', 'GABRIELA ANDRANGO', 'MARZO - DICIEMBRE', '2018 - 2019');

-- ----------------------------
-- Table structure for carrera
-- ----------------------------
DROP TABLE IF EXISTS `carrera`;
CREATE TABLE `carrera`  (
  `idCarrera` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `idInstituto` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idCarrera`) USING BTREE,
  INDEX `idInstituto`(`idInstituto`) USING BTREE,
  CONSTRAINT `carrera_ibfk_1` FOREIGN KEY (`idInstituto`) REFERENCES `instituto` (`idInstituto`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of carrera
-- ----------------------------
INSERT INTO `carrera` VALUES (1, 'DESARROLLO DE SOFTWARE', 1);

-- ----------------------------
-- Table structure for elementos_competencia
-- ----------------------------
DROP TABLE IF EXISTS `elementos_competencia`;
CREATE TABLE `elementos_competencia`  (
  `idElementosCompetencia` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `descripcion` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`idElementosCompetencia`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of elementos_competencia
-- ----------------------------
INSERT INTO `elementos_competencia` VALUES (2, '1.1', 'DescripciÃ³n Elementos Competencia 1.1');
INSERT INTO `elementos_competencia` VALUES (3, '2.1', 'Elementos Competencia 2.1');

-- ----------------------------
-- Table structure for estrategias
-- ----------------------------
DROP TABLE IF EXISTS `estrategias`;
CREATE TABLE `estrategias`  (
  `idEstrategias` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`idEstrategias`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of estrategias
-- ----------------------------
INSERT INTO `estrategias` VALUES (1, 'asdas');
INSERT INTO `estrategias` VALUES (2, 'DESCRIPCION');

-- ----------------------------
-- Table structure for instituto
-- ----------------------------
DROP TABLE IF EXISTS `instituto`;
CREATE TABLE `instituto`  (
  `idInstituto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idInstituto`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of instituto
-- ----------------------------
INSERT INTO `instituto` VALUES (1, 'INSTITUTO TECNOLÓGICO SUPERIOR BENITO JUÁREZ');

-- ----------------------------
-- Table structure for profesor
-- ----------------------------
DROP TABLE IF EXISTS `profesor`;
CREATE TABLE `profesor`  (
  `idProfesor` int(11) NOT NULL AUTO_INCREMENT,
  `identificacion` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `nombre` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `fechaNacimiento` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `celular` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `idUsuario` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idProfesor`) USING BTREE,
  INDEX `idUsuario`(`idUsuario`) USING BTREE,
  CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of profesor
-- ----------------------------
INSERT INTO `profesor` VALUES (2, '0502950884', 'Gabriela Andrango', '1998-01-28', '0984678696', 1);

-- ----------------------------
-- Table structure for recursos_didacticos
-- ----------------------------
DROP TABLE IF EXISTS `recursos_didacticos`;
CREATE TABLE `recursos_didacticos`  (
  `idRecursosDidacticos` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`idRecursosDidacticos`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of recursos_didacticos
-- ----------------------------
INSERT INTO `recursos_didacticos` VALUES (1, 'asddas');
INSERT INTO `recursos_didacticos` VALUES (2, 'DESCRIPCION DIDACTICOS');

-- ----------------------------
-- Table structure for resultados_aprendizaje
-- ----------------------------
DROP TABLE IF EXISTS `resultados_aprendizaje`;
CREATE TABLE `resultados_aprendizaje`  (
  `idResultadosAprendizaje` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `descripcion` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`idResultadosAprendizaje`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of resultados_aprendizaje
-- ----------------------------
INSERT INTO `resultados_aprendizaje` VALUES (2, '1.1.1', 'DescripciÃ³n Resultado Aprendizaje 1.1.1');

-- ----------------------------
-- Table structure for silabo
-- ----------------------------
DROP TABLE IF EXISTS `silabo`;
CREATE TABLE `silabo`  (
  `idSilabo` int(11) NOT NULL AUTO_INCREMENT,
  `instituto` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `asignatura` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `docente` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `periodoLectivo` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `descripcionAsignatura` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `objetivo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `idUnidadesCompetencia` int(11) NULL DEFAULT NULL,
  `idElementosCompetencia` int(11) NULL DEFAULT NULL,
  `idResultadosAprendizaje` int(11) NULL DEFAULT NULL,
  `numeroSemana` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `horaClase` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `trabajoPractico` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `actividadesAutonomas` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `observaciones` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `idEstrategias` int(11) NULL DEFAULT NULL,
  `idRecursosDidacticos` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idSilabo`) USING BTREE,
  INDEX `idUnidadesCompetencia`(`idUnidadesCompetencia`) USING BTREE,
  INDEX `idElementosCompetencia`(`idElementosCompetencia`) USING BTREE,
  INDEX `idResultadosAprendizaje`(`idResultadosAprendizaje`) USING BTREE,
  INDEX `idEstrategias`(`idEstrategias`) USING BTREE,
  INDEX `idRecursosDidacticos`(`idRecursosDidacticos`) USING BTREE,
  CONSTRAINT `silabo_ibfk_5` FOREIGN KEY (`idRecursosDidacticos`) REFERENCES `recursos_didacticos` (`idRecursosDidacticos`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `silabo_ibfk_1` FOREIGN KEY (`idUnidadesCompetencia`) REFERENCES `unidades_competencia` (`idUnidadesCompetencia`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `silabo_ibfk_2` FOREIGN KEY (`idElementosCompetencia`) REFERENCES `elementos_competencia` (`idElementosCompetencia`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `silabo_ibfk_3` FOREIGN KEY (`idResultadosAprendizaje`) REFERENCES `resultados_aprendizaje` (`idResultadosAprendizaje`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `silabo_ibfk_4` FOREIGN KEY (`idEstrategias`) REFERENCES `estrategias` (`idEstrategias`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of silabo
-- ----------------------------
INSERT INTO `silabo` VALUES (4, 'INSTITUTO TECNOLOGICO SUPERIOR BENITO JUAREZ', 'INGENIERIA DEL SOFTWARE', 'GABRIELA ANDRANGO', '2019 - 2020', 'DESCRIPCION ASIGNATURA', 'Objetivo de la Asignatura', 1, 2, 2, '5', '10', '<span style=\"font-weight: 700;\">Trabajo PrÃ¡ctico</span>', '<span style=\"font-weight: 700;\">Actividades AutÃ³nomas</span>', '<span style=\"font-weight: 700;\">Observaciones</span>', 2, 2);

-- ----------------------------
-- Table structure for temas_datos
-- ----------------------------
DROP TABLE IF EXISTS `temas_datos`;
CREATE TABLE `temas_datos`  (
  `idTemasDatos` int(11) NOT NULL AUTO_INCREMENT,
  `instituto` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `carrera` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `asignatura` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `periodoAcademico` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `periodoLectivo` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `modalidad` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `docente` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `paralelo` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idTemasDatos`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of temas_datos
-- ----------------------------
INSERT INTO `temas_datos` VALUES (7, 'INSTITUTO TECNOLOGICO SUPERIOR BENITO JUAREZ', 'DESARROLLO DE SOFTWARE', 'TENDENCIAS ACTUALES DE PROGRAMACIÃ“N', 'FEBRERO - AGOSTO', '2019 - 2019', 'DUAL', 'GABRIELA ANDRANGO', 'B');

-- ----------------------------
-- Table structure for temas_registro
-- ----------------------------
DROP TABLE IF EXISTS `temas_registro`;
CREATE TABLE `temas_registro`  (
  `idTemasRegistro` int(11) NOT NULL AUTO_INCREMENT,
  `mes` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `semana` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `tema` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `hora` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `cumpliento` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `idPlanClase` int(11) NULL DEFAULT NULL,
  `estado` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `idTemasDatos` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idTemasRegistro`) USING BTREE,
  INDEX `idTemasDatos`(`idTemasDatos`) USING BTREE,
  CONSTRAINT `temas_registro_ibfk_1` FOREIGN KEY (`idTemasDatos`) REFERENCES `temas_datos` (`idTemasDatos`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of temas_registro
-- ----------------------------
INSERT INTO `temas_registro` VALUES (5, '1', '5', 'TEMA TRATADO', '4', 'SI', 2, 'NO', 7);

-- ----------------------------
-- Table structure for unidades_competencia
-- ----------------------------
DROP TABLE IF EXISTS `unidades_competencia`;
CREATE TABLE `unidades_competencia`  (
  `idUnidadesCompetencia` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `descripcion` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`idUnidadesCompetencia`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of unidades_competencia
-- ----------------------------
INSERT INTO `unidades_competencia` VALUES (1, '1', 'Unidad Competencia Descripcion 1');
INSERT INTO `unidades_competencia` VALUES (2, '2', 'Unidad Competencia Descripcion 2');

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `contrasena` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `rol` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuario`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (1, 'gaby@gmail.com', '12345', 'PROFESOR');

-- ----------------------------
-- Procedure structure for buscarAsignaturaProfesor
-- ----------------------------
DROP PROCEDURE IF EXISTS `buscarAsignaturaProfesor`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `buscarAsignaturaProfesor`(id INT)
SELECT DISTINCT
asignatura.nombre,
asignatura.idAsignatura
FROM
instituto
INNER JOIN carrera ON carrera.idInstituto = instituto.idInstituto
INNER JOIN asignatura ON asignatura.idCarrera = carrera.idCarrera
INNER JOIN asignatura_profesor ON asignatura_profesor.idAsignatura = asignatura.idAsignatura
INNER JOIN profesor ON asignatura_profesor.idProfesor = profesor.idProfesor
WHERE
profesor.idProfesor = id
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
