// Variables
const infoVuelo = JSON.parse(localStorage.getItem('infoVuelo'));
const btnRealizarCompra = document.querySelector('#btnRelizarCompra')


// Events
document.addEventListener('DOMContentLoaded', () => {
    console.log(infoVuelo);
    btnRealizarCompra.addEventListener('click', comprar);
});


// Functions
function comprar(evt) {
    evt.preventDefault();
    const tarjeta = document.getElementById("tarjeta").value;
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;
    const codigo = document.getElementById("codigo").value;


    const data = {
        tarjeta,
        fechaVencimiento,
        codigo,
        infoVuelo: infoVuelo
    };

    fetch('/pagar', {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(datos => datos.json())
        .then(vuelos => {
            if (vuelos.message === "No se encontraron vuelos") {
                alert('No se encontraron vuelos...');
            } else {
                mostrarVuelos(vuelos);
            }
            
        })
        .catch( (error) => console.error(error))
}