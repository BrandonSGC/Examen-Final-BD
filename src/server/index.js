// Import Express
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const {
  spRegistrarUsuario,
  spObtenerRoles,
  spObtenerPermisos,
  spObtenerCiudades,
  spObtenerPaises,
  spObtenerAereopuertos,
  spObtenerTiposDeTarifas,
  insertarRolAsync,
  insertarPermisoAsync,
  insertarTipoTarifa,
  insertarTarifaAsync,
  insertarMonedaAsync,
  insertarPaisAsync,
  insertarCiudadAsync,
  insertarAeropuertoAsync,
  configurarRolPermiso,
  insertarNuevoVuelo,
  spObtenerInfoVuelos,
  spLogin,
  getUserBalance,
  updateUserBalance,
  crearCuentaBancaria,
  spRegistrarUsuarioRolD,
} = require("../db/connection");

// Absolute Path
const path = require("path");
app.use(express.static(path.join(__dirname, "..")));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// API
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.post("/login", async (req, res) => {
  // Get data from form.
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const info = await spLogin(email, password);

    if (info.success) {
      res.json({
        success: true,
        message: "Se ha iniciado sesión correctamente!",
        userInfo: info.userInfo,
      });
    } else {
      res.json({ success: false, message: "Credenciales inválidas." });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Ha ocurrido un error en el servidor.",
    });
  }
});

app.get("/obtenerRoles", async (req, res) => {
  try {
    const roles = await spObtenerRoles();
    JSON.stringify(roles);
    res.json(roles);
  } catch (error) {
    console.log(error);
  }
});

app.get("/obtenerPermisos", async (req, res) => {
  try {
    const permisos = await spObtenerPermisos();
    JSON.stringify(permisos);
    res.json(permisos);
  } catch (error) {
    console.log(error);
  }
});

app.get("/obtenerPaises", async (req, res) => {
  try {
    const paises = await spObtenerPaises();
    JSON.stringify(paises);
    res.json(paises);
  } catch (error) {
    console.log(error);
  }
});

app.get("/obtenerCiudades", async (req, res) => {
  try {
    const ciudades = await spObtenerCiudades();
    JSON.stringify(ciudades);
    res.json(ciudades);
  } catch (error) {
    console.log(error);
  }
});

app.get("/obtenerAereopuertos", async (req, res) => {
  try {
    const aereopuertos = await spObtenerAereopuertos();
    JSON.stringify(aereopuertos);
    res.json(aereopuertos);
  } catch (error) {
    console.log(error);
  }
});

app.get("/ObtenerTiposDeTarifas", async (req, res) => {
  try {
    const tipoTarifas = await spObtenerTiposDeTarifas();
    JSON.stringify(tipoTarifas);
    res.json(tipoTarifas);
  } catch (error) {
    console.log(error);
  }
});

app.post("/ObtenerVuelos", async (req, res) => {
  const { ciudadOrigen, ciudadDestino, fechaSalida, personas, tarifas } =
    req.body;
  try {
    const vuelos = await spObtenerInfoVuelos(
      ciudadOrigen,
      ciudadDestino,
      fechaSalida,
      tarifas
    );
    if (vuelos === false) {
      res.json({ message: "No se encontraron vuelos" });
    } else {
      JSON.stringify(vuelos);
      res.json(vuelos);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/registrarUsuario", async (req, res) => {
  try {
    // Obtenemos los datos que envia el formulario.
    const {
      nombre,
      apellido,
      identificacion,
      email,
      contrasena,
      telefono,
      fechaNacimiento,
      rol,
    } = req.body;

    await spRegistrarUsuario(
      email,
      contrasena,
      rol,
      identificacion,
      nombre,
      apellido,
      fechaNacimiento,
      telefono
    );
    res.send("Usuario registrado con éxito!");
  } catch (error) {
    res.send(`Se ha producido un error al registrar el usuario. ${error}`);
  }
});

app.post("/registrarUsuarioRolD", async (req, res) => {
  try {
    // Obtenemos los datos que envia el formulario.
    const {
      nombre,
      apellido,
      identificacion,
      email,
      contrasena,
      telefono,
      fechaNacimiento,
    } = req.body;
    console.log(
      nombre,
      apellido,
      identificacion,
      email,
      contrasena,
      telefono,
      fechaNacimiento
    );

    await spRegistrarUsuarioRolD(
      email,
      contrasena,
      identificacion,
      nombre,
      apellido,
      fechaNacimiento,
      telefono
    );
    res.send("Usuario registrado con éxito!");
  } catch (error) {
    res.send(`Se ha producido un error al registrar el usuario. ${error}`);
  }
});

app.post("/registrarRoles", async (req, res) => {
  try {
    const { descripcion } = req.body;
    await insertarRolAsync(descripcion);
    res.send("Rol registrado con éxito!");
  } catch (error) {
    res.send(`Se ha producido un error al registrar el rol. ${error}`);
  }
});

app.post("/registrarPermiso", async (req, res) => {
  try {
    const { descripcion } = req.body;
    await insertarPermisoAsync(descripcion);
    res.send("Permiso registrado con éxito!");
  } catch (error) {
    res.send(`Se ha producido un error al registrar el permiso. ${error}`);
  }
});

app.post("/configurarRolPermiso", async (req, res) => {
  try {
    const { rol, permiso } = req.body;
    await configurarRolPermiso(rol, permiso);
    res.send("Configuración realizada con éxito!");
  } catch (error) {
    res.send(`Se ha producido un error en la configuración. ${error}`);
  }
});

app.post("/registrarTipoTarifa", async (req, res) => {
  try {
    const { descripcion } = req.body;
    await insertarTipoTarifa(descripcion);
    res.send("Tipo de tarifa registrado con éxito!");
  } catch (error) {
    res.send(
      `Se ha producido un error al registrar el Tipo de tarifa. ${error}`
    );
  }
});

app.post("/registrarMoneda", async (req, res) => {
  try {
    const { nombre, valor } = req.body;
    await insertarMonedaAsync(nombre, valor);
    res.send("Moneda registrada con éxito!");
  } catch (error) {
    res.send(`Se ha producido un error al registrar la moneda. ${error}`);
  }
});

app.post("/registrarPais", async (req, res) => {
  try {
    const { descripcion } = req.body;
    await insertarPaisAsync(descripcion);
    res.send("País registrado con éxito!");
  } catch (error) {
    res.send(`Se ha producido un error al registrar el país. ${error}`);
  }
});

app.post("/registrarCiudad", async (req, res) => {
  try {
    const { descripcion, pais } = req.body;
    await insertarCiudadAsync(descripcion, pais);
    res.send("Ciudad registrada con éxito!");
  } catch (error) {
    res.send(`Se ha producido un error al registrar la ciudad. ${error}`);
  }
});

app.post("/registrarAereopuerto", async (req, res) => {
  try {
    const { nombre, ciudad } = req.body;
    await insertarAeropuertoAsync(nombre, ciudad);
    res.send("Aeropuerto registrado con éxito!");
  } catch (error) {
    res.send(`Se ha producido un error al registrar el aeropuerto. ${error}`);
  }
});

app.post("/registrarVuelo", async (req, res) => {
  try {
    const { origen, destino, fechaVuelo, horaSalida, horaLlegada, tarifas } =
      req.body;

    console.log(origen, destino, fechaVuelo, horaSalida, horaLlegada, tarifas);

    await insertarNuevoVuelo(
      origen,
      destino,
      fechaVuelo,
      horaSalida,
      horaLlegada,
      tarifas
    );

    res.send("Vuelo registrado con éxito!");
  } catch (error) {
    res.send(`Se ha producido un error al registrar el Vuelo. ${error}`);
  }
});

app.post("/pagar", async (req, res) => {
  try {
    // Get all data needed
    let { tarjeta, fechaVencimiento, codigo, infoVuelo, userInfo } = req.body;
    tarjeta = tarjeta.replace(/\s/g, "");

    const {
      VueloID,
      AeropuertoOrigen,
      AeropuertoDestino,
      FechaVuelo,
      HoraSalida,
      HoraLlegada,
      DescripcionTipoTarifa,
      Precio,
      DetallesAerolinea,
      DuracionVuelo,
      cantidadPersonas,
    } = infoVuelo;

    const { UserID, Nombre, Email, NumeroTarjeta, Codigo, FechaVencimiento } =
      userInfo;

    // Precio Total:
    let total = Precio * cantidadPersonas;

    // Saldo del usuario:
    let saldo = await getUserBalance(UserID);

    const factura = `
            <h1>Flight CUC - Factura</h1>
            <h2>Usted ha comprado ${cantidadPersonas} voletos para la fecha ${formatDate(
      FechaVuelo
    )} con un monto total de: $${total}</h2>
            <h2>Esperamos que tengas un gran viaje ${Nombre}!</h2>
            <h3>Aereopuerto Origen: ${AeropuertoOrigen} <span>Hora Salida: ${formatTime(
      HoraSalida
    )}</span></h3>
            <h3>Aereopuerto Destino: ${AeropuertoDestino} <span>Hora Llegada: ${formatTime(
      HoraLlegada
    )}</span></h3>
        `;

    console.log(`Saldo del usuario: ${saldo}`);

    // Validate that is the correct data associated with user.
    if (
      NumeroTarjeta === tarjeta &&
      FechaVencimiento === fechaVencimiento &&
      Codigo === codigo
    ) {
      // Make purchase.
      if (saldo >= total) {
        console.log("Se puede hacer la compra.");

        // Actualizar saldo del usuario
        await updateUserBalance(UserID, total);

        // Send recipe to user email.
        sendEmail(Email, factura);

        // Response
        res.json({
          success: true,
          message: `Compra realizada, se ha enviado la factura a ${Email}.`,
        });
      } else {
        console.log("No se puede hacer la compra.");
        res.json({ success: false, message: `Fondos insuficientes....` });
      }
    } else {
      res.json({
        success: false,
        message: `Los datos de la tarjeta no son válidos.`,
      });
    }
  } catch (error) {
    console.log(`Se ha producido un error en el servidor... ${error}`);
    res.json({
      success: false,
      message: `Se ha producido un error en el servidor...`,
    });
  }
});

app.post("/cuentaBancaria", async (req, res) => {
  try {
    let { UserID, tarjeta, codigo, fechaVencimiento, saldo } = req.body;
    tarjeta = tarjeta.replace(/\s/g, "");

    console.log(UserID, tarjeta, codigo, fechaVencimiento, saldo);

    await crearCuentaBancaria(UserID, tarjeta, codigo, fechaVencimiento, saldo);

    res.json({ message: "Cuenta creada con éxito!" });
  } catch (error) {
    res.json({ message: "Se ha producido un error al crear la Cuenta" });
  }
});

// Funcions
async function sendEmail(destinatario, mensaje) {
  const nodemailer = require("nodemailer");

  // SMPTP Configuration
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bransti20@gmail.com",
      pass: "gxpssgblrkvrplsy",
    },
  });

  // Email configuration
  let info = await transporter.sendMail({
    from: "bransti20@gmail.com",
    to: destinatario,
    subject: "CUC Flight- Factura Voletos",
    html: mensaje,
  });

  console.log(`Correo enviado. Key del correo: ${info.messageId}`);
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
}

function formatTime(timeString) {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = new Date(timeString).toLocaleTimeString(
    "en-US",
    options
  );
  return formattedTime;
}
