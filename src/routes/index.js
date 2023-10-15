const express = require('express');
const router = express.Router();
const estuidanteRepository = require('../repositories/EstudianteRepository');
const carrerasRepository = require('../repositories/CarreraRepository');
const materiasRepository = require('../repositories/MateriaRepository');
const gruposRepository = require('../repositories/GrupoRepository');


// Configuracion de ruta inicial de la aplicacion
router.get('/', async (request, response) => {
    // Probando conexion con la base de datos
    const lstEstudiantes = await estuidanteRepository.obtenerTodosLosEstudiantes();
    console.log('Listado: ', lstEstudiantes);

    const lstCarreras = await carrerasRepository.obtenerTodosLasCarreras();
    console.log('Listado: ', lstCarreras);

    const lstMaterias = await materiasRepository.obtenerTodasLasMaterias();
    console.log('Listado: ', lstMaterias);

    const lstGrupos = await gruposRepository.obtenerTodosLosGrupos();
    console.log('Listado: ', lstGrupos);

    response.send('Bienvenido al laboratorio de IMPS');
});

module.exports = router;
