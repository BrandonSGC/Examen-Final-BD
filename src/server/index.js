/* En este archivo vamos a tener la programacion del servidor y 
donde vamos a manejar todas las solicitudes de la API que vamos
a crear con Express. */

// Import Express
const express = require("express");
const app = express();

// Import functions from "connection.js"
const {} = require('../db/connection');

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
})
