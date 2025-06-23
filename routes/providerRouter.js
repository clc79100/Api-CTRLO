import express from 'express';
import {
  getAllProviders,
  getProviderDetail,
  insertProvider,
  updateProvider,
  deleteProvider
} from '../services/providerService.js';

const router = express.Router();

// GET /api/providers
router.get('/', async (req, res) => {
  try {
    const result = await getAllProviders();
    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    res.status(500).json({ message: 'Error al obtener proveedores' });
  }
});

// GET /api/providers/:id
router.get('/:id', async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    if (!providerId) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await getProviderDetail(providerId);

    if (result[0].length === 0) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    res.json({
      provider: result[0][0],  
      products: result[1]      
    });
  } catch (error) {
    console.error('Error al obtener detalle del proveedor:', error);
    res.status(500).json({ message: 'Error al obtener detalle del proveedor' });
  }
});

// POST /api/providers
router.post('/', async (req, res) => {
  try {
    const { provider_name, provider_email, provider_phone } = req.body;

    if (!provider_name || !provider_email || !provider_phone) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const result = await insertProvider(provider_name, provider_email, provider_phone);
    res.status(201).json({ message: 'Proveedor insertado', result });
  } catch (error) {
    console.error('Error al insertar proveedor:', error);
    res.status(500).json({ message: 'Error al insertar proveedor' });
  }
});

// PUT /api/providers/:id
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { provider_name, provider_mail, provider_phone } = req.body;

    if (!id || !provider_name || !provider_mail || !provider_phone) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const result = await updateProvider(id, provider_name, provider_mail, provider_phone);
    res.json({ message: 'Proveedor actualizado', result });
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ message: 'Error al actualizar proveedor' });
  }
});

// DELETE /api/providers/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await deleteProvider(id);
    res.json({ message: 'Proveedor eliminado', result });
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    res.status(500).json({ message: 'Error al eliminar proveedor' });
  }
});

export default router;

