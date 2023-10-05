const express = require('express');
const router = express.Router();
const estuidanteRepository = require('../repositories/EstudianteRepository');
const carrerasRepository = require('../repositories/CarreraRepository');

// Configuracion de ruta inicial de la aplicacion
router.get('/', async (request, response) => {
    // Probando conexion con la base de datos
    const lstEstudiantes = await estuidanteRepository.obtenerTodosLosEstudiantes();
    console.log('Listado: ', lstEstudiantes);

    const lstCarreras = await carrerasRepository.obtenerTodosLasCarreras();
    console.log('Listado: ', lstCarreras);

    response.send('Bienvenido al laboratorio de IMPS');
});

module.exports = router;
