const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos las materias
    obtenerTodosLasMaterias: async() => {
        try {
            const result = await pool.query('SELECT * FROM materias');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de materias: ', error);
        }
    },
    
    // Eliminar una materia
    eliminarMateria: async(idmateria) => {
        try{
          const result = await pool.query('DELETE FROM materias WHERE idmateria = ?', [idmateria]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Error al eliminar el registro', error);
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
        console.log('Ocurrio un problema al obtener informacion de la materias');
      }
    }

    
}
