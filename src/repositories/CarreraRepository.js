const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos las carreras
    obtenerTodosLasCarreras: async () => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de carreras: ', error);
        }
    },

    //Insertar una carrera
    insertarCarrera: async (nuevaCarrera) => {
        try {
            const result = await pool.query("INSERT INTO carreras SET ? ", nuevaCarrera);
            return result.insertId;
        } catch (error) {
            console.error('Error al insertar el registro', error);
        }
    },

    //Eliminar una carrera
    eliminarCarrera: async (idcarrera) => {
        try {
            const result = await pool.query('DELETE FROM carreras WHERE idcarrera=?', [idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro al eliminar el registro', error);
        }
    },

    //Actualizar Carrera
    actualizarCarrera: async (idcarrera, carrera) => {
        try {
            const result = await pool.query('UPDATE carreras SET carrera = ? WHERE idcarrera = ?', [carrera, idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el registro', error);
        }
    },
    
    // Obtener carrera por ID
    obtenerCarreraPorId: async (idcarrera) => {
        try {
            const result = await pool.query('SELECT * FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result[0]; // Devuelve el primer resultado, ya que debería ser único por ID.
        } catch (error) {
            console.error('Error al obtener la carrera por ID', error);
        }
    },

}
