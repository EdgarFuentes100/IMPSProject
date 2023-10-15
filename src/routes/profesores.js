const express = require('express');
const router = express.Router();
const queries = require('../repositories/ProfesorRepository');

// Endpoint para obtener todos los profesores
router.get('/', async(request, response) => {

    const profesores = await queries.obtenerTodosLosProfesores();

    response.render('profesores/listado', { profesores });
});

// Endpoint que permite mostrar el formulario para agregar un nuevo profesor
router.get('/agregar', async(request, response) => {
   
    // Renderizamos el formulario
    response.render('profesores/agregar');
});

// Endpoint que permite mostrar el formulario para modificar un profesor
router.get('/modificar/:idprofesor', async(request, response) => {
    const {idprofesor} = request.params;

    // Aca es de obtener el objeto del profesor
    const profesor = await queries.obtenerProfesorPorID(idprofesor);

    console.log('Prfesor: ', profesor);
    response.render('profesores/actualizar', {idprofesor, profesor});
});


// Enpoint que permite realizar la modificacion de un profesor
router.post('/modificar/:id', async(request, response) => {
    const { id } = request.params;
    const { nombre, apellido, fecha_nacimiento, profesion, genero, email } = request.body;
    nuevaprofesor = { nombre, apellido, fecha_nacimiento, profesion, genero, email };

    const actualizacion = await queries.actualizarProfesor(id, nuevaprofesor);

    response.redirect('/profesores');

});

// Endpoint para agregar un profesor
router.post('/agregar', async(request, response) => {
    const { nombre, apellido, fecha_nacimiento, profesion, genero, email } = request.body;
    const nuevoprofesor = { nombre, apellido, fecha_nacimiento, profesion, genero, email };
    
    // Se trata de una insercion
    const resultado = await queries.insertarProfesor(nuevoprofesor);
    
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