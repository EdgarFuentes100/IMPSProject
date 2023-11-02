const express = require('express');
const router = express.Router();
const queries = require('../repositories/GrupoRepository');
const materiasQuery = require('../repositories/MateriaRepository');
const profesoresQuery = require('../repositories/ProfesorRepository');
const estudiantesQuery = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos los grupos
router.get('/', async (request, response) => {
  const grupos = await queries.obtenerTodosLosGrupos();

  response.render('grupos/listado', { grupos }); // Mostramos el listado de grupos
});

// Endpoint que permite mostrar el formulario para agregar un nuevo grupo
router.get('/agregar', async (request, response) => {

  const lstMaterias = await materiasQuery.obtenerTodasLasMaterias();
  const lstProfesores = await profesoresQuery.obtenerTodosLosProfesores();

  // Renderizamos el formulario
  response.render('grupos/agregar', { lstMaterias, lstProfesores });
});

// Endpoint para agregar un grupo
router.post('/agregar', async (request, response) => {
  const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
  const nuevoGrupo = { num_grupo, anio, ciclo, idmateria, idprofesor };

  // Se trata de una insercion
  const resultado = await queries.insertarGrupo(nuevoGrupo);

  if (resultado) {
    request.flash('success', 'Registro insertado con exito');
  } else {
    request.flash('error', 'Ocurrio un problema al guardar el registro');
  }

  response.redirect('/grupos');
});


// Endpoint que permite mostrar el formulario para modificar un grupo
router.get('/modificar/:idgrupo', async (request, response) => {
  const { idgrupo } = request.params;
  const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
  const lstMaterias = await materiasQuery.obtenerTodasLasMaterias();
  const lstProfesores = await profesoresQuery.obtenerTodosLosProfesores();


  // Aca es de obtener el objeto del grupo
  const grupo = await queries.obtenerGrupoPorID(idgrupo);

  response.render('grupos/actualizar', { lstCarreras, lstMaterias, lstProfesores, idgrupo, grupo });
});

// Endpoint que permite actualizar un grupo
router.post('/modificar/:id', async (request, response) => {
  const { id } = request.params;
  const { idgrupo, num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
  const nuevogrupo = { idgrupo, num_grupo, anio, ciclo, idmateria, idprofesor };

  const actualizacion = await queries.actualizarGrupo(id, nuevogrupo);

  if (actualizacion) {
    request.flash('success', 'Registro actualizado con exito');
  } else {
    request.flash('error', 'Ocurrio un problema al actualizar el registro');
  }

  response.redirect('/grupos');

});

// Endpoint que permite eliminar un grupo
router.get('/eliminar/:idgrupo', async (request, response) => {
  // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idgrupo
  const { idgrupo } = request.params;

  const resultado = await queries.eliminarGrupo(idgrupo);
  if (resultado > 0) {
    request.flash('success', 'Eliminacion correcta');
  } else {
    request.flash('error', 'Error al eliminar');
  }
  response.redirect('/grupos');
});

// Enpoint que permite navegar a la pantalla para asignar un grupo
router.get('/asignargrupo/:idgrupo', async (request, reponse) => {
  const { idgrupo } = request.params;
  // Consultamos el listado de estudiantes disponible
  const lstEstudiantes = await estudiantesQuery.obtenerTodosLosEstudiantes();

  reponse.render('grupos/asignargrupo', { lstEstudiantes, idgrupo });
});


// Endpoint que permite asignar un grupo
router.post('/asignargrupo', async (request, response) => {

  const data = request.body;
  let resultado = null;
  let exitoCount = 0; // Exito
  let errorCount = 0; // Fracaso
  const result = processDataFromForm(data);

  for (const tmp of result.grupo_estudiantes) {
    const asignacion = [tmp.idgrupo, tmp.idestudiante];
    const { idgrupo, idestudiante } = tmp;
    const asignacionObj = { idgrupo, idestudiante };

    resultado = await queries.asignarGrupo(tmp);

    if (resultado) {
      exitoCount++;
    } else {
      errorCount++;
    }
  }

  if (exitoCount > 0) {
    request.flash('success', `Se realizaron ${exitoCount} asignaciones de grupo con éxito.`);
  }

  if (errorCount > 0) {
    request.flash('error', `Ocurrieron problemas al realizar ${errorCount} asignaciones de grupo.`);
  }

  response.redirect('/grupos');
});


// Función para procesar los datos del formulario
function processDataFromForm(data) {
  const result = {
    grupo_estudiantes: []
  };

  for (const key in data) {
    if (key.startsWith('grupo_estudiantes[')) {
      const match = key.match(/\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const index = parseInt(match[1]);
        const property = match[2];
        if (!result.grupo_estudiantes[index]) {
          result.grupo_estudiantes[index] = {};
        }
        result.grupo_estudiantes[index][property] = data[key];
      }
    } else {
      result[key] = data[key];
    }
  }

  return result;
}

module.exports = router;