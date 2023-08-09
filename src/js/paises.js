// Funcion para obtener los permisps desde el backend.
export function obtenerPaises() {
    fetch('/obtenerPaises')
        .then(datos => datos.json())
        .then(paises => {
            paises.forEach(pais => {
                const {PaisID, Nombre_del_país} = pais;

                // Seleccionamos el select donde vamos a insertar el option
                const select = document.querySelector('#pais');

                // Creamos el option
                const option = document.createElement('option');
                option.value = PaisID;
                option.textContent = Nombre_del_país;

                // Insertamos el option dentro del select.
                select.appendChild(option);
            });
        })
        .catch( (error) => console.error(error))
}