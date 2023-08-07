/* En este archivo vamos a trabajar todo respecto a la base 
de datos, como por ejemplo la conexion, funciones para 
obtener / enviar datos a la DB etc...*/

// Database Connection
/* Este es un "object literal" basicamente un simple objeto
donde tienen que poner su usuario, password y el nombre de 
la base de datos para que les funcione su conexion. */
const config = {
    user: "sa",
    password: "root",
    server: "localhost",
    database: "Amazon",
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
};


// Functions
