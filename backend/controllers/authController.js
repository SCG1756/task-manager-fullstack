const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Función para Registrar un Usuario
const registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    // Validar que lleguen todos los datos
    if (!nombre || !email || !password) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el correo ya existe
        const [usuariosExistentes] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (usuariosExistentes.length > 0) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(password, salt);

        // Insertar en la base de datos
        const [resultado] = await db.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, passwordEncriptada]
        );

        res.status(201).json({ 
            mensaje: 'Usuario registrado con éxito', 
            usuarioId: resultado.insertId 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor al registrar' });
    }
};

// 2. Función para Iniciar Sesión (Login)
const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
    }

    try {
        // Buscar el usuario por email
        const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (usuarios.length === 0) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        const usuario = usuarios[0];

        // Comparar la contraseña enviada con la encriptada en la BD
        const passwordCorrecta = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecta) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        // Generar el Token JWT (para mantener la sesión)
        const token = jwt.sign(
            { id: usuario.id, nombre: usuario.nombre }, 
            process.env.JWT_SECRET, 
            { expiresIn: '2h' }
        );

        res.json({ 
            mensaje: 'Login exitoso', 
            token,
            usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor al iniciar sesión' });
    }
};

module.exports = { registrarUsuario, loginUsuario };