require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

// ✅ Base route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// ✅ Test route
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

const Progress = require('./models/Progress');

// ✅ POST: Create new progress item
app.post('/api/progress', async (req, res) => {
    try {
        console.log('REQ BODY:', req.body);
        const { task } = req.body;
        const newProgress = new Progress({ task });
        await newProgress.save();
        res.status(201).json(newProgress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all progress items
app.get('/api/progress', async (req, res) => {
    try {
        const progressItems = await Progress.find();
        res.json(progressItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// ✅ GET: Fetch all progress items
app.get('/api/progress', async (req, res) => {
    try {
        const progressItems = await Progress.find();
        res.json(progressItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
