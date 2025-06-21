
import { executeQuery } from './dbService.js';

export async function getSalesReport(startDate = null, endDate = null) {
  const sql = 'CALL sp_Sales_Report(?, ?)';
  return await executeQuery(sql, [startDate, endDate]);
}
export async function getSaleDetail(saleId) {
  const sql = 'CALL sp_Sale_Detail(?)';
  return await executeQuery(sql, [saleId]);
}

export async function insertSale(invoiceNumber, saleDate, customerId, productsSold) {
  const sql = 'CALL sp_Insert_Sale(?, ?, ?, ?)';

  const productsJSON = JSON.stringify(productsSold);

  return await executeQuery(sql, [invoiceNumber, saleDate, customerId, productsJSON]);
}

export async function deleteSale(saleId) {
  const sql = 'CALL sp_Delete_Sale(?)';
  return await executeQuery(sql, [saleId]);
}

