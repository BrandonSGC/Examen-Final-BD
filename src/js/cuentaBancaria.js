// Variables
const btnCrearCuenta = document.querySelector('#crearCuenta')

// Obtener info del usuario
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
console.log(userInfo);


// Events
document.addEventListener('DOMContentLoaded', () => {
    btnCrearCuenta.addEventListener('click', crearCuenta);
});


// Functions
function crearCuenta(evt) {
    evt.preventDefault();
    const tarjeta = document.getElementById("numTarjeta").value;
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;
    const codigo = document.getElementById("codigo").value;
    const saldo = document.getElementById("saldo").value;

    const {UserID} = userInfo;

    console.log(tarjeta, fechaVencimiento, codigo, saldo);

    const data = {
        tarjeta,
        fechaVencimiento,
        codigo,
        saldo,
        UserID,
    };

    fetch('/cuentaBancaria', {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(datos => datos.json())
        .then(response => showAlert(response))
        .catch( (error) => console.error(error))
}


function cargarUserInfo() {
    const { Nombre, Apellido} = userInfo;
    
}


function showAlert(messageObject) {
    const { success, message } = messageObject;

    const alert = document.querySelector('#alert');
    
    alert.classList.add('alert');
    alert.textContent = message;
}