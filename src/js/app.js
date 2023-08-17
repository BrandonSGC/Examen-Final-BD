import { ObtenerTiposDeTarifas } from "./tiposTarifas.js";

// Variables
const btnBuscar = document.querySelector('#buscar');
const vuelosContainer = document.querySelector('#vuelos');


// Events
document.addEventListener('DOMContentLoaded', () => {
    obtenerCiudades();
    ObtenerTiposDeTarifas();
    btnBuscar.addEventListener('click', buscarVuelo);
});


// Funciones
function buscarVuelo(evt) {
    evt.preventDefault();

    limpiarHTML();

    if (validarFormulario()) {
        obtenerVuelos();
    } else {
        alert('Por favor complete los campos.');
    }
}

function limpiarHTML() {
    
    while (vuelosContainer.firstChild) {
        vuelosContainer.removeChild(vuelosContainer.firstChild);
    }
}

function alert(message) {
    const container = document.querySelector('.main__container');;
    const p = document.createElement('p');
    p.className = 'alert';
    p.textContent = message;
    container.appendChild(p);
    setTimeout( () => {
        container.removeChild(p);
    }, 3000)
}


function validarFormulario() {
    // Seleccionamos los inputs.
    const ciudadOrigen = document.querySelector('#ciudadOrigen').value;
    const ciudadDestino = document.querySelector('#ciudadDestino').value;
    const fechaSalida = document.querySelector('#fechaSalida').value;

    const personas = document.querySelector('#personas').value;
    const tarifa = document.querySelector('#tarifas').value;

    return ciudadDestino != "" && ciudadOrigen != "" && fechaSalida != "", personas != "" && tarifa != "";
}

// Funcion para obtener las ciudades desde el backend.
function obtenerCiudades() {
    fetch('/obtenerCiudades')
        .then(datos => datos.json())
        .then(ciudades => {
            ciudades.forEach(ciudad => {
                const {CiudadID, Nombre_de_la_ciudad, PaisID} = ciudad;

                const select1 = document.querySelector('#ciudadOrigen');
                const select2 = document.querySelector('#ciudadDestino');

                const option = document.createElement('option');
                option.value = CiudadID;
                option.textContent = Nombre_de_la_ciudad;
                
                const option2 = document.createElement('option');
                option2.value = CiudadID;
                option2.textContent = Nombre_de_la_ciudad;

                select1.appendChild(option);
                select2.appendChild(option2);
            });
        })
        .catch( (error) => console.error(error))
}

function obtenerVuelos() {
    const ciudadOrigen = document.getElementById("ciudadOrigen").value;
    const ciudadDestino = document.getElementById("ciudadDestino").value;
    const fechaSalida = document.getElementById("fechaSalida").value;

    const personas = document.getElementById("personas").value;
    const tarifas = document.getElementById("tarifas").value;

    const data = {
        ciudadOrigen: ciudadOrigen,
        ciudadDestino: ciudadDestino,
        fechaSalida: fechaSalida,
        personas: personas,
        tarifas: tarifas
    };

    fetch('/ObtenerVuelos', {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(datos => datos.json())
        .then(vuelos => {
            if (vuelos.message === "No se encontraron vuelos") {
                alert('No se encontraron vuelos...');
            } else {
                mostrarVuelos(vuelos);
            }
            
        })
        .catch( (error) => console.error(error))
}

function mostrarVuelos(vuelos) {
    vuelos.forEach(vuelo => {
        console.log(vuelo);

        const {VueloID, AeropuertoOrigen, AeropuertoDestino, FechaVuelo, HoraSalida, HoraLlegada, DescripcionTipoTarifa, Precio, DetallesAereolinea, DuracionVuelo} = vuelo;

        const vuelos = document.querySelector('#vuelos');
        const flightCard = document.createElement('div')

        const cantPersonas = parseInt(document.getElementById("personas").value);

        vuelo.cantidadPersonas = cantPersonas;
        // Convert object to save it in local storage.
        let infoVuelo = JSON.stringify(vuelo);

        // Save the json in local storage
        localStorage.setItem('infoVuelo', infoVuelo);

        flightCard.className = 'flightCard';
        flightCard.innerHTML = `
        <div class="flightCard__field flightCard__field--flight">
            <div class="flightCard__origin">
                <h3>${AeropuertoOrigen}</h3>
                <p>${HoraSalida}</p>
            </div>
            <img class="flightCard__image" src="./img/plane.png" alt="Plane">
            <div class="flightCard__origin">
                <h3>${AeropuertoDestino}</h3>
                <p>${HoraLlegada}</p>
            </div>
        </div>
        <div class="flightCard__field flightCard__field--buy">
            <h3>Tarifa: <span>${DescripcionTipoTarifa}</span></h3>
            <p class="flightCard__price"><span id="price">Cantidad de boletos: </span>${cantPersonas}</p>
            <p class="flightCard__price"><span id="price">Total a pagar: $</span>${Precio * cantPersonas}</p>
            <a href="../completarCompra.html" class="form__button flightCard__button">Comprar</a>
        </div>
        `
        vuelos.appendChild(flightCard);
    });
}