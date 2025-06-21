
import { executeQuery } from './dbService.js';

export async function getAllCategories() {
  const sql = 'CALL sp_Category_List()';
  return await executeQuery(sql);
}

export async function insertCategory(name) {
  const sql = 'CALL sp_Insert_Category(?)';
  return await executeQuery(sql, [name]);
}


export async function updateCategory(id, name) {
  const sql = 'CALL sp_Update_Category(?, ?)';
  return await executeQuery(sql, [id, name]);
}

export async function deleteCategory(id) {
  const sql = 'CALL sp_Delete_Category(?)';
  return await executeQuery(sql, [id]);
}

