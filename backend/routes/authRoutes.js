const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/authController');

// Ruta para registrar (POST http://localhost:3000/api/auth/register)
router.post('/register', registrarUsuario);

// Ruta para login (POST http://localhost:3000/api/auth/login)
router.post('/login', loginUsuario);

module.exports = router;