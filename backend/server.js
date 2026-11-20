const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const tareaRoutes = require('./routes/tareaRoutes');

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tareas', tareaRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API del Task Manager funcionando 🚀' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});