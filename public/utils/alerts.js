export const Alerta = (title, text, icon, confirmButtonText, url) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
    }).then(() => {
        window.location.href = url;
    });
};

export const AlertaProducto = (title, text, icon) => {
    Swal.fire({
        title,
        text,
        icon,
        input: 'text',
        inputPlaceholder: 'Ingrese el nombre del producto',
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const productName = result.value;
            console.log(`Producto ingresado: ${productName}`);
        }
    });
};

export const AlertaEliminar = (title, text, icon) => {
    Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Producto eliminado');
        }
    });
};

export const AlertaEditar = (title, text, icon) => {
    Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Producto editado');
        }
    });
};

export const AlertaError = (title, text, icon, confirmButtonText) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText
    });
};

export const AlertaErrorProducto = (title, text, icon) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK',
        input: 'text',
        inputPlaceholder: 'Ingrese el nombre del producto',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            const productName = result.value;
            console.log(`Producto ingresado: ${productName}`);
        }
    });
};

export const AlertaErrorEliminar = (title, text, icon) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Producto eliminado');
        }
    });
};

export const AlertaErrorEditar = (title, text, icon) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Producto editado');
        }
    });
};

export const AlertaErrorRegistro = (title, text, icon) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK'
    });
};

export const AlertaRegistro = (title, text, icon) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK'
    }).then(() => {
        window.location.href = '/Login.html';
    });
};

export const AlertaRegistroProducto = (title, text, icon) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK'
    }).then(() => {
        window.location.href = '/pages/inventario.html';
    });
};

export const AlertaErrorRegistroProducto = (title, text, icon) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK'
    });
};

export const EditarProductoBtn = (title, text,
    text2, icon) => {
    Swal.fire({
        title,
        text,
        text2,
        icon,
        input: 'text',
        inputPlaceholder: 'Ingrese el nombre del producto',
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const productName = result.value;
            console.log(`Producto ingresado: ${productName}`);
        }
    });
}

export const AlertaEditarProducto = (title, confirmButtonText, url, product) => {
    Swal.fire({
        title,
        html: `
            <input type="text" id="nombre" class="swal2-input" placeholder="Nombre del producto" value="${product.nombre}">
            <input type="number" id="precio" class="swal2-input" placeholder="Precio" value="${product.precio}">
            <input type="text" id="categoria" class="swal2-input" placeholder="Categoría" value="${product.categoria}">
        `,
        confirmButtonText,
        showCancelButton: true,
        preConfirm: () => {
            const nombre = document.getElementById('nombre').value;
            const precio = document.getElementById('precio').value;
            const categoria = document.getElementById('categoria').value;

            if (!nombre || !precio || !categoria) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
            } else {
                return { nombre, precio, categoria };
            }
        }
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resultado.value)
            })
            .then(response => response.json())
            .then(data => {
                Swal.fire('Producto editado', `Nombre: ${data.nombre}\nPrecio: $${data.precio}`, 'success');
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error', 'No se pudo editar el producto', 'error');
            });
        }
    });
};


