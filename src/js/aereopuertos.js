// Funcion para obtener los permisps desde el backend.
export function obtenerAereopuertos() {
    fetch('/obtenerAereopuertos')
        .then(datos => datos.json())
        .then(aereopuertos => {
            aereopuertos.forEach(aereopuerto => {
                const {AeropuertoID, Nombre_del_aeropuerto, CiudadID} = aereopuerto;

                // Seleccionamos los select donde vamos a insertar el option
                const selectOrigen = document.querySelector('#origen');
                const selectDestino = document.querySelector('#destino');

                // Creamos el option
                const option = document.createElement('option');
                option.value = AeropuertoID;
                option.textContent = Nombre_del_aeropuerto;

                // Creamos el option2
                const option2 = document.createElement('option');
                option2.value = AeropuertoID;
                option2.textContent = Nombre_del_aeropuerto;

                // Insertamos el option dentro del select.
                selectOrigen.appendChild(option);
                selectDestino.appendChild(option2);
            });
        })
        .catch( (error) => console.error(error))
}