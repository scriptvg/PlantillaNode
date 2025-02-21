async function handleResponse(response) {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }
    return response.json();
}

/* Metódo POST */

export async function PostUsers(nombre, apellido, email, password, edad) {
    const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, email, password, edad })
    });
    return handleResponse(response);
}

/* Metódo GET */

export async function GetUsers() {
    const response = await fetch('http://localhost:3001/users');
    return handleResponse(response);
}

/* Metódo PUT */

export async function PutUsers(id, nombre, apellido, email, password, edad) {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, email, password, edad })
    });
    return handleResponse(response);
}

/* Metódo DELETE */

export async function DeleteUsers(id) {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
}
