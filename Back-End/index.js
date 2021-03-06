const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Crear el servidor
const server = express();

// Base de datos
dbConnection()

// dir publico index.html
server.use( express.static('public') );

// Lectura y parseo del body del request
server.use(express.json());

// Rutas
server.use('/api/auth', require('./routes/auth'));


// Listening peticiones
server.listen(process.env.PORT, ()=>{
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})