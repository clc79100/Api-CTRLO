import pool from '../config/db-connection.js';

export async function executeQuery(sql, params = []) {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    console.error('Error en executeQuery:', error);
    throw error;
  }
}

