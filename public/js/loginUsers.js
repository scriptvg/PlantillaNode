import { GetUsers } from '../services/users.js';
import { Alerta } from "../utils/alerts.js";

const elements = {
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    btnLogin: document.getElementById('btn-login'),
    loginStatus: document.getElementById('login-status')
};

function showError(error) {
    console.error('Error:', error);
    Alerta('Error', error.message, 'error', 'OK', '/pages/Login.html');
}

// Login usuario
elements.btnLogin.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
        console.log('Botón de login clickeado');
        const users = await GetUsers();
        console.log('Usuarios obtenidos:', users);
        
        const user = users.find(user => user.email === elements.email.value && user.password === elements.password.value);
        console.log('Usuario encontrado:', user);

        if (user) {
            Alerta('Login exitoso', 'Usuario encontrado', 'success', 'OK', '/pages/inventario.html');
            console.log('Login exitoso');
        } else {
            Alerta('Error', 'Email o password incorrectos', 'error', 'OK', '/pages/Login.html');
            console.log('Email o password incorrectos');
        }
    } catch (error) {
        showError(error);
    }
});
