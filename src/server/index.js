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
const {spRegistrarUsuario, spObtenerRoles, spObtenerPermisos, spObtenerCiudades, spObtenerPaises, spObtenerAereopuertos, spObtenerTiposDeTarifas, spObtenerInfoVuelo/* Aqui ponemos los otros nombres de las funciones que ocupemos.*/} = require('../db/connection');

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


app.get('/ObtenerInfoVuelo', async (req, res) => {
    try {
        const infoVuelo = await spObtenerInfoVuelo();
        JSON.stringify(infoVuelo);
        res.json(infoVuelo);
    } catch (error) {
        console.log(error);
    }
});


app.post('/registrarUsuario', async (req, res) => {
    try {
        // Obtenemos los datos que envia el formulario.
        const { nombre, apellido, identificacion, email, contrasena, telefono, fechaNacimiento, rol} = req.body;

        // Imprimo los datos para verificar que esten correctos.
        console.log(nombre);
        console.log(apellido);
        console.log(identificacion);
        console.log(email);
        console.log(contrasena);
        console.log(telefono);
        console.log(fechaNacimiento);
        console.log(rol);

        // Llamamos la funcion del archivo "connection.js" para ejecutar el prpocedimiento almacenado (Registrar Usuario).
        await spRegistrarUsuario(email, contrasena, rol, identificacion, nombre, apellido, fechaNacimiento, telefono);
        res.send('Usuario registrado con éxito!');

    } catch (error) {
        res.send(`Se ha producido un error al registrar el usuario. ${error}`);
    }
});