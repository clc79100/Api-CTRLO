import { executeQuery } from './dbService.js';

export async function getStockReport(categoryId, minStock = null, maxStock = null) {
  const sql = 'CALL sp_Stock_Report(?, ?, ?)';
  return await executeQuery(sql, [categoryId, minStock, maxStock]);
}

export async function getProductDetail(productId) {
  const sql = 'CALL sp_Product_Detail(?)';
  return await executeQuery(sql, [productId]);
}

export async function insertProduct(name, color, price, stockS, stockM, stockL, providerId, categoryId) {
  const sql = 'CALL sp_Insert_Product(?, ?, ?, ?, ?, ?, ?, ?)';
  return await executeQuery(sql, [name, color, price, stockS, stockM, stockL, providerId, categoryId]);
}

export async function updateProduct(code, name, color, price, stockS, stockM, stockL, providerId, categoryId) {
  const sql = 'CALL sp_Update_Product(?, ?, ?, ?, ?, ?, ?, ?, ?)';
  return await executeQuery(sql, [code, name, color, price, stockS, stockM, stockL, providerId, categoryId]);
}

export async function deleteProduct(productId) {
  const sql = 'CALL sp_Delete_Product(?)';
  return await executeQuery(sql, [productId]);
}

