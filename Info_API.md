# API Me Anoto
---
Cada una de las consultas se llaman al backend concatenando la BASE URL + RUTA API, por ejemplo:

- Para crear Estudiante:

  - local host:
    ```
    http://localhost:4040/api/auth/new
    ```
  - en Heroku:
    ```
    https://me-anoto.herokuapp.com/api/auth/new
    ```

En este caso la URL BASE es `<host>/api` y la RUTA API es `/auth/new`. Desde el front se deben concatenar estos parametros para llamar correctamente a cualquier api.
### 1. Autenticación 

#### crearEstudiante

Consulta para crear un estudiante en la base de datos.

- Ruta: /auth/new
- Tipo: POST
- Parametros:
  - BODY:
    ```
    {
      nombre: String
      email: String
      pass: String
    }
    ```

- Respuesta: 
  
  - Ok:
  ```
  {
    ok: true
    msg: registro
    uid: <Id de usuario>
    nombre: <Nombre de usuario>
    token: <Token>
  }
  ```
  - Error: 
    ```
    {
      ok: false
      msg: <Error>
    }
    ```
  

#### loginUsuario

Consulta para autenticar cualquier usuario en la aplicación.

- Ruta: api/auth/
- Tipo: POST
- Parametros:
  - body:
    ```
    {
      email: String
      pass: String
    }
    ```

- Respuesta: 
  
  - Ok:
  ```
  {
    ok: true
    msg: Inicio de sesion correcto
    uid: <Id de usuario>
    nombre: <Nombre de usuario>
    token: <Token>
  }
  ```
  - Error: 
    ```
    {
      ok: false
      msg: <Error>
    }
    ```

#### revalidarToken

Consulta para revalidar el token del usuario. Crea un token nuevo con los datos del usuario y lo retorna.

- Ruta: /auth/renew
- Tipo: GET
- Parametros:
  - body:
    ```
    {
      uid: MongoId
      name: String
    }
    ```

- Respuesta: 
  
  - Ok:
  ```
  {
    ok: true
    msg: Token valido
    uid: <Id de usuario>
    nombre: <Nombre de usuario>
    token: <Token>
  }
  ```


### 2. Usuarios
#### crearUsuario

Consulta para crear un usuario en la base de datos.

- Ruta: /usuarios
- Tipo: POST
- Parametros:
  - body:
    ```
    {
      nombre: String
      email: String
      pass: String
      rol: String
    }
    ```

- Respuesta: 
  
  - Ok:
  ```
  {
    ok: true
    msg: registro
    uid: <Id de usuario>
    nombre: <Nombre de usuario>
    token: <Token>
  }
  ```
  - Error: 
  ```
  {
    ok: false
    msg: <Error>
  }
  ```
  
#### actualizarUsuario

Consulta para actualizar los datos de un usuario a la base de datos.

- Ruta: /usuarios/:id
- Tipo: PUT
- Parametros: 
  - id: la Id del usuario debe venir como un parametro de la url,  **ejemplo: /usuarios/616b5ebe24722bd37f3c9bda**
  - body: Los campos que se quieran actualizar, no es necesario que sean los 4 juntos.
  ```
  {
    nombre: String
    email: String
    pass: String
    rol: String
  }
  ```
  

- Respuesta: 
  
  - Ok:
  ```
  {
    ok: true
    msg: registro
    uid: <Id de usuario>
    nombre: <Nombre de usuario>
    token: <Token>
  }
  ```
  - Error: 
  ```
  {
    ok: false
    msg: <Error>
  }
  ```

#### eliminarUsuario

#### getUsuarios


### 3. Salas
#### crearSala

#### getSala

#### getSalas

#### actualizarSala

#### eliminarSala

#### agregarBloqueOcupado
### 4. Modulos

#### crearModulo

#### actualizarModulo

#### getModulos

#### eliminarModulo


### 5. Clases

#### crearClase

#### getClases

#### getClasesModulo

#### actualizarClase

#### eliminarClase