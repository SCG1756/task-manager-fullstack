const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // El token suele venir en los headers como: "Bearer <token>"
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });
    }

    const token = authHeader.split(' ')[1]; // Extraemos solo el token

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token inválido.' });
    }

    try {
        // Verificamos que el token sea válido y no esté vencido
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado; // Guardamos los datos del usuario en la petición
        next(); // Dejamos pasar al controlador
    } catch (error) {
        res.status(400).json({ mensaje: 'Token no válido o expirado.' });
    }
};

module.exports = verificarToken;