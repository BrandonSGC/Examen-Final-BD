document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const loginButton = document.querySelector('#login');

    // Events
    loginButton.addEventListener('click', login);

})

// Functions
function login(evt) {
    evt.preventDefault();

    // Get values from inputs
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Create object to send.
    const data = { email, password }

    fetch('/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => showAlert(data))
}


function showAlert(messageObject) {
    const {success, message, userInfo} = messageObject;

    const alert = document.querySelector('#loginAlert');

    if (success) {
        alert.classList.add('alert');
        alert.textContent = message;

        // Set login state to local storage.
        const loginState = true;
        localStorage.setItem('loginState', JSON.stringify(loginState));

        // Set Info User to local storage.
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        console.log(userInfo);

        // Set admin state to local storage.
        const {RolID} = userInfo;
        let isAdmin = false

        console.log(RolID);
        if (RolID == 9) {
            isAdmin = true;
        } else {
            isAdmin = false;
        }
        
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));

    } else {
        alert.classList.add('alert');
        alert.textContent = message;

        // Set login state to local storage.
        const loginState = false;
        localStorage.setItem('loginState', JSON.stringify(loginState));

        localStorage.removeItem('userInfo');

        localStorage.removeItem('isAdmin');
    }
}