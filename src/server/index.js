/* En este archivo vamos a tener la programacion del servidor y 
donde vamos a manejar todas las solicitudes de la API que vamos
a crear con Express. */

// Import Express
const express = require("express");
const app = express();

const bodyParser = require('body-parser');
// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importamos las funciones que estabamos exportando desde el archivo de "connection.js".
const { spRegistrarUsuario, spObtenerRoles, spObtenerPermisos, spObtenerCiudades, spObtenerPaises, spObtenerAereopuertos, spObtenerTiposDeTarifas, insertarRolAsync, insertarPermisoAsync, insertarTipoTarifa, insertarTarifaAsync, insertarMonedaAsync, insertarPaisAsync, insertarCiudadAsync, insertarAeropuertoAsync, configurarRolPermiso, insertarNuevoVuelo, spObtenerInfoVuelos, spLogin } = require('../db/connection');

// Absolute Path
const path = require("path");
app.use(express.static(path.join(__dirname, "..")));


// Puerto que vamos a usar para el servidor (pueden cambiarlo).
const PORT = 3000;
// Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})


// API
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});


app.post('/login', async (req, res) => {
    // Get data from form.
    const { email, password } = req.body;
    
    console.log( email, password );

    try {
        const info = await spLogin(email, password);

        if (info.success) {
            res.json({success: true, message:'Se ha iniciado sesión correctamente!', userInfo: info.userInfo});
        } else {
            res.json({success: false, message:'Credenciales inválidas.'});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message:'Ha ocurrido un error en el servidor.'});
    }
});


app.get('/obtenerRoles', async (req, res) => {
    try {
        const roles = await spObtenerRoles();
        JSON.stringify(roles);
        res.json(roles);   
    } catch (error) {
        console.log(error);
    }
});

app.get('/obtenerPermisos', async (req, res) => {
    try {
        const permisos = await spObtenerPermisos();
        JSON.stringify(permisos);
        res.json(permisos);
    } catch (error) {
        console.log(error);
    }
});

app.get('/obtenerPaises', async (req, res) => {
    try {
        const paises = await spObtenerPaises();
        JSON.stringify(paises);
        res.json(paises);
    } catch (error) {
        console.log(error);
    }
});

app.get('/obtenerCiudades', async (req, res) => {
    try {
        const ciudades = await spObtenerCiudades();
        JSON.stringify(ciudades);
        res.json(ciudades);
    } catch (error) {
        console.log(error);
    }
});

app.get('/obtenerAereopuertos', async (req, res) => {
    try {
        const aereopuertos = await spObtenerAereopuertos();
        JSON.stringify(aereopuertos);
        res.json(aereopuertos);
    } catch (error) {
        console.log(error);
    }
});

app.get('/ObtenerTiposDeTarifas', async (req, res) => {
    try {
        const tipoTarifas = await spObtenerTiposDeTarifas();
        JSON.stringify(tipoTarifas);
        res.json(tipoTarifas);
    } catch (error) {
        console.log(error);
    }
});


app.post('/ObtenerVuelos', async (req, res) => {
    const { ciudadOrigen, ciudadDestino, fechaSalida, personas, tarifas} = req.body;
    try {
        const vuelos = await spObtenerInfoVuelos(ciudadOrigen, ciudadDestino, fechaSalida, tarifas)
        if (vuelos === false) {
            res.json({message: 'No se encontraron vuelos'});
        } else {
            JSON.stringify(vuelos);
            res.json(vuelos);
        }
    } catch (error) {
        console.log(error);
    }
});


app.post('/registrarUsuario', async (req, res) => {
    try {
        // Obtenemos los datos que envia el formulario.
        const { nombre, apellido, identificacion, email, contrasena, telefono, fechaNacimiento, rol} = req.body;

        await spRegistrarUsuario(email, contrasena, rol, identificacion, nombre, apellido, fechaNacimiento, telefono);
        res.send('Usuario registrado con éxito!');

    } catch (error) {
        res.send(`Se ha producido un error al registrar el usuario. ${error}`);
    }
});


app.post('/registrarRoles', async (req, res) => {
    try {
        const { descripcion } = req.body;
        await insertarRolAsync(descripcion);
        res.send('Rol registrado con éxito!');
    } catch (error) {
        res.send(`Se ha producido un error al registrar el rol. ${error}`);
    }
});

app.post('/registrarPermiso', async (req, res) => {
    try {
        const { descripcion } = req.body;
        await insertarPermisoAsync(descripcion);
        res.send('Permiso registrado con éxito!');
    } catch (error) {
        res.send(`Se ha producido un error al registrar el permiso. ${error}`);
    }
});

app.post('/configurarRolPermiso', async (req, res) => {
    try {
        const { rol, permiso } = req.body;
        await configurarRolPermiso(rol, permiso);
        res.send('Configuración realizada con éxito!');
    } catch (error) {
        res.send(`Se ha producido un error en la configuración. ${error}`);
    }
});

app.post('/registrarTipoTarifa', async (req, res) => {
    try {
        const { descripcion } = req.body;
        await insertarTipoTarifa(descripcion);
        res.send('Tipo de tarifa registrado con éxito!');
    } catch (error) {
        res.send(`Se ha producido un error al registrar el Tipo de tarifa. ${error}`);
    }
});

app.post('/registrarMoneda', async (req, res) => {
    try {
        const { nombre, valor } = req.body;
        await insertarMonedaAsync(nombre, valor);
        res.send('Moneda registrada con éxito!');
    } catch (error) {
        res.send(`Se ha producido un error al registrar la moneda. ${error}`);
    }
});

app.post('/registrarPais', async (req, res) => {
    try {
        const { descripcion } = req.body;
        await insertarPaisAsync(descripcion);
        res.send('País registrado con éxito!');
    } catch (error) {
        res.send(`Se ha producido un error al registrar el país. ${error}`);
    }
});


app.post('/registrarCiudad', async (req, res) => {
    try {
        const { descripcion, pais } = req.body;
        await insertarCiudadAsync(descripcion, pais);
        res.send('Ciudad registrada con éxito!');
    } catch (error) {
        res.send(`Se ha producido un error al registrar la ciudad. ${error}`);
    }
});


app.post('/registrarAereopuerto', async (req, res) => {
    try {
        const { nombre, ciudad } = req.body;
        await insertarAeropuertoAsync(nombre, ciudad);
        res.send('Aeropuerto registrado con éxito!');
    } catch (error) {
        res.send(`Se ha producido un error al registrar el aeropuerto. ${error}`);
    }
});


app.post('/registrarVuelo', async (req, res) => {
    try {
        const { origen, destino, fechaVuelo, horaSalida, horaLlegada, tarifas } = req.body;

        console.log(origen, destino, fechaVuelo, horaSalida, horaLlegada, tarifas)

        await insertarNuevoVuelo(origen, destino, fechaVuelo, horaSalida, horaLlegada, tarifas);

        res.send('Vuelo registrado con éxito!');
    } catch (error) {
        res.send(`Se ha producido un error al registrar el Vuelo. ${error}`);
    }
});


app.post('/pagar', async(req, res) => {
    try {
        let { tarjeta, fechaVencimiento, codigo, infoVuelo } = req.body;
        tarjeta = tarjeta.replace(/\s/g, '');

        const {VueloID, AeropuertoOrigen, AeropuertoDestino, FechaVuelo, HoraSalida, HoraLlegada, DescripcionTipoTarifa, Precio, DetallesAerolinea, DuracionVuelo, cantidadPersonas} = infoVuelo;

        // Precio Total:
        let total = Precio * cantidadPersonas;

        console.log(`El total a pagar es: ${total}`);

        //
    } catch (error) {
        console.log(error);
    }
});