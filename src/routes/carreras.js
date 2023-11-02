const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos los carreras
router.get('/', async (request, response) => {
    const carreras = await queries.obtenerTodosLasCarreras();

     response.render('carreras/listado', {carreras: carreras}); // Mostramos el listado de carreras
});

// Endpoint que permite mostrar el formulario para agregar una nueva carrera
router.get('/agregar', async(request, response) => {
   
    // Renderizamos el formulario
    response.render('carreras/agregar');
});

// Endpoint que permite mostrar el formulario para modificar una carrera
router.get('/modificar/:idcarrera', async(request, response) => {
    const {idcarrera} = request.params;

    // Aca es de obtener el objeto del carrera
    const carrera = await queries.obtenerCarreraPorID(idcarrera);

    response.render('carreras/actualizar', {idcarrera, carrera});
});


// Enpoint que permite realizar la modificacion de una carrera
router.post('/modificar/:id', async(request, response) => {
    const { id } = request.params;
    const { idcarrera, carrera } = request.body;
    nuevaCarrera = { idcarrera, carrera };

    const actualizacion = await queries.actualizarCarrera(id, nuevaCarrera);

    if(actualizacion){
        request.flash('success', 'Registro actualizado con exito');
     } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
     }
     
    response.redirect('/carreras');
});

// Endpoint para agregar una carrera
router.post('/agregar', async(request, response) => {
    const { idcarrera, carrera } = request.body;
    const nuevaCarrera = { carrera, idcarrera };
    
    // Se trata de una insercion
    const resultado = await queries.insertarCarrera(nuevaCarrera);

    if(resultado){
       request.flash('success', 'Registro insertado con exito');
    } else {
       request.flash('error', 'Ocurrio un problema al guardar el registro');
    }
    
    response.redirect('/carreras');
});

// Endpoint que permite eliminar una carrera
router.get('/eliminar/:idcarrera', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idcarrera
    const { idcarrera } = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);
    if(resultado > 0){
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/carreras');
});

module.exports = router;