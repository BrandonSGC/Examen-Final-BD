// Variables
const btnBuscar = document.querySelector('#buscar');


// Events
document.addEventListener('DOMContentLoaded', () => {
    obtenerCiudades();
    btnBuscar.addEventListener('click', buscarVuelo);
});


// Funciones
function buscarVuelo(evt) {
    evt.preventDefault();
    
    // Limpiar html


    if (validarFormulario()) {
        obtenerVuelos();
    } else {
        const container = document.querySelector('.main__container');
        const p = document.createElement('p');
        p.className = 'alert';
        p.textContent = 'Por favor complete los campos.';
        container.appendChild(p);
        setTimeout( () => {
            container.removeChild(p);
        }, 3000)
    }
}


function validarFormulario() {
    // Seleccionamos los inputs.
    const ciudadOrigen = document.querySelector('#ciudadOrigen').value;
    const ciudadDestino = document.querySelector('#ciudadDestino').value;
    const fechaSalida = document.querySelector('#fechaSalida').value;

    return ciudadDestino != "" && ciudadOrigen != "" && fechaSalida != "";
}

// Funcion para obtener las ciudades desde el backend.
function obtenerCiudades() {
    fetch('/obtenerCiudades')
        .then(datos => datos.json())
        .then(ciudades => {
            ciudades.forEach(ciudad => {
                const {CiudadID, Nombre_de_la_ciudad, PaisID} = ciudad;

                // Seleccionamos el select donde vamos a insertar el option
                const select1 = document.querySelector('#ciudadOrigen');
                const select2 = document.querySelector('#ciudadDestino');

                // Creamos el option
                const option = document.createElement('option');
                option.value = CiudadID;
                option.textContent = Nombre_de_la_ciudad;
                
                const option2 = document.createElement('option');
                option2.value = CiudadID;
                option2.textContent = Nombre_de_la_ciudad;

                // Insertamos el option dentro del select.
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

    const data = {
        ciudadOrigen: ciudadOrigen,
        ciudadDestino: ciudadDestino,
        fechaSalida: fechaSalida,
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
            vuelos.forEach(vuelo => {
                const {VueloID, AeropuertoOrigen, AeropuertoDestino, FechaVuelo, HoraSalida, HoraLlegada, DescripcionTipoTarifa} = vuelo;
                console.log(`VueloID: ${VueloID}\nAeropuertoOrigen: ${AeropuertoOrigen}\nAeropuertoDestino ${AeropuertoDestino}\nFechaVuelo: ${FechaVuelo}\nHoraSalida ${HoraSalida}\nHoraLlegada ${HoraLlegada}\nTarifa: ${DescripcionTipoTarifa}`);

                const vuelos = document.querySelector('#vuelos');
                const flightCard = document.createElement('div')
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
                    <button class="form__button flightCard__button">Comprar</button>
                </div>
                `
                vuelos.appendChild(flightCard);
            });
        })
        .catch( (error) => console.error(error))
}