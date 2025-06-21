import { executeQuery } from './dbService.js';


export async function getAllProviders() {
  const sql = 'CALL sp_Provider_List()';
  return await executeQuery(sql);
}


export async function getProviderDetail(providerId) {
  const sql = 'CALL sp_Provider_Detail(?)';
  return await executeQuery(sql, [providerId]);
}


export async function insertProvider(name, email, phone) {
  const sql = 'CALL sp_Insert_Provider(?, ?, ?)';
  return await executeQuery(sql, [name, email, phone]);
}


export async function updateProvider(id, name, email, phone) {
  const sql = 'CALL sp_Update_Provider(?, ?, ?, ?)';
  return await executeQuery(sql, [id, name, email, phone]);
}


export async function deleteProvider(id) {
  const sql = 'CALL sp_Delete_Provider(?)';
  return await executeQuery(sql, [id]);
}

