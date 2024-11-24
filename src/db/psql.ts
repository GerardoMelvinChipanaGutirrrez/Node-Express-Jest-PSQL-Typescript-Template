import { Client, QueryResult, Pool } from 'pg'

const connect = async (): Promise<Client> => {
//   const pool = new Pool()
  const client = new Client()
  await client.connect()
  return client
}

export const runQuery = async (query: string, params: any[] = []): Promise<QueryResult<any>> => {
  const client = await connect();
  try {
    // Ejecuta la consulta con parámetros
    const result = await client.query(query, params);
    return result;
  } catch (error) {
    console.error('Error ejecutando query:', error.message, { query, params });
    throw error;
  } finally {
    // Asegura liberar el cliente después de la consulta
    await client.end();
  }
};