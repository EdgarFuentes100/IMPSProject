const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los grupos
    obtenerTodosLosGrupos: async() => {
        try {
            const result = await pool.query('SELECT g.idgrupo, g.num_grupo, g.anio, g.ciclo,g.idmateria, m.materia, g.idprofesor, p.nombre FROM grupos g, materias m, profesores p where g.idmateria = m.idmateria and g.idprofesor = p.idprofesor');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de grupos: ', error);
        }
    },

    // Eliminar un grupo
    eliminarGrupo: async(idgrupo) => {
        try{
          const result = await pool.query('DELETE FROM grupos WHERE idgrupo = ?', [idgrupo]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    // Insertar un grupo
     insertarGrupo: async(nuevogrupo) => {
        try{
          const result = await pool.query("INSERT INTO grupos SET ? ", nuevogrupo);
          return result.insertId;

        }catch(error){
          console.error('Erro al insertar el registro', error);
        }
    },

    // Actualizar un grupo
    actualizarGrupo: async(idgrupo, actualizacion) => {
      try {
        const resultado = await pool.query('UPDATE grupos SET ? WHERE idgrupo = ?', [actualizacion, idgrupo]);
        return resultado.affectedRows > 0;  
      } catch (error) {
        console.log('Error al actualizar grupo', error);
      }
    },

    // Obtener grupo por ID
    obtenerGrupoPorID: async(idgrupo) => {
      try {
        const [grupo] = await pool.query('SELECT * FROM grupos WHERE idgrupo = ?', [idgrupo]);

        return grupo;
      } catch (error) {
        console.log('Ocurrio un problema al obtener informacion del grupo');
      }
    },

    // Asignar grupo
    asignarGrupo: async(asignacion) => {
      try {
        const result = await pool.query("INSERT INTO grupo_estudiantes SET ? ", asignacion);
        console.log('resultado: ', result)
        return result.insertId;

      } catch (error) {
        console.log('Ocurrio un problema al asignar el grupo', error);
      }
    }
}
