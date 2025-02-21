import { GetUsers } from '../services/users.js';
import { Alerta } from "../utils/alerts.js";

const email = document.getElementById('email');
const password = document.getElementById('password');
const btn_login = document.getElementById('btn-login');
const login_status = document.getElementById('login-status');

// Login usuario
btn_login.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('Botón de login clickeado');
    const users = await GetUsers();
    console.log('Usuarios obtenidos:', users);
    
    const user = users.find(user => user.email === email.value && user.password === password.value);
    console.log('Usuario encontrado:', user);

    if (user) {
        Alerta('Login exitoso', 'Usuario encontrado', 'success', 'OK', '/pages/inventario.html');
        console.log('Login exitoso');
    } else {
        Alerta('Error', 'Email o password incorrectos', 'error', 'OK', '/pages/Login.html');
        console.log('Email o password incorrectos');
    }
});
