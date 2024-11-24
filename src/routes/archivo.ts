import * as express from 'express';
import { CreateArchivo, DeleteArchivo, GetArchivoAll, GetArchivoById, UpdateArchivo } from '../service/archivo.service';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const archivos = await GetArchivoAll();
    res.send({ archivos });
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los archivos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const archivo = await GetArchivoById(Number(req.params.id));
    res.send({ archivo });
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener el archivo' });
  }
});

router.post('/', async (req, res) => {
  try {
    const archivo = await CreateArchivo(req.body);
    res.status(201).send({ archivo });
  } catch (error) {
    res.status(500).send({ error: 'Error al crear el archivo' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const archivo = await UpdateArchivo(Number(req.params.id), req.body);
    res.send({ archivo });
  } catch (error) {
    res.status(500).send({ error: 'Error al actualizar el archivo' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await DeleteArchivo(Number(req.params.id));
    res.send({ success: true, result });
  } catch (error) {
    res.status(500).send({ error: 'Error al eliminar el archivo' });
  }
});

export default router;