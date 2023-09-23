const express = require('express');
const router = express.Router();
const estuidanteRepository = require('../repositories/EstudianteRepository');

// Configuracion de ruta inicial de la aplicacion
router.get('/', async (request, response) => {
    // Probando conexion con la base de datos
    const lstEstudiantes = await estuidanteRepository.obtenerTodosLosEstudiantes();
    console.log('Listado: ', lstEstudiantes);

    response.send('Bienvenido al laboratorio de IMPS');
});

module.exports = router;
