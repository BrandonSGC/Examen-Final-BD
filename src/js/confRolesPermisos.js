import { obtenerRoles } from "./roles.js";
import { obtenerPermisos } from "./permisos.js";

document.addEventListener('DOMContentLoaded', () => {
    obtenerRoles();
    obtenerPermisos();
});