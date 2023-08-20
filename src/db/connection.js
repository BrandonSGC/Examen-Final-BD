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
    // port: 19630,
    database: "ExamenFinalBD",
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
};


// Functions


async function spLogin(email, password) {
  try {
    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .input("Email", sql.VarChar(100), email)
      .input("Contraseña", sql.VarChar(50), password)
      .execute("InfoUsuarioxEmailYContraseña");

    if (result.recordset.length > 0) {
      const Info = {
        success: true,
        userInfo: result.recordset[0]
      }
      return Info;
    }
    return false;
  } catch (error) {
    console.error(`Error executing spPetCare_Login: ${error}.`);
    return false;
  }
}

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
      return 'No se han encontrado roles.';
    }
  } catch {
    console.error("Error al obtener los roles.");
  }
}

async function spObtenerPermisos() {
  try {
    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .execute("ConsultarPermisos");

    if (result.recordset.length > 0) {
      return result.recordset;
      pool.close();
    } else {
      return 'No se han encontrado permisos';
    }
  } catch {
    console.error("Error al obtener los permisos.");
  }
}

async function spObtenerPaises() {
  try {
    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .execute("ConsultarPaises");

    if (result.recordset.length > 0) {
      return result.recordset;
      pool.close();
    } else {
      return 'No se han encontrado paises.';
    }
  } catch {
    console.error("Error al obtener los paises.");
  }
}

async function spObtenerCiudades() {
  try {
    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .execute("ConsultarCiudades");

    if (result.recordset.length > 0) {
      return result.recordset;
      pool.close();
    } else {
      return 'No se han encontrado ciudades.';
    }
  } catch {
    console.error("Error al obtener las ciudades.");
  }
}

async function spObtenerAereopuertos() {
  try {
    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .execute("ConsultarAereopuertos");

    if (result.recordset.length > 0) {
      return result.recordset;
      pool.close();
    } else {
      return 'No se han encontrado aereopuertos.';
    }
  } catch {
    console.error("Error al obtener aereopuertos.");
  }
}

async function spObtenerTiposDeTarifas() {
  try {
    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .execute("ConsultarTiposDeTarifas");

    if (result.recordset.length > 0) {
      return result.recordset;
      pool.close();
    } else {
      return 'No se han encontrado Tipos de Tarifas.';
    }
  } catch {
    console.error("Error al obtener los Tipos de Tarifas.");
  }
}

// Inserts
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

// Inserts Yeison:


async function insertarRolAsync(descripcionRol) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("Descripción_del_rol", sql.VarChar(100), descripcionRol)
      .execute("InsertarRol");
    
    console.log('Rol insertado correctamente!')

    pool.close();
  } catch (err) {
    console.error("Error al insertar el rol:", err);
  }
}

async function insertarPermisoAsync(descripcionPermiso) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("Descripción_del_permiso", sql.VarChar(100), descripcionPermiso)
      .execute("InsertarPermiso");
    
    console.log('Permiso insertado correctamente!')

    pool.close();
  } catch (err) {
    console.error("Error al insertar el permiso:", err);
  }
}

async function configurarRolPermiso(rolID, permisoID) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("RolID", sql.Int, rolID)
      .input("PermisoID", sql.Int, permisoID)
      .execute("ConfigurarRolesPermisos");
    
    console.log('Configuracion realizada correctamente!')

    pool.close();
  } catch (err) {
    console.error("Error al configurar el rol - permiso:", err);
  }
}

async function insertarTipoTarifa(descripcionTipoTarifa) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("Descripción", sql.VarChar(100), descripcionTipoTarifa)
      .execute("InsertarTipoTarifa");
    
    console.log('Tipo de Tarifa insertado correctamente!')

    pool.close();
  } catch (err) {
    console.error("Error al insertar el Tipo de Tarifa:", err);
  }
}

// Falta hacer el formulario de esta.
async function insertarTarifaAsync(vueloID, tipoTarifaID, precio) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("VueloID", sql.Int, vueloID)
      .input("TipoTarifaID", sql.Int, tipoTarifaID)
      .input("Precio", sql.Decimal(10, 2), precio)
      .execute("InsertarTarifa");
    
    console.log('Tarifa insertada correctamente!')

    pool.close();
  } catch (err) {
    console.error("Error al insertar la tarifa:", err);
  }
}


async function insertarMonedaAsync(nombre, valor) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("Nombre", sql.VarChar(30), nombre)
      .input("Valor", sql.Decimal(10, 2), valor)
      .execute("InsertarMoneda");
    
    console.log('Moneda insertada correctamente!')

    pool.close();
  } catch (err) {
    console.error("Error al insertar la moneda:", err);
  }
}

async function insertarPaisAsync(nombrePais) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("Nombre_del_país", sql.VarChar(100), nombrePais)
      .execute("InsertarPais");
    
    console.log('País insertado correctamente!')

    pool.close();
  } catch (err) {
    console.error("Error al insertar el país:", err);
  }
}

async function insertarCiudadAsync(nombreCiudad, paisID) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("Nombre_de_la_ciudad", sql.VarChar(100), nombreCiudad)
      .input("PaisID", sql.Int, paisID)
      .execute("InsertarCiudad");
    
    console.log('Ciudad insertada correctamente!')

    pool.close();
  } catch (err) {
    console.error("Error al insertar la ciudad:", err);
  }
}

async function insertarAeropuertoAsync(nombreAeropuerto, ciudadID) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("Nombre_del_aeropuerto", sql.VarChar(100), nombreAeropuerto)
      .input("CiudadID", sql.Int, ciudadID)
      .execute("InsertarAeropuerto");
    
    console.log('Aeropuerto insertado correctamente!')

    pool.close();
  } catch (err) {
    console.error("Error al insertar el aeropuerto:", err);
  }
}

async function insertarNuevoVuelo(origen, destino, fechaVuelo, horaSalida, horaLlegada, tipoTarifa) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("IdAereopuertoOrigen", sql.Int, origen)
      .input("IdAereopuertoDestino", sql.Int, destino)
      .input("FechaVuelo", sql.Date, fechaVuelo)
      .input("HoraSalida", horaSalida)
      .input("HoraLlegada", horaLlegada)
      .input("IdTipoTarifa", sql.Int, tipoTarifa)
      .execute("CreaNuevoVuelo");
    
    console.log('Nuevo vuelo creado correctamente!')

    pool.close();
  } catch (err) {
    console.error("Error al crear el vuelo:", err);
  }
}


async function spObtenerInfoVuelos(CiudadOrigenID, CiudadDestinoID, fechaSalida, TipoTarifaID) {
  try {
    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .input('CiudadOrigenID', sql.Int, CiudadOrigenID)
      .input('CiudadDestinoID', sql.Int, CiudadDestinoID)
      .input('fechaSalida', sql.Date, fechaSalida)
      .input('TipoTarifaID', sql.Int, TipoTarifaID)
      .execute("ObtenerInfoVuelos");

    if (result.recordset.length > 0) {
      pool.close();
      return result.recordset;
    } else {
      return false;
    }
  } catch {
    console.error("Error al obtener los Vuelos.");
  }
}


module.exports = {
  spRegistrarUsuario,
  spObtenerRoles,
  spObtenerPermisos,
  spObtenerCiudades,
  spObtenerPaises,
  spObtenerAereopuertos,
  spObtenerTiposDeTarifas,
  insertarRolAsync,
  insertarPermisoAsync,
  insertarTarifaAsync,
  insertarTipoTarifa,
  insertarMonedaAsync,
  insertarPaisAsync,
  insertarCiudadAsync,
  insertarAeropuertoAsync,
  configurarRolPermiso,
  insertarNuevoVuelo,
  spObtenerInfoVuelos,
  spLogin,
};