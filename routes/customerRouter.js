import express from 'express';
import {
  getAllCustomers,
  getCustomerDetail,
  insertCustomer,
  updateCustomer,
  deleteCustomer
} from '../services/customerService.js';

const router = express.Router();

// GET /api/customers
router.get('/', async (req, res) => {
  try {
    const result = await getAllCustomers();
    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
});

// GET /api/customers/:id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await getCustomerDetail(id);
    res.json({
      customer: result[0][0],
      purchaseHistory: result[1]
    });
  } catch (error) {
    console.error('Error al obtener detalle del cliente:', error);
    res.status(500).json({ message: 'Error al obtener detalle del cliente' });
  }
});

// POST /api/customers
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const result = await insertCustomer(name);
    res.status(201).json({ message: 'Cliente insertado', result });
  } catch (error) {
    console.error('Error al insertar cliente:', error);
    res.status(500).json({ message: 'Error al insertar cliente' });
  }
});

// PUT /api/customers/:id
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: 'ID y nombre son obligatorios' });
    }

    const result = await updateCustomer(id, name);
    res.json({ message: 'Cliente actualizado', result });
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }
});

// DELETE /api/customers/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await deleteCustomer(id);
    res.json({ message: 'Cliente eliminado', result });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ message: 'Error al eliminar cliente' });
  }
});

export default router;

