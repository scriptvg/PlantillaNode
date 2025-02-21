const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/sweetalert2', express.static(path.join(__dirname, 'node_modules/sweetalert2/dist')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/users', (req, res) => {
    // Handle user API requests
    res.json({ message: 'User API' });
});

app.get('/api/products', (req, res) => {
    // Handle product API requests
    res.json({ message: 'Product API' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
