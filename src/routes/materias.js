const express = require('express');
const router = express.Router();
const queries = require('../repositories/MateriaRepository');

// Endpoint para obtener todas las materias
router.get('/', async(request, response) => {

    const materias = await queries.obtenerTodasLasMaterias();

    response.render('materias/listado', { materias });
});

// Endpoint que permite mostrar el formulario para agregar una nueva materia
router.get('/agregar', async(request, response) => {
   
    // Renderizamos el formulario
    response.render('materias/agregar');
});

// Endpoint que permite mostrar el formulario para modificar una materia
router.get('/modificar/:idmateria', async(request, response) => {
    const {idmateria} = request.params;

    // Aca es de obtener el objeto del materia
    const materia = await queries.obtenerMateriaPorID(idmateria)

    response.render('materias/actualizar', {idmateria, materia});
});


// Enpoint que permite realizar la modificacion de una materia
router.post('/modificar/:id', async(request, response) => {
    const { id } = request.params;
    const { idmateria, materia } = request.body;
    nuevaMateria = { idmateria, materia };

    const actualizacion = await queries.actualizarMateria(id, nuevaMateria);

    response.redirect('/materias');

});

// Endpoint para agregar una materia
router.post('/agregar', async(request, response) => {
    const { materia } = request.body;
    const nuevaMateria = { materia };
    
    // Se trata de una insercion
    const resultado = await queries.insertarMateria(nuevaMateria);
    
    response.redirect('/materias');
});

// Endpoint que permite eliminar una materia
router.get('/eliminar/:idmateria', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idmateria
    const { idmateria } = request.params;
    const resultado = await queries.eliminarMateria(idmateria);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/materias');
});


module.exports = router;