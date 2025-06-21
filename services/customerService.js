import { executeQuery } from './dbService.js';

export async function getAllCustomers() {
  const sql = 'CALL sp_Customer_List()';
  return await executeQuery(sql);
}

export async function getCustomerDetail(customerId) {
  const sql = 'CALL sp_Customer_Detail(?)';
  return await executeQuery(sql, [customerId]);
}


export async function insertCustomer(name) {
  const sql = 'CALL sp_Insert_Customer(?)';
  return await executeQuery(sql, [name]);
}

export async function updateCustomer(id, name) {
  const sql = 'CALL sp_Update_Customer(?, ?)';
  return await executeQuery(sql, [id, name]);
}

export async function deleteCustomer(id) {
  const sql = 'CALL sp_Delete_Customer(?)';
  return await executeQuery(sql, [id]);
}

