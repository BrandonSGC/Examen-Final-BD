import { obtenerAereopuertos } from "./aereopuertos.js";
import { ObtenerTiposDeTarifas } from "./tiposTarifas.js";

document.addEventListener('DOMContentLoaded', () => {
    obtenerAereopuertos();
    ObtenerTiposDeTarifas();
});