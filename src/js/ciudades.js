// Funcion para obtener los permisps desde el backend.
export function obtenerCiudades() {
    fetch('/obtenerCiudades')
        .then(datos => datos.json())
        .then(ciudades => {
            ciudades.forEach(ciudad => {
                const {CiudadID, Nombre_de_la_ciudad, PaisID} = ciudad;

                // Seleccionamos el select donde vamos a insertar el option
                const select = document.querySelector('#ciudad');

                // Creamos el option
                const option = document.createElement('option');
                option.value = CiudadID;
                option.textContent = Nombre_de_la_ciudad;

                // Insertamos el option dentro del select.
                select.appendChild(option);
            });
        })
        .catch( (error) => console.error(error))
}