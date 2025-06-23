import express from 'express';
import {
  getAllCategories,
  insertCategory,
  updateCategory,
  deleteCategory
} from '../services/categoryService.js';

const router = express.Router();

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const result = await getAllCategories();
    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
});

// POST /api/categories
router.post('/', async (req, res) => {
  try {
    const { category_name } = req.body;
    if (!category_name) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }
    const result = await insertCategory(category_name);
    res.status(201).json({ message: 'Categoría insertada', result });
  } catch (error) {
    console.error('Error al insertar categoría:', error);
    res.status(500).json({ message: 'Error al insertar categoría' });
  }
});

// PUT /api/categories/:id
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: 'ID y nombre son obligatorios' });
    }

    const result = await updateCategory(id, name);
    res.json({ message: 'Categoría actualizada', result });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ message: 'Error al actualizar categoría' });
  }
});

// DELETE /api/categories/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (!id) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await deleteCategory(id);
    res.json({ message: 'Categoría eliminada', result });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ message: 'Error al eliminar categoría' });
  }
});

export default router;

