import express from 'express';

import {
  getSalesReport,
  getSaleDetail,
  insertSale,
  deleteSale
} from '../services/salesService.js';

const router = express.Router();

// GET /api/sales/report?start=2023-01-01&end=2023-01-31
router.get('/report', async (req, res) => {
  try {
    const { start, end } = req.query;
    const result = await getSalesReport(start || null, end || null);
    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener reporte de ventas:', error);
    res.status(500).json({ message: 'Error al obtener reporte de ventas' });
  }
});

// GET /api/sales/:id
router.get('/:id', async (req, res) => {
  try {
    const saleId = parseInt(req.params.id);
    if (!saleId) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await getSaleDetail(saleId);

    if (result[0].length === 0) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.json({
      sale: result[0][0],     
      products: result[1]       
    });
  } catch (error) {
    console.error('Error al obtener detalle de la venta:', error);
    res.status(500).json({ message: 'Error al obtener detalle de la venta' });
  }
});

// POST /api/sales
router.post('/', async (req, res) => {
  try {
    const { sale_date, customer_id, products_sold } = req.body;

    if (!sale_date || !customer_id || !Array.isArray(products_sold)) {
      return res.status(400).json({ message: 'Datos incompletos o inválidos' });
    }

    const result = await insertSale(sale_date, customer_id, products_sold);
    res.status(201).json({ message: 'Venta registrada', result });
  } catch (error) {
    console.error('Error al insertar venta:', error);
    res.status(500).json({ message: 'Error al insertar venta' });
  }
});

// DELETE /api/sales/:id
router.delete('/:id', async (req, res) => {
  try {
    const saleId = parseInt(req.params.id);
    if (!saleId) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await deleteSale(saleId);
    res.json({ message: 'Venta eliminada', result });
  } catch (error) {
    console.error('Error al eliminar venta:', error);
    res.status(500).json({ message: 'Error al eliminar venta' });
  }
});

export default router;

