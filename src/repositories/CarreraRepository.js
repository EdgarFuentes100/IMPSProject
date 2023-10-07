const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos las carreras
    obtenerTodosLasCarreras: async() => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de carreras: ', error);
        }
    },
    
    // Eliminar una carrera
    eliminarCarrera: async(idcarrera) => {
        try{
          const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idcarrera]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Error al eliminar el registro', error);
        }
    },

    // Insertar una carrera
     insertarCarrera: async(nuevaCarrera) => {
        try{
          const result = await pool.query("INSERT INTO carreras SET ? ", nuevaCarrera);
          return result.insertId;

        }catch(error){
          console.error('Erro al insertar el registro', error);
        }
    },

    // Actualizar una carrera
    actualizarCarrera: async(idcarrera, actualizacion) => {
      try {
        const resultado = await pool.query('UPDATE carreras SET ? WHERE idcarrera = ?', [actualizacion, idcarrera]);
        return resultado.affectedRows > 0;  
      } catch (error) {
        console.log('Error al actualizar carrera', error);
      }
    },

    // Obtener carrera por ID
    obtenerCarreraPorID: async(idcarrera) => {
      try {
        const [carrera] = await pool.query('SELECT * FROM carreras WHERE idcarrera = ?', [idcarrera]);

        return carrera;
      } catch (error) {
        console.log('Ocurrio un problema al obtener informacion de la carrera');
      }
    }

    
}
