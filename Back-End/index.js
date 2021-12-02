const express = require('express');
const { dbConnection } = require('./database/config');
const path = require('path')
require('dotenv').config();
const cors = require('cors');

// Crear el servidor
const server = express();

// Base de datos
dbConnection()

//CORS
server.use(cors())

// dir publico index.html
server.use( express.static('public') );
// Lectura y parseo del body del request
server.use(express.json());

// Rutas
server.use('/api/auth', require('./routes/auth'));
server.use('/api/salas', require('./routes/salas'));
server.use('/api/bloques', require('./routes/bloques'));
server.use('/api/usuarios', require('./routes/usuarios'));
server.use('/api/modulos', require('./routes/modulos'));
server.use('/api/clases', require('./routes/clases'));
server.use('/api/instituciones', require('./routes/instituciones'));
//catch-all, permite redirigir las rutas del react router al cliente
server.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Listening peticiones
server.listen(process.env.PORT, ()=>{
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})