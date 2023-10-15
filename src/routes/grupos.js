const express = require('express');
const router = express.Router();
const queries = require('../repositories/GrupoRepository');
const materiasQuery = require('../repositories/MateriaRepository');
const profesoresQuery = require('../repositories/ProfesorRepository');

// Endpoint para mostrar todos los grupos
router.get('/', async (request, response) => {
    const grupos = await queries.obtenerTodosLosGrupos();

     response.render('grupos/listado', { grupos }); // Mostramos el listado de grupos
});

// Endpoint que permite mostrar el formulario para agregar un nuevo grupo
router.get('/agregar', async(request, response) => {
   
    const lstMaterias = await materiasQuery.obtenerTodasLasMaterias();
    const lstProfesores = await profesoresQuery.obtenerTodosLosProfesores();

    // Renderizamos el formulario
    response.render('grupos/agregar', { lstMaterias, lstProfesores });
});

// Endpoint para agregar un grupo
router.post('/agregar', async(request, response) => {
    const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
    const nuevoGrupo = { num_grupo, anio, ciclo, idmateria, idprofesor };

    // Se trata de una insercion
    const resultado = await queries.insertarGrupo(nuevoGrupo);
    
    response.redirect('/grupos');
});


// Endpoint que permite mostrar el formulario para modificar un grupo
router.get('/modificar/:idgrupo', async(request, response) => {
    const {idgrupo} = request.params; 
    const lstMaterias = await materiasQuery.obtenerTodasLasMaterias();
    const lstProfesores = await profesoresQuery.obtenerTodosLosProfesores();

    // Aca es de obtener el objeto del grupo
    const grupo = await queries.obtenerGrupoPorID(idgrupo);

    response.render('grupos/actualizar', {lstMaterias, lstProfesores, idgrupo, grupo});
});

// Endpoint que permite actualizar un grupo
router.post('/modificar/:id', async(request, response) => {
    const {id} = request.params; 
    const {  idgrupo, num_grupo,anio, ciclo, idmateria, idprofesor } = request.body;
    const nuevogrupo = { idgrupo, num_grupo, anio, ciclo, idmateria, idprofesor };

    const actualizacion = await queries.actualizarGrupo(id, nuevogrupo);

    response.redirect('/grupos');

});

// Endpoint que permite eliminar un grupo
router.get('/eliminar/:idgrupo', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idgrupo
    const { idgrupo } = request.params;
    const resultado = await queries.eliminarGrupo(idgrupo);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/grupos');
});


module.exports = router;