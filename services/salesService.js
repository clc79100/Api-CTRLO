
import { executeQuery } from './dbService.js';

export async function getSalesReport(startDate = null, endDate = null) {
  const sql = 'CALL sp_Sales_Report(?, ?)';
  return await executeQuery(sql, [startDate, endDate]);
}
export async function getSaleDetail(saleId) {
  const sql = 'CALL sp_Sale_Detail(?)';
  return await executeQuery(sql, [saleId]);
}

export async function insertSale(sale_date, customer_id, products_sold) {
  const sql = 'CALL sp_Insert_Sale(?, ?, ?)';

  const productsJSON = JSON.stringify(products_sold);

  return await executeQuery(sql, [sale_date, customer_id, productsJSON]);
}

export async function deleteSale(saleId) {
  const sql = 'CALL sp_Delete_Sale(?)';
  return await executeQuery(sql, [saleId]);
}

