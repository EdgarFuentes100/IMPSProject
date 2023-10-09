const express = require('express');
const router = express.Router();
const queries = require('../repositories/ProfesorRepository');
const carrerasQuery = require('../repositories/MateriaRepository');

// Endpoint para mostrar todos los profesores
router.get('/', async (request, response) => {
    const profesores = await queries.obtenerTodosLosProfeores();

     response.render('profesores/listado', {profesores}); // Mostramos el listado de profesores
});

// Endpoint que permite mostrar el formulario para agregar un nuevo profesor
router.get('/agregar', async(request, response) => {
   
    const lstMaterias = await carrerasQuery.obtenerTodosLasMaterias();

    // Renderizamos el formulario
    response.render('profesores/agregar', {lstMaterias});
});

// Endpoint para agregar un profesor
router.post('/agregar', async(request, response) => {
    const { accion, idprofesor, nombre,apellido, email, idmateria, usuario } = request.body;
    const nuevoProfesor = { idprofesor, nombre, apellido, email, idmateria, usuario };

    // Se trata de una insercion
    const resultado = await queries.insertarProfesor(nuevoProfesor);
    
    response.redirect('/profesores');
});


// Endpoint que permite mostrar el formulario para modificar un profesor
router.get('/modificar/:idprofesor', async(request, response) => {
    const {idprofesor} = request.params; 
    const lstMaterias = await carrerasQuery.obtenerTodosLasMaterias();

    // Aca es de obtener el objeto del profesor
    const profesor = await queries.obtenerProfesorPorID(idprofesor);

    response.render('profesores/actualizar', {lstMaterias, idprofesor, profesor});
});

// Endpoint que permite actualizar un profesor
router.post('/modificar/:id', async(request, response) => {
    const {id} = request.params; 
    const {  idprofesor, nombre,apellido, email, idmateria, usuario } = request.body;
    const nuevoProfesor = { idprofesor, nombre, apellido, email, idmateria, usuario };

    const actualizacion = await queries.actualizarProfesor(id, nuevoProfesor);

    response.redirect('/profesores');

});

// Endpoint que permite eliminar un profesor
router.get('/eliminar/:idprofesor', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idprofesor
    const { idprofesor } = request.params;
    const resultado = await queries.eliminarProfesor(idprofesor);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/profesores');
});

module.exports = router;