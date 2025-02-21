import { PostProduct, PutProduct, DeleteProduct, GetProducts, GetProductById } from "../services/products.js";
import { Alerta } from "../utils/alerts.js";

const productId = document.getElementById('productId');
const productName = document.getElementById('productName');
const productCategory = document.getElementById('productCategory');
const productQuantity = document.getElementById('productQuantity');
const productPrice = document.getElementById('productPrice');
const btnAdd = document.getElementById('btn-add');
const btnShow = document.getElementById('btn-show');
const btnUpdate = document.getElementById('btn-update');
const btnDelete = document.getElementById('btn-delete');
const inventoryDatabase = document.getElementById('inventory-database');
const inventoryTable = document.getElementById('inventory-table');

// Verificar que los elementos del DOM se obtienen correctamente
console.log('DOM Elements:', {
    productId,
    productName,
    productCategory,
    productQuantity,
    productPrice,
    btnAdd,
    btnShow,
    btnUpdate,
    btnDelete,
    inventoryDatabase,
    inventoryTable
});

function showError(error) {
    console.error('Error:', error); // Agregar mensaje de error a la consola
    Alerta('Error', error.message, 'error', 'OK', '/pages/inventario.html');
}

function validateInputs() {
    if (!productName.value.trim() || !productCategory.value.trim() || !productQuantity.value.trim() || !productPrice.value.trim()) {
        Alerta('Error', 'Todos los campos excepto el ID son obligatorios y no deben estar vacíos', 'error', 'OK', '/pages/inventario.html');
        return false;
    }
    return true;
}

async function loadProducts() {
    try {
        console.log('Fetching products');
        const products = await GetProducts();
        console.log('Products fetched:', products);
        inventoryTable.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.nombre}</td>
                <td>${product.categoria}</td>
                <td>${product.cantidad}</td>
                <td>${product.precio}</td>
                <td>
                    <button class="btn-edit" data-id="${product.id}">Editar</button>
                    <button class="btn-delete" data-id="${product.id}">Eliminar</button>
                </td>
            `;
            inventoryTable.appendChild(row);

            // Add event listeners for edit and delete buttons
            row.querySelector('.btn-edit').addEventListener('click', async (event) => {
                const id = event.target.getAttribute('data-id');
                try {
                    console.log('Fetching product details for edit:', id);
                    const product = await GetProductById(id);
                    productId.value = product.id;
                    productName.value = product.nombre;
                    productCategory.value = product.categoria;
                    productQuantity.value = product.cantidad;
                    productPrice.value = product.precio;
                } catch (error) {
                    showError(error);
                }
            });

            row.querySelector('.btn-delete').addEventListener('click', async (event) => {
                const id = event.target.getAttribute('data-id');
                try {
                    console.log('Deleting product:', id);
                    await DeleteProduct(id);
                    Alerta('Éxito', 'Producto eliminado exitosamente', 'success', 'OK', '/pages/inventario.html');
                    loadProducts(); // Reload products after deletion
                } catch (error) {
                    showError(error);
                }
            });
        });
    } catch (error) {
        showError(error);
    }
}

// Load products and attach event listeners when the page loads
window.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    if (btnAdd) {
        btnAdd.addEventListener('click', async () => {
            if (!validateInputs()) return;
            try {
                console.log('Adding product:', productName.value, productCategory.value, productQuantity.value, productPrice.value);
                await PostProduct(productName.value, productCategory.value, productQuantity.value, productPrice.value);
                Alerta('Éxito', 'Producto agregado exitosamente', 'success', 'OK', '/pages/inventario.html');
                loadProducts();
            } catch (error) {
                showError(error);
            }
        });
    }

    if (btnUpdate) {
        btnUpdate.addEventListener('click', async () => {
            if (!validateInputs()) return;
            try {
                console.log('Updating product:', productId.value, productName.value, productCategory.value, productQuantity.value, productPrice.value);
                await PutProduct(productId.value, productName.value, productCategory.value, productQuantity.value, productPrice.value);
                Alerta('Éxito', 'Producto actualizado exitosamente', 'success', 'OK', '/pages/inventario.html');
                loadProducts();
            } catch (error) {
                showError(error);
            }
        });
    }

    if (btnDelete) {
        btnDelete.addEventListener('click', async () => {
            try {
                console.log('Deleting product:', productId.value); // Mensaje de depuración
                await DeleteProduct(productId.value);
                Alerta('Éxito', 'Producto eliminado exitosamente', 'success', 'OK', '/pages/inventario.html');
            } catch (error) {
                showError(error);
            }
        });
    }

    if (btnShow) {
        btnShow.addEventListener('click', loadProducts);
    }
});

export function initializeApp() {
    // Any initialization code can go here
}
