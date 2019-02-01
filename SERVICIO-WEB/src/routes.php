<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->group('/api', function () use ($app) {
    // Version group
    $app->group('/v1', function () use ($app) {
      
      $app->post('/iniciarSesion', 'iniciarSesion');
      $app->post('/agregarCaratula', 'agregarCaratula');
      $app->post('/agregarTemasDatos', 'agregarTemasDatos');
      $app->post('/agregarTemasRegistro', 'agregarTemasRegistro'); 
      $app->post('/buscarInstitutoProfesor', 'buscarInstitutoProfesor');
      $app->get('/buscarCarreraProfesor/{id}', 'buscarCarreraProfesor');
      $app->get('/obtenerUsuarios', 'obtenerUsuarios');
      $app->get('/listarUnidadeCompetencias', 'listarUnidadeCompetencias');
      $app->post('/agregarUnidadCompetencia', 'agregarUnidadCompetencia');

      $app->post('/agregarElementosCompetencia', 'agregarElementosCompetencia');
      $app->get('/listarElementosCompetencias', 'listarElementosCompetencias');
      $app->post('/agregarResultadoAprendizaje', 'agregarResultadoAprendizaje');
      $app->get('/listarResultadosAprendizaje', 'listarResultadosAprendizaje');

      $app->post('/agregarEstrategia', 'agregarEstrategia');
      $app->get('/listarEstrategias', 'listarEstrategias');
      $app->post('/agregarRecursosDidacticos', 'agregarRecursosDidacticos');
      $app->get('/listarRecursosDidacticos', 'listarRecursosDidacticos');

      $app->post('/agregarSilabo', 'agregarSilabo');

    });
  });

$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
