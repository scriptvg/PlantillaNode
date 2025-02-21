import { PostUsers, GetUsers, PutUsers, DeleteUsers } from '../services/users.js';
import { Alerta } from '../utils/alerts.js';

const nombre = document.getElementById('nameProduct');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const password = document.getElementById('password');
const edad = document.getElementById('edad');
const btn_add = document.getElementById('btn-agregar');
const btn_show = document.getElementById('btn-mostrar');
const btn_update = document.getElementById('btn-actualizar');
const btn_delete = document.getElementById('btn-eliminar');
const datos = document.getElementById('base-datos');

// Agregar usuario
btn_add.addEventListener('click', async () => {
    try {
        await PostUsers(nombre.value, apellido.value, email.value, password.value, edad.value);
        Alerta('Éxito', 'Usuario agregado exitosamente', 'success', 'OK', '/pages/Registro.html');
    } catch (error) {
        Alerta('Error', error.message, 'error', 'OK', '/pages/Registro.html');
    }
});

// Mostrar usuarios
btn_show.addEventListener('click', async () => {
    try {
        const users = await GetUsers();
        datos.innerHTML = '';
        users.forEach(user => {
            const userElement = document.createElement('p');
            userElement.textContent = `ID: ${user.id}, Nombre: ${user.nombre}, Apellido: ${user.apellido}, Email: ${user.email}, Edad: ${user.edad}`;
            datos.appendChild(userElement);
        });
    } catch (error) {
        Alerta('Error', error.message, 'error', 'OK', '/pages/Registro.html');
    }
});

// Actualizar usuario
btn_update.addEventListener('click', async () => {
    try {
        const userId = prompt('Ingrese el ID del usuario a actualizar:');
        await PutUsers(userId, nombre.value, apellido.value, email.value, password.value, edad.value);
        Alerta('Éxito', 'Usuario actualizado exitosamente', 'success', 'OK', '/pages/Registro.html');
    } catch (error) {
        Alerta('Error', error.message, 'error', 'OK', '/pages/Registro.html');
    }
});

// Eliminar usuario
btn_delete.addEventListener('click', async () => {
    try {
        const userId = prompt('Ingrese el ID del usuario a eliminar:');
        await DeleteUsers(userId);
        Alerta('Éxito', 'Usuario eliminado exitosamente', 'success', 'OK', '/pages/Registro.html');
    } catch (error) {
        Alerta('Error', error.message, 'error', 'OK', '/pages/Registro.html');
    }
});

export function initializeApp() {
    // Any initialization code can go here
}