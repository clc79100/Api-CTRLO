import { executeQuery } from './dbService.js';

export async function getAllUsers(role = null) {
  const sql = 'CALL sp_User_List(?)';
  return await executeQuery(sql, [role]);
}

export async function getUserDetail(id) {
  const sql = 'CALL sp_User_Detail(?)';
  return await executeQuery(sql, [id]);
}

export async function insertUser(email, password, role) {
  const sql = 'CALL sp_Insert_User(?, ?, ?)';
  return await executeQuery(sql, [email, password, role]);
}

export async function updateUser(id, email, password, role) {
  const sql = 'CALL sp_Update_User(?, ?, ?, ?)';
  return await executeQuery(sql, [id, email, password, role]);
}

export async function deleteUser(id) {
  const sql = 'CALL sp_Delete_User(?)';
  return await executeQuery(sql, [id]);
}

