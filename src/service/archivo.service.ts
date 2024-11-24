import { runQuery } from '../db/psql';
import { QueryResult } from 'pg';

// Obtener todos los archivos
export const GetArchivoAll = async (): Promise<any[]> => {
  const query = 'SELECT * FROM file';
  try {
    const result: QueryResult = await runQuery(query);
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener los archivos: ${error.message}`);
  }
};

// Obtener un archivo por su ID
export const GetArchivoById = async (id: number): Promise<any> => {
  const query = 'SELECT * FROM file WHERE id = $1';
  try {
    const result: QueryResult = await runQuery(query, [id]);
    if (result.rows.length === 0) {
      throw new Error(`Archivo con ID ${id} no encontrado`);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al obtener el archivo con ID ${id}: ${error.message}`);
  }
};

// Crear un nuevo archivo (requiere datos de req.body)
export const CreateArchivo = async (data: { nombre: string; peso: number; tipo: string; cantidad: number }): Promise<any> => {
  const { nombre, peso, tipo, cantidad } = data;
  const query = 'INSERT INTO file (nombre, peso, tipo, cantidad) VALUES ($1, $2, $3, $4) RETURNING *';
  try {
    const result: QueryResult = await runQuery(query, [nombre, peso, tipo, cantidad]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al crear el archivo: ${error.message}`);
  }
};

// Actualizar un archivo por su ID (requiere datos de req.body)
export const UpdateArchivo = async (id: number, data: { nombre?: string; peso?: number; tipo?: string; cantidad?: number }): Promise<any> => {
  const { nombre, peso, tipo, cantidad } = data;
  const query = `
    UPDATE file
    SET 
      nombre = COALESCE($1, nombre),
      peso = COALESCE($2, peso),
      tipo = COALESCE($3, tipo),
      cantidad = COALESCE($4, cantidad)
    WHERE id = $5
    RETURNING *`;
  try {
    const result: QueryResult = await runQuery(query, [nombre, peso, tipo, cantidad, id]);
    if (result.rows.length === 0) {
      throw new Error(`Archivo con ID ${id} no encontrado para actualizar`);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al actualizar el archivo con ID ${id}: ${error.message}`);
  }
};

// Eliminar un archivo por su ID
export const DeleteArchivo = async (id: number): Promise<void> => {
  const query = 'DELETE FROM file WHERE id = $1';
  try {
    const result: QueryResult = await runQuery(query, [id]);
    if (result.rowCount === 0) {
      throw new Error(`Archivo con ID ${id} no encontrado para eliminar`);
    }
  } catch (error) {
    throw new Error(`Error al eliminar el archivo con ID ${id}: ${error.message}`);
  }
};

// Calcular el peso total y cantidad total de los archivos
export const GetTotales = async (): Promise<{ pesoTotal: number; cantidadTotal: number }> => {
  const query = 'SELECT SUM(peso) AS pesoTotal, SUM(cantidad) AS cantidadTotal FROM file';
  try {
    const result: QueryResult = await runQuery(query);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al calcular los totales: ${error.message}`);
  }
};