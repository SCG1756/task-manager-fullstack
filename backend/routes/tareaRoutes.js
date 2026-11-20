const express = require('express');
const router = express.Router();
const { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } = require('../controllers/tareaController');
const verificarToken = require('../middlewares/authMiddleware');

// Todas estas rutas pasan primero por el guardia de seguridad
router.use(verificarToken);

router.post('/', crearTarea);           // POST /api/tareas
router.get('/', obtenerTareas);         // GET /api/tareas
router.put('/:id', actualizarTarea);    // PUT /api/tareas/1
router.delete('/:id', eliminarTarea);   // DELETE /api/tareas/1

module.exports = router;