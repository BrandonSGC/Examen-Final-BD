// Funcion para obtener los permisps desde el backend.
export function obtenerPermisos() {
    fetch('/obtenerPermisos')
        .then(datos => datos.json())
        .then(permisos => {
            permisos.forEach(permiso => {
                const {PermisoID, Descripción_del_permiso} = permiso;

                // Seleccionamos el select donde vamos a insertar el option
                const select = document.querySelector('#permiso');

                // Creamos el option
                const option = document.createElement('option');
                option.value = PermisoID;
                option.textContent = Descripción_del_permiso;

                // Insertamos el option dentro del select.
                select.appendChild(option);
            });
        })
        .catch( (error) => console.error(error))
}