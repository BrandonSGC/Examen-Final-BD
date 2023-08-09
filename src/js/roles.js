// Funcion para obtener los roles desde el backend.
export function obtenerRoles() {
    fetch('/obtenerRoles')
        .then(datos => datos.json())
        .then(roles => {
            roles.forEach(rol => {
                const {RolID, Descripción_del_rol} = rol;
                console.log(`Id: ${RolID}, Rol: ${Descripción_del_rol}`);

                // Seleccionamos el select donde vamos a insertar el option
                const select = document.querySelector('#rol');

                // Creamos el option
                const option = document.createElement('option');
                option.value = RolID;
                option.textContent = Descripción_del_rol;

                // Insertamos el option dentro del select.
                select.appendChild(option);
            });
        })
        .catch( (error) => console.error(error))
}