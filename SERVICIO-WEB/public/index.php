<?php
if (PHP_SAPI == 'cli-server') {
    
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../vendor/autoload.php';

$corsOptions = array(
    "origin" => "*",
    "exposeHeaders" => array("Content-Type", "X-Requested-With", "X-authentication", "X-client"),
    "allowMethods" => array('GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')
);
$cors = new \CorsSlim\CorsSlim($corsOptions);

session_start();

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);

// Set up dependencies
require __DIR__ . '/../src/dependencies.php';

// Register middleware
require __DIR__ . '/../src/middleware.php';

// Register routes
require __DIR__ . '/../src/routes.php';


function getConnection() {
    $dbhost="127.0.0.1";
    $dbuser="root";
    $dbpass="12345";
    $dbname="portafolio";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
};

function obtenerUsuarios($response) {
    $sql = "SELECT * FROM usuario";
    try {
        $stmt = getConnection()->query($sql);
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($usuarios);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function buscarInstitutoProfesor($request) {
    
    $usu = json_decode($request->getBody());

    $sql = "SELECT DISTINCT instituto.idInstituto, instituto.nombre FROM instituto INNER JOIN carrera ON carrera.idInstituto = instituto.idInstituto INNER JOIN asignatura ON asignatura.idCarrera = carrera.idCarrera INNER JOIN asignatura_profesor ON asignatura_profesor.idAsignatura = asignatura.idAsignatura INNER JOIN profesor ON asignatura_profesor.idProfesor = profesor.idProfesor WHERE profesor.idProfesor = '". $usu->id ."'";
    try {
        $stmt = getConnection()->query($sql);
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        
        $db = null;
        
        return json_encode($usuarios);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function buscarCarreraProfesor($request,$response) {
    $id = $request->getAttribute('id');
    $sql = "SELECT DISTINCT
            carrera.idCarrera,
            carrera.nombre
            FROM
            instituto
            INNER JOIN carrera ON carrera.idInstituto = instituto.idInstituto
            INNER JOIN asignatura ON asignatura.idCarrera = carrera.idCarrera
            INNER JOIN asignatura_profesor ON asignatura_profesor.idAsignatura = asignatura.idAsignatura
            INNER JOIN profesor ON asignatura_profesor.idProfesor = profesor.idProfesor
            WHERE
            profesor.idProfesor = '". $id ."'";
    try {
        $stmt = getConnection()->query($sql);
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($usuarios);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};


function agregarCaratula($request) {
    $emp = json_decode($request->getBody());
    
    $sql = "INSERT INTO `portafolio`.`caratula`(`instituto`, `asignatura`, `docente`, `periodoAcedemico`, `periodoLectivo`) VALUES (:instituto, :asignatura, :docente, :periodoAcedemico, :periodoLectivo)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("instituto", $emp->instituto);
        $stmt->bindParam("asignatura", $emp->asignatura);
        $stmt->bindParam("docente", $emp->docente);
        $stmt->bindParam("periodoAcedemico", $emp->periodoAcedemico);
        $stmt->bindParam("periodoLectivo", $emp->periodoLectivo);
        $stmt->execute();
        $emp->id = $db->lastInsertId();
        $db = null;
        echo json_encode($emp);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function agregarTemasDatos($request) {
    $emp = json_decode($request->getBody());
    
    $sql = "INSERT INTO `portafolio`.`temas_datos`(`instituto`, `carrera`, `asignatura`, `periodoAcademico`, `periodoLectivo`, `modalidad`, `docente`, `paralelo`) VALUES (:instituto, :carrera, :asignatura, :periodoAcademico, :periodoLectivo, :modalidad, :docente, :paralelo)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("instituto", $emp->instituto);
        $stmt->bindParam("carrera", $emp->carrera);
        $stmt->bindParam("asignatura", $emp->asignatura);
        $stmt->bindParam("periodoAcademico", $emp->periodoAcademico);
        $stmt->bindParam("periodoLectivo", $emp->periodoLectivo);
        $stmt->bindParam("modalidad", $emp->modalidad);
        $stmt->bindParam("docente", $emp->docente);
        $stmt->bindParam("paralelo", $emp->paralelo);

        $stmt->execute();
        $emp->id = $db->lastInsertId();
        $db = null;
        echo json_encode($emp);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function agregarTemasRegistro($request) {
    $emp = json_decode($request->getBody());
    
    $sql = "INSERT INTO `portafolio`.`temas_registro`(`mes`, `semana`, `tema`, `hora`, `cumpliento`, `idPlanClase`, `estado`, `idTemasDatos`) VALUES (:mes, :semana, :tema, :hora, :cumpliento, :idPlanClase, :estado, :idTemasDatos)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("mes", $emp->mes);
        $stmt->bindParam("semana", $emp->semana);
        $stmt->bindParam("tema", $emp->tema);
        $stmt->bindParam("hora", $emp->hora);
        $stmt->bindParam("cumpliento", $emp->cumpliento);
        $stmt->bindParam("idPlanClase", $emp->idPlanClase);
        $stmt->bindParam("estado", $emp->estado);
        $stmt->bindParam("idTemasDatos", $emp->idTemasDatos);

        $stmt->execute();
        $emp->id = $db->lastInsertId();
        $db = null;
        echo json_encode($emp);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function agregarUnidadCompetencia($request) {
    $emp = json_decode($request->getBody());
    
    $sql = "INSERT INTO `portafolio`.`unidades_competencia`(`numero`, `descripcion`) VALUES (:numero, :descripcion)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("numero", $emp->numero);
        $stmt->bindParam("descripcion", $emp->descripcion);

        $stmt->execute();
        $emp->id = $db->lastInsertId();
        $db = null;
        echo json_encode($emp);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function listarUnidadeCompetencias($response) {
    $sql = "SELECT * FROM unidades_competencia";
    try {
        $stmt = getConnection()->query($sql);
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($usuarios);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function agregarElementosCompetencia($request) {
    $emp = json_decode($request->getBody());
    
    $sql = "INSERT INTO `portafolio`.`elementos_competencia`(`numero`, `descripcion`) VALUES (:numero, :descripcion)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("numero", $emp->numero);
        $stmt->bindParam("descripcion", $emp->descripcion);

        $stmt->execute();
        $emp->id = $db->lastInsertId();
        $db = null;
        echo json_encode($emp);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function listarElementosCompetencias($response) {
    $sql = "SELECT * FROM elementos_competencia";
    try {
        $stmt = getConnection()->query($sql);
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($usuarios);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function agregarResultadoAprendizaje($request) {
    $emp = json_decode($request->getBody());
    
    $sql = "INSERT INTO `portafolio`.`resultados_aprendizaje`(`numero`, `descripcion`) VALUES (:numero, :descripcion)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("numero", $emp->numero);
        $stmt->bindParam("descripcion", $emp->descripcion);

        $stmt->execute();
        $emp->id = $db->lastInsertId();
        $db = null;
        echo json_encode($emp);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function listarResultadosAprendizaje($response) {
    $sql = "SELECT * FROM resultados_aprendizaje";
    try {
        $stmt = getConnection()->query($sql);
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($usuarios);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function agregarEstrategia($request) {
    $emp = json_decode($request->getBody());
    
    $sql = "INSERT INTO `portafolio`.`estrategias`(`descripcion`) VALUES (:descripcion)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("descripcion", $emp->descripcion);

        $stmt->execute();
        $emp->id = $db->lastInsertId();
        $db = null;
        echo json_encode($emp);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function listarEstrategias($response) {
    $sql = "SELECT * FROM estrategias";
    try {
        $stmt = getConnection()->query($sql);
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($usuarios);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function agregarRecursosDidacticos($request) {
    $emp = json_decode($request->getBody());
    
    $sql = "INSERT INTO `portafolio`.`recursos_didacticos`(`descripcion`) VALUES (:descripcion)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("descripcion", $emp->descripcion);

        $stmt->execute();
        $emp->id = $db->lastInsertId();
        $db = null;
        echo json_encode($emp);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function listarRecursosDidacticos($response) {
    $sql = "SELECT * FROM recursos_didacticos";
    try {
        $stmt = getConnection()->query($sql);
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($usuarios);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};

function agregarSilabo($request) {
    $emp = json_decode($request->getBody());
    
    $sql = "INSERT INTO `portafolio`.`silabo`(`instituto`, `asignatura`, `docente`, `periodoLectivo`, `descripcionAsignatura`, `objetivo`, `idUnidadesCompetencia`, `idElementosCompetencia`, `idResultadosAprendizaje`, `numeroSemana`, `horaClase`, `trabajoPractico`, `actividadesAutonomas`, `observaciones`, `idEstrategias`, `idRecursosDidacticos`) 
    VALUES (:instituto, :asignatura, :docente, :periodoLectivo, :descripcionAsignatura, :objetivo, :idUnidadesCompetencia, :idElementosCompetencia, :idResultadosAprendizaje, :numeroSemana, :horaClase, :trabajoPractico, :actividadesAutonomas, :observaciones, :idEstrategias, :idRecursosDidacticos)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("instituto", $emp->instituto);
        $stmt->bindParam("asignatura", $emp->asignatura);
        $stmt->bindParam("docente", $emp->docente);
        $stmt->bindParam("periodoLectivo", $emp->periodoLectivo);
        $stmt->bindParam("descripcionAsignatura", $emp->descripcionAsignatura);
        $stmt->bindParam("objetivo", $emp->objetivo);
        $stmt->bindParam("idUnidadesCompetencia", $emp->idUnidadesCompetencia);
        $stmt->bindParam("idElementosCompetencia", $emp->idElementosCompetencia);
        $stmt->bindParam("idResultadosAprendizaje", $emp->idResultadosAprendizaje);
        $stmt->bindParam("numeroSemana", $emp->numeroSemana);
        $stmt->bindParam("horaClase", $emp->horaClase);
        $stmt->bindParam("trabajoPractico", $emp->trabajoPractico);
        $stmt->bindParam("actividadesAutonomas", $emp->actividadesAutonomas);
        $stmt->bindParam("observaciones", $emp->observaciones);
        $stmt->bindParam("idEstrategias", $emp->idEstrategias);
        $stmt->bindParam("idRecursosDidacticos", $emp->idRecursosDidacticos);


        $stmt->execute();
        $emp->id = $db->lastInsertId();
        $db = null;
        echo json_encode($emp);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};


function iniciarSesion($request,$response) {

    $usu = json_decode($request->getBody());

    $sql = "SELECT usuario.idUsuario, usuario.correo, profesor.idProfesor, profesor.identificacion, profesor.nombre, profesor.fechaNacimiento, profesor.celular 
            FROM usuario INNER JOIN profesor ON profesor.idUsuario = usuario.idUsuario 
            WHERE usuario.correo = '". $usu->correo ."' AND usuario.contrasena = '". $usu->contrasena ."' ";
    try {
        $stmt = getConnection()->query($sql);
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($usuarios);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
};


// Run app
$app->run();
