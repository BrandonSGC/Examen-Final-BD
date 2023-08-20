// Variables
const infoVuelo = JSON.parse(localStorage.getItem('infoVuelo'));
const btnRealizarCompra = document.querySelector('#btnRelizarCompra')

// Obtener info del usuario
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
console.log(userInfo);


// Events
document.addEventListener('DOMContentLoaded', () => {
    cargarUserInfo();
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
        infoVuelo: infoVuelo,
        userInfo,
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


function cargarUserInfo() {
    const { Nombre, Apellido} = userInfo
    const userName = document.querySelector('#nombreCompleto');
    userName.textContent = `${Nombre} ${Apellido}`;
}