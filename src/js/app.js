// Variables
const btnBuscar = document.querySelector('#buscar');


// Events
document.addEventListener('DOMContentLoaded', () => {
    obtenerCiudades();
    btnBuscar.addEventListener('click', buscarVuelo);
});


// Funciones
function buscarVuelo() {
    validarFormulario();
}

function validarFormulario() {
    
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