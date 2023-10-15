const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todas las materias
    obtenerTodasLasMaterias: async() => {
        try {
            const resultado = await pool.query('SELECT * FROM materias');

            return resultado;
        } catch (error) {
            console.error('Ocurrio un problema al consultar el listado de materias');
        }
    },

    // Consulta para eliminar una materia
    eliminarMateria: async(idmateria) => {
        try {
            const resultado = await pool.query('DELETE FROM materias WHERE idmateria = ?', [idmateria]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Ocurrio un problema al eliminar una materia');
        }
    },
    
    // Insertar una materia
    insertarMateria: async(nuevaMateria) => {
        try{
          const result = await pool.query("INSERT INTO materias SET ? ", nuevaMateria);
          return result.insertId;

        }catch(error){
          console.error('Erro al insertar el registro', error);
        }
    },

    // Actualizar una materia
    actualizarMateria: async(idmateria, actualizacion) => {
      try {
        const resultado = await pool.query('UPDATE materias SET ? WHERE idmateria = ?', [actualizacion, idmateria]);
        return resultado.affectedRows > 0;  
      } catch (error) {
        console.log('Error al actualizar materia', error);
      }
    },

    // Obtener materia por ID
    obtenerMateriaPorID: async(idmateria) => {
      try {
        const [materia] = await pool.query('SELECT * FROM materias WHERE idmateria = ?', [idmateria]);

        return materia;
      } catch (error) {
        console.log('Ocurrio un problema al obtener informacion de la materia');
      }
    }
}