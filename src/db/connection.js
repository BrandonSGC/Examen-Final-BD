/* En este archivo vamos a trabajar todo respecto a la base 
de datos, como por ejemplo la conexion, funciones para 
obtener / enviar datos a la DB etc...*/
const sql = require("mssql");
// Database Connection
/* Este es un "object literal" basicamente un simple objeto
donde tienen que poner su usuario, password y el nombre de 
la base de datos para que les funcione su conexion. */
const config = {
    user: "sa",
    password: "root",
    server: "localhost",
    database: "ExamenFinalBD",
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
};


// Functions

async function spObtenerRoles() {
  try {
    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .execute("ConsultarRoles");

    if (result.recordset.length > 0) {
      return result.recordset;
      pool.close();
    } else {
      return 'No se han encontrado datos';
    }
  } catch {
    console.error("Error al obtener los roles.");
  }
}

async function spRegistrarUsuario(email, contrasena, rolID, identificacion, nombre, apellido, fechaNacimiento, telefono) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("Email", sql.VarChar(100), email)
      .input("Contraseña", sql.VarChar(100), contrasena)
      .input("RolID", sql.Int, rolID)
      .input("Identificacion", sql.VarChar(20), identificacion)
      .input("Nombre", sql.VarChar(50), nombre)
      .input("Apellido", sql.VarChar(50), apellido)
      .input("Fecha_de_nacimiento", sql.Date, fechaNacimiento)
      .input("Número_de_teléfono", sql.VarChar(20), telefono)
      // Este es el nombre del procedimiento almacenado que vamos a llamar.
      .execute("RegistrarUsuario");
      console.log('Usuario registrado correctamente!')

    pool.close();
  } catch (err) {
    console.error("Error executing the stored procedure spRegistrarUsuario:", err);
  }
}



// Aqui ponemos las funciones que vamos a exportar para luego usar estas funciones en el archivo que ocupemos. En este caso el "index.js"
module.exports = {
  spRegistrarUsuario,
  spObtenerRoles,
  // Aqui solo pone el nombre de la funcion y la coma y ya.
};