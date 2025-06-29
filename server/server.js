const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Your base route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Your test API route
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
