const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los profesores
    obtenerTodosLosProfesores: async() => {
        try {
            const resultado = await pool.query('SELECT * FROM profesores');

            return resultado;
        } catch (error) {
            console.error('Ocurrio un problema al consultar el listado de profesores');
        }
    },

    // Consulta para eliminar un profesor
    eliminarProfesor: async(idprofesor) => {
        try {
            const resultado = await pool.query('DELETE FROM profesores WHERE idprofesor = ?', [idprofesor]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Ocurrio un problema al eliminar un profesor');
        }
    },
    
    // Insertar un profesor
    insertarProfesor: async(nuevoProfesor) => {
        try{
          const result = await pool.query("INSERT INTO profesores SET ? ", nuevoProfesor);
          return result.insertId;

        }catch(error){
          console.error('Erro al insertar el registro', error);
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