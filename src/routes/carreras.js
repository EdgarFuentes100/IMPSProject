const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

router.get('/', async (request, response) => {
    const carreras = await queries.obtenerTodosLasCarreras();
    response.render('carreras/listado', { carreras }); // Mostramos el listado de carreras
});

//ENPOINT QUE PERMITE MOSTRAR FORMULARIO DE INSERTAR
router.get('/agregar', async (request, response) => {
    // Renderizamos el formulario
    response.render('carreras/agregar');
});

router.get('/actualizar/:idcarrera/:carrera', async (request, response) => {
    const idcarrera = request.params.idcarrera;
    const carrera = request.params.carrera;

    response.render('carreras/actualizar', { idcarrera, carrera });
});

//Enpoint para agregar una nueva carrera
router.post('/agregar', async(request, response)=>{
    const {idcarrera, carrera} = request.body;
    const nuevaCarrera = {idcarrera, carrera};

    const resultado = await queries.insertarCarrera(nuevaCarrera);

    response.redirect('/carreras');
});

//Enpoint para actualizar una nueva carrera
router.post('/actualizar', async (request, response) => {
    const { idcarrera, carrera } = request.body;

    const resultadoModificacion = await queries.actualizarCarrera(idcarrera, carrera);

    response.redirect('/carreras'); // Redirige a la lista de carreras después de la modificación.
});


//Enpoint para eliminar carrera
router.get('/eliminar/:idcarrera', async(request, response)=>{
    const {idcarrera} = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);

    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/carreras');
});

/*router.post('/agregar', async (request, response) => {
    const { idcarrera, carrera } = request.body;

    // Verificar si el idcarrera ya existe en la base de datos
    const carreraExistente = await queries.obtenerCarreraPorId(idcarrera);

    if (carreraExistente) {
        // Si la carrera existe, es una solicitud de modificación.
        // Puedes realizar las acciones de modificación aquí.
        const resultadoModificacion = await queries.actualizarCarrera(idcarrera, carrera);
    } else {
        // Si la carrera no existe, es una solicitud de agregar.
        // Puedes realizar las acciones de agregar aquí.
        const nuevaCarrera = { idcarrera, carrera };
        const resultadoAgregado = await queries.insertarCarrera(nuevaCarrera);
    }

    response.redirect('/carreras');
});*/

module.exports = router;