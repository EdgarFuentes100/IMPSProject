const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();

     response.render('estudiantes/listado', {estudiantes}); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async(request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
    // Renderizamos el formulario
    response.render('estudiantes/agregar', {lstCarreras});
});
// Endpoint que permite mostrar el formulario para actualizar un nuevo estudiante
router.get('/actualizar/:idestudiante/:nombre/:apellido/:email/:idcarrera/:usuario', async (request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
    
    const idestudiante = request.params.idestudiante;
    const nombre = request.params.nombre;
    const apellido = request.params.apellido;
    const email = request.params.email;
    const idcarrera = request.params.idcarrera;
    const usuario = request.params.usuario;

    response.render('estudiantes/actualizar', { idestudiante, nombre,apellido,email,idcarrera,usuario,lstCarreras });
});

// Endpoint para agregar un estudiante
router.post('/agregar', async(request, response) => {
    // Falta agregar logica
    const { idestudiante, nombre,apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };

    const resultado = await queries.insertarEstudiante(nuevoEstudiante);

    response.redirect('/estudiantes');
});

router.post('/actualizar', async (request, response) => {
    const { idestudiante, nombre,apellido, email, idcarrera, usuario } = request.body;
    const estudianteActualizado = { nombre, apellido, email, idcarrera, usuario };

    const resultadoModificacion = await queries.actualizarEstudiante(idestudiante, estudianteActualizado);

    response.redirect('/estudiantes'); // Redirige a la lista de estudiantes después de la modificación.
});


// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/estudiantes');
});

module.exports = router;