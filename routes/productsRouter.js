import express from 'express';
import {
  getStockReport,
  getProductDetail,
  insertProduct,
  updateProduct,
  deleteProduct
} from '../services/productsService.js';

const router = express.Router();

// GET /api/products/stock-report?category=1&min=10&max=50
router.get('/stock-report', async (req, res) => {
  try {
    const categoryId = parseInt(req.query.category);
    const minStock = req.query.min ? parseInt(req.query.min) : null;
    const maxStock = req.query.max ? parseInt(req.query.max) : null;

    if (!categoryId) {
      return res.status(400).json({ message: 'category es obligatorio' });
    }

    const result = await getStockReport(categoryId, minStock, maxStock);
    res.json(result[0]);
  } catch (error) {
    console.error('Error en getStockReport:', error);
    res.status(500).json({ message: 'Error al obtener el reporte de stock' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (!productId) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await getProductDetail(productId);
    res.json({
      product: result[0][0],
      stockBySize: result[1]
    });
  } catch (error) {
    console.error('Error en getProductDetail:', error);
    res.status(500).json({ message: 'Error al obtener detalle del producto' });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const {
      name, color, price,
      stockS, stockM, stockL,
      providerId, categoryId
    } = req.body;

    if (!name || !color || price == null || !providerId || !categoryId) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const result = await insertProduct(name, color, price, stockS, stockM, stockL, providerId, categoryId);
    res.status(201).json({ message: 'Producto insertado', result });
  } catch (error) {
    console.error('Error en insertProduct:', error);
    res.status(500).json({ message: 'Error al insertar producto' });
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const code = parseInt(req.params.id);
    const {
      name, color, price,
      stockS, stockM, stockL,
      providerId, categoryId
    } = req.body;

    if (!code || !name || !color || price == null || !providerId || !categoryId) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const result = await updateProduct(code, name, color, price, stockS, stockM, stockL, providerId, categoryId);
    res.json({ message: 'Producto actualizado', result });
  } catch (error) {
    console.error('Error en updateProduct:', error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (!productId) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await deleteProduct(productId);
    res.json({ message: 'Producto eliminado', result });
  } catch (error) {
    console.error('Error en deleteProduct:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

export default router;

