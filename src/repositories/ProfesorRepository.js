const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los profesores
    obtenerTodosLosProfeores: async() => {
        try {
            const result = await pool.query('SELECT * FROM profesores');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de profesores: ', error);
        }
    },

    // Eliminar un profesor
    eliminarProfesor: async(idprofesor) => {
        try{
          const result = await pool.query('DELETE FROM profesores WHERE idprofesor = ?', [idprofesor]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    // Insertar un profesor
     insertarProfesor: async(nuevoProfesor) => {
        try{
          const result = await pool.query("INSERT INTO profesores SET ? ", nuevoProfesor);
          return result.insertId;

        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    // Actualizar un profesor
    actualizarProfesor: async(idprofesor, actualizacion) => {
      try {
        const resultado = await pool.query('UPDATE profesores SET ? WHERE idprofesor = ?', [actualizacion, idprofesor]);
        return resultado.affectedRows > 0;  
      } catch (error) {
        console.log('Error al actualizar profesor', error);
      }
    },

    // Obtener profesor por ID
    obtenerProfesorPorID: async(idprofesor) => {
      try {
        const [profesor] = await pool.query('SELECT * FROM profesores WHERE idprofesor = ?', [idprofesor]);

        return profesor;
      } catch (error) {
        console.log('Ocurrio un problema al obtener informacion del profesor');
      }
    }
}
