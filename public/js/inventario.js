import { PostProduct, PutProduct, DeleteProduct, GetProducts, GetProductById } from "../services/products.js";
import { Alerta } from "../utils/alerts.js";

const elements = {
    productId: document.getElementById('productId'),
    productName: document.getElementById('productName'),
    productCategory: document.getElementById('productCategory'),
    productQuantity: document.getElementById('productQuantity'),
    productPrice: document.getElementById('productPrice'),
    btnAdd: document.getElementById('btn-add'),
    btnShow: document.getElementById('btn-show'),
    btnUpdate: document.getElementById('btn-update'),
    btnDelete: document.getElementById('btn-delete'),
    inventoryDatabase: document.getElementById('inventory-database'),
    inventoryTable: document.getElementById('inventory-table'),
    searchButton: document.getElementsByClassName('input-group-append .btn'),
    searchInput: document.getElementById('search'),
    btnEdit: document.getElementsByClassName('btn-edit'),
    btnDelete: document.getElementsByClassName('btn-delete')
};

// Add a new element for the nav button
const navButton = document.getElementById('nav-button');

// Verificar que los elementos del DOM se obtienen correctamente
console.log('DOM Elements:', elements);

function showError(error) {
    console.error('Error:', error);
    Alerta('Error', error.message, 'error', 'OK', '/pages/inventario.html');
}

function validateInputs() {
    const { productName, productCategory, productQuantity, productPrice } = elements;
    if (!productName.value.trim() || !productCategory.value.trim() || !productQuantity.value.trim() || !productPrice.value.trim()) {
        Alerta('Error', 'Todos los campos excepto el ID son obligatorios y no deben estar vacíos', 'error', 'OK', '/pages/inventario.html');
        return false;
    }
    return true;
}

function filterProducts(products, searchTerm) {
    return products.filter(product => 
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

async function loadProducts(searchTerm = '') {
    try {
        console.log('Fetching products');
        const products = await GetProducts();
        console.log('Products fetched:', products);
        const filteredProducts = filterProducts(products, searchTerm);
        elements.inventoryTable.innerHTML = '';
        filteredProducts.forEach(product => {
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
            elements.inventoryTable.appendChild(row);

            // Add event listeners for edit and delete buttons
            row.querySelector('.btn-edit').addEventListener('click', async (event) => {
                const id = event.target.getAttribute('data-id');
                try {
                    console.log('Fetching product details for edit:', id);
                    const product = await GetProductById(id);
                    Swal.fire({
                        title: 'Editar Producto',
                        html: `
                            <label for="swal-input1">ID: </label>
                            <input id="swal-input1" class="swal2-input" value="${product.id}" disabled>
                            <label for="swal-input2">Nombre: </label>
                            <input id="swal-input2" class="swal2-input" value="${product.nombre}">
                            <label for="swal-input3">Categoría: </label>
                            <input id="swal-input3" class="swal2-input" value="${product.categoria}">
                            <label for="swal-input4">Cantidad: </label>
                            <input id="swal-input4" class="swal2-input" value="${product.cantidad}">
                            <label for="swal-input5">Precio: </label>
                            <input id="swal-input5" class="swal2-input" value="${product.precio}">
                        `,
                        focusConfirm: false,
                        preConfirm: () => {
                            return {
                                id: document.getElementById('swal-input1').value,
                                nombre: document.getElementById('swal-input2').value,
                                categoria: document.getElementById('swal-input3').value,
                                cantidad: document.getElementById('swal-input4').value,
                                precio: document.getElementById('swal-input5').value
                            };
                        }
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            try {
                                await PutProduct(id, result.value.nombre, result.value.categoria, result.value.cantidad, result.value.precio);
                                Alerta('Éxito', 'Producto actualizado exitosamente', 'success', 'OK', '/pages/inventario.html');
                                loadProducts();
                            } catch (error) {
                                showError(error);
                            }
                        }
                    });
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

    const { btnAdd, btnUpdate, btnDelete, btnShow } = elements;

    if (btnAdd) {
        btnAdd.addEventListener('click', async () => {
            if (!validateInputs()) return;
            try {
                console.log('Adding product:', elements.productName.value, elements.productCategory.value, elements.productQuantity.value, elements.productPrice.value);
                await PostProduct(elements.productName.value, elements.productCategory.value, elements.productQuantity.value, elements.productPrice.value);
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
                console.log('Updating product:', elements.productId.value, elements.productName.value, elements.productCategory.value, elements.productQuantity.value, elements.productPrice.value);
                await PutProduct(elements.productId.value, elements.productName.value, elements.productCategory.value, elements.productQuantity.value, elements.productPrice.value);
                Alerta('Éxito', 'Producto actualizado exitosamente', 'success', 'OK', '/pages/inventario.html');
                loadProducts();
            } catch (error) {
                showError(error);
            }
        });
    }

    if (btnDelete && btnDelete instanceof HTMLElement) {
        btnDelete.addEventListener('click', async () => {
            try {
                console.log('Deleting product:', elements.productId.value);
                await DeleteProduct(elements.productId.value);
                Alerta('Éxito', 'Producto eliminado exitosamente', 'success', 'OK', '/pages/inventario.html');
            } catch (error) {
                showError(error);
            }
        });
    }

    if (btnShow) {
        btnShow.addEventListener('click', loadProducts);
    }

    if (elements.searchButton.length > 0) {
        elements.searchButton[0].addEventListener('click', () => {
            const searchTerm = elements.searchInput.value;
            loadProducts(searchTerm);
        });
    }

    // Add event listener for the nav button
    if (navButton) {
        navButton.addEventListener('click', () => {
            console.log('click');
            
        });
    }

    // Add event listener for the navbar toggler button
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            const navbarNav = document.getElementById('navbarNav');
            if (navbarNav) {
                navbarNav.classList.toggle('show');
            }
        });
    }
});

export function initializeApp() {
    // Any initialization code can go here
}
