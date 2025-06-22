// routes/userRouter.js
import express from 'express';
import {
  getAllUsers,
  getUserDetail,
  insertUser,
  updateUser,
  deleteUser
} from '../services/userService.js';

const router = express.Router();

// GET /api/users?role=admin
router.get('/', async (req, res) => {
  try {
    const role = req.query.role || null;
    const result = await getAllUsers(role);
    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (!userId) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await getUserDetail(userId);

    if (result[0].length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.json(result[0][0]);
  } catch (error) {
    console.error('Error al obtener detalle del usuario:', error);
    res.status(500).json({ message: 'Error al obtener detalle del usuario' });
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const result = await insertUser(email, password, role);
    res.status(201).json({ message: 'Usuario insertado', result });
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    res.status(500).json({ message: 'Error al insertar usuario' });
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { email, password, role } = req.body;

    if (!id || !email || !password || !role) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const result = await updateUser(id, email, password, role);
    res.json({ message: 'Usuario actualizado', result });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await deleteUser(id);
    res.json({ message: 'Usuario eliminado', result });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
});

export default router;

