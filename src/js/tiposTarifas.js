// Funcion para obtener los permisps desde el backend.
export function ObtenerTiposDeTarifas() {
    fetch('/ObtenerTiposDeTarifas')
        .then(datos => datos.json())
        .then(tiposTarifa => {
            tiposTarifa.forEach(tarifa => {
                const {TipoTarifaID, Descripción} = tarifa;

                // Seleccionamos los select donde vamos a insertar el option
                const select = document.querySelector('#tarifas');

                // Creamos el option
                const option = document.createElement('option');
                option.value = TipoTarifaID;
                option.textContent = Descripción;

                // Insertamos el option dentro del select.
                select.appendChild(option);
            });
        })
        .catch( (error) => console.error(error))
}