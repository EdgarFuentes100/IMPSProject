const express = require('express');

//Inicializaciones
const app = express();

require('dotenv').config()

//Ajuste del servidor
app.set('port', process.env.PORT || 4500);

//Configuracion de rutas
app.use(require('./routes')); //Node automaticamente busca el index.js del modulo

//Inicializa el servidor
app.listen(app.get('port'),() => {
    console.log('Servidor iniciado en el puerto: ', app.get('port'));
});