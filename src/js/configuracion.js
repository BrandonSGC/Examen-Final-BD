const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
const menuList = document.querySelector('.menu__list');

if (isAdmin) {
    menuList.innerHTML = `
        <li class="menu__item">
        <a class="menu__link" href="./mantenimientoUsuarios.html">Mantenimiento de Usuarios</a>
        </li>

        <li class="menu__item">
        <a class="menu__link" href="./mantenimientoRoles.html">Mantenimiento de Roles</a>
        </li>

        <li class="menu__item">
        <a class="menu__link" href="./mantenimientoPermisos.html">Mantenimiento de Permisos</a>
        </li>

        <li class="menu__item">
        <a class="menu__link" href="./configRolesPermisos.html">Configuración Roles - Permisos</a>
        </li>

        <li class="menu__item">
        <a class="menu__link" href="./mantenimientoTipoTarifa.html">Mantenimiento de Tipo de Tarifa</a>
        </li>

        <li class="menu__item">
        <a class="menu__link" href="./mantenimientoMoneda.html">Mantenimiento de Moneda</a>
        </li>

        <li class="menu__item">
        <a class="menu__link" href="./mantenimientoPaises.html">Mantenimiento de Países</a>
        </li>

        <li class="menu__item">
        <a class="menu__link" href="./mantenimientoCiudades.html">Mantenimiento de Ciudades</a>
        </li>

        <li class="menu__item">
        <a class="menu__link" href="./mantenimientoAereopuertos.html">Mantenimiento de Aereopuertos</a>
        </li>

        <li class="menu__item">
        <a class="menu__link" href="./mantenimientoVuelos.html">Mantenimiento de Vuelos</a>
        </li>

        <li class="menu__item">
        <a class="menu__link" href="./mantenimientoCuentaBancaria.html">Crear Cuenta Bancaria</a>
        </li>
    `
} else {
    menuList.innerHTML = '<h1>Debes ser administrador para acceder a la configuaracion...</h1>'
}

