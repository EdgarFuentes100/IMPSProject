const mysql = require('mysql2');
const { promisify } = require('util');
const { database } = require('./keys');
const { CONSTANTS } = require('../utils/utils');
const { query } = require('express');

//se crea conexion con l base de datos
const pool = mysql.createPool(database);

//Iniciando conexion con la base de datos
pool.getConnection((error, conexion) =>{
    //Validar si la conexion tiene algun error
    if(error){
        //Validando codigos de errores
        switch(error.code){
            case CONSTANTS.PROTOCOL_CONNECTION_LOST: ///Indica que la conexion con la bd esta perdida
                console.error('DATABASE CONNECTION WAS CLOSED');
                break;
            case CONSTANTS.ER_ACCESS_DENIED_ERROR: ///Indica que existe demasadias conexiones
                console.error('DATABASE HAS TO MANY CONNECTIONS');
                break;
            case CONSTANTS.ECONNREFUSED: /// Indica que la conexion fue rechazada
                console.error('DATABASE CONNECTIONS WAS REFUSED');
                break;   
            case CONSTANTS.ER_ACCESS_DENIED_ERROR: /// Indica que el acceso fue denegado
                console.error('ACCESS DENIED FOR USE');
                break;
            default:
                console.error('Error de base de datos no encontrado');
                break;
        }
    }

    //SI LA CONEXION ES EXITOSA
    if(conexion){
        console.log('Conexion establecida con la base de datos');
        conexion.release();
    }

    return;
} );

// Configurando PROMISY para permitir en cada consulta un async/await (promesas)
pool.query = promisify(pool.query);

module.exports = pool;