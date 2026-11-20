const db = require('../config/db');

// 1. Crear una nueva tarea
const crearTarea = async (req, res) => {
    const { titulo, descripcion, estado } = req.body;
    const usuario_id = req.usuario.id; // Viene del middleware

    if (!titulo) {
        return res.status(400).json({ mensaje: 'El título es obligatorio' });
    }

    try {
        const [resultado] = await db.query(
            'INSERT INTO tareas (titulo, descripcion, estado, usuario_id) VALUES (?, ?, ?, ?)',
            [titulo, descripcion || '', estado || 'pendiente', usuario_id]
        );
        res.status(201).json({ mensaje: 'Tarea creada', id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear la tarea' });
    }
};

// 2. Obtener todas las tareas del usuario logueado
const obtenerTareas = async (req, res) => {
    const usuario_id = req.usuario.id;

    try {
        const [tareas] = await db.query('SELECT * FROM tareas WHERE usuario_id = ? ORDER BY fecha_creacion DESC', [usuario_id]);
        res.json(tareas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las tareas' });
    }
};

// 3. Actualizar una tarea
const actualizarTarea = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, estado } = req.body;
    const usuario_id = req.usuario.id;

    try {
        // Verificamos que la tarea exista y sea del usuario
        const [tarea] = await db.query('SELECT * FROM tareas WHERE id = ? AND usuario_id = ?', [id, usuario_id]);
        if (tarea.length === 0) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada o no autorizada' });
        }

        await db.query(
            'UPDATE tareas SET titulo = ?, descripcion = ?, estado = ? WHERE id = ?',
            [titulo, descripcion, estado, id]
        );
        res.json({ mensaje: 'Tarea actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar la tarea' });
    }
};

// 4. Eliminar una tarea
const eliminarTarea = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.usuario.id;

    try {
        const [resultado] = await db.query('DELETE FROM tareas WHERE id = ? AND usuario_id = ?', [id, usuario_id]);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada o no autorizada' });
        }
        res.json({ mensaje: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar la tarea' });
    }
};

module.exports = { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea };