# Proyecto MeAnoto!

## Primeros Pasos
- Inicializar el package.json desde 0.
  ```npm init -y```

- Crear index.js
- Instalar nodemon
  ```npm i nodemon -g```

- Agregar los scripts principales al package.json.
  ```
  "dev": "nodemon index.js" -> script para levantar el servidor en desarrollo.
  "start":"node index.js" -> script para levantar el servidor en producción.
  ```

#### Config express

- Instalar express js.
  ```npm i express```
- llenar archivo index.js con configuracion del server.
- Instalar dotenv y definir variables de entorno .env
  ```npm i dotenv```

#### Routes

- Crear directorio routes donde se almacenaran las peticiones con sus url.

#### Controladores

- Crear directorio de controllers y agregar los controladores para la logica de cada ruta.


## Base de Datos
#### Mongo Atlas
- Creacion de Cluster en MongoDB Atlas.
- Crear usuario de Database.
- Agregar String de conexion a .env y conectarse con Mongo Compass.
#### Configurar mongo en Node
- Instalar mongoose para poder trabajar con base de datos mongo.
  ```npm i mongoose```
- Crear directorio de modelos donde se guardaran los modelos de mongo.


## Utils
#### Validar Campos
- Validación de campos del body con express-validator
  ```npm i express-validator```
- Crear middleware validar-campos que se encarga de gestionar los errores generados y responder con el error 400 correspondiente.