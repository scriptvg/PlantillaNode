import { PostUsers, GetUsers, PutUsers, DeleteUsers } from '../services/users.js';
import { Alerta } from '../utils/alerts.js';

const elements = {
    nombre: document.getElementById('nameProduct'),
    apellido: document.getElementById('apellido'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    edad: document.getElementById('edad'),
    btnAdd: document.getElementById('btn-agregar'),
    btnShow: document.getElementById('btn-mostrar'),
    btnUpdate: document.getElementById('btn-actualizar'),
    btnDelete: document.getElementById('btn-eliminar'),
    datos: document.getElementById('base-datos')
};

function showError(error) {
    console.error('Error:', error);
    Alerta('Error', error.message, 'error', 'OK', '/pages/Registro.html');
}

// Agregar usuario
elements.btnAdd.addEventListener('click', async () => {
    try {
        await PostUsers(elements.nombre.value, elements.apellido.value, elements.email.value, elements.password.value, elements.edad.value);
        Alerta('Éxito', 'Usuario agregado exitosamente', 'success', 'OK', '/pages/Registro.html');
    } catch (error) {
        showError(error);
    }
});

// Mostrar usuarios
elements.btnShow.addEventListener('click', async () => {
    try {
        const users = await GetUsers();
        elements.datos.innerHTML = '';
        users.forEach(user => {
            const userElement = document.createElement('p');
            userElement.textContent = `ID: ${user.id}, Nombre: ${user.nombre}, Apellido: ${user.apellido}, Email: ${user.email}, Edad: ${user.edad}`;
            elements.datos.appendChild(userElement);
        });
    } catch (error) {
        showError(error);
    }
});

// Actualizar usuario
elements.btnUpdate.addEventListener('click', async () => {
    try {
        const userId = prompt('Ingrese el ID del usuario a actualizar:');
        await PutUsers(userId, elements.nombre.value, elements.apellido.value, elements.email.value, elements.password.value, elements.edad.value);
        Alerta('Éxito', 'Usuario actualizado exitosamente', 'success', 'OK', '/pages/Registro.html');
    } catch (error) {
        showError(error);
    }
});

// Eliminar usuario
elements.btnDelete.addEventListener('click', async () => {
    try {
        const userId = prompt('Ingrese el ID del usuario a eliminar:');
        await DeleteUsers(userId);
        Alerta('Éxito', 'Usuario eliminado exitosamente', 'success', 'OK', '/pages/Registro.html');
    } catch (error) {
        showError(error);
    }
});

export function initializeApp() {
    // Any initialization code can go here
}