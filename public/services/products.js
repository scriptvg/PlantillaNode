async function handleResponse(response) {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }
    return response.json();
}

/* Método POST */

export async function PostProduct(nombre, categoria, cantidad, precio) {
    const response = await fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, categoria, cantidad, precio })
    });
    return handleResponse(response);
}

/* Método GET */

export async function GetProducts(id = '') {
    const response = await fetch(`http://localhost:3001/productos${id ? `/${id}` : ''}`);
    return handleResponse(response);
}

export async function GetProductById(id) {
    const response = await fetch(`http://localhost:3001/productos/${id}`);
    return handleResponse(response);
}

/* Método PUT */

export async function PutProduct(id, nombre, categoria, cantidad, precio) {
    const response = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, categoria, cantidad, precio })
    });
    return handleResponse(response);
}

/* Método DELETE */

export async function DeleteProduct(id) {
    const response = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
}


