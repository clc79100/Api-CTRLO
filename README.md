# ModaStore API

Proyecto Node.js con Express y MySQL2 que expone una API RESTful para gestionar:

- Usuarios
- Clientes
- Ventas
- Proveedores
- Productos
- Categorías

Todas las operaciones con la base de datos se realizan mediante procedimientos almacenados (Stored Procedures).

---

## Cómo iniciar el proyecto

```bash
npm install
node index.js
````

Por defecto se inicia en: `http://localhost:3000`

---

## Estructura general del proyecto

```
/config
  └── db-connection.js     ← conexión a MySQL
/services
  └── *.js                 ← lógica por entidad (userService, salesService, etc.)
/routes
  └── *.js                 ← rutas Express por entidad
index.js                  ← punto de entrada, une rutas y arranca el servidor
README.md                 ← este archivo
```

---

## Función central de base de datos

En `/services/dbService.js` se define:

```js
// Ejecuta cualquier query con promesas
export async function executeQuery(sql, params = []) {
  try {
    const [rows] = await connection.execute(sql, params);
    return rows;
  } catch (error) {
    throw error;
  }
}
```

Todos los services la usan para invocar stored procedures con sus parámetros.

---

## Servicios (`/services/*.js`)

Cada archivo de servicio agrupa funciones que hacen llamadas a procedimientos almacenados.
Por ejemplo:

### `/services/userService.js`

```js
export async function getAllUsers(role = null) {
  const sql = 'CALL sp_User_List(?)';
  return await executeQuery(sql, [role]);
}

export async function insertUser(email, password, role) {
  const sql = 'CALL sp_Insert_User(?, ?, ?)';
  return await executeQuery(sql, [email, password, role]);
}
```

Todos los demás servicios siguen esta lógica:

* Preparar la sentencia SQL del SP (`CALL nombre_sp(...)`)
* Ejecutar con `executeQuery`
* Retornar el resultado al router

---

## Endpoints de la API

### Usuarios

| Método | Ruta                  | Descripción              |
| ------ | --------------------- | ------------------------ |
| GET    | /api/users            | Lista todos los usuarios |
| GET    | /api/users?role=admin | Lista por rol            |
| GET    | /api/users/\:id       | Detalle por ID           |
| POST   | /api/users            | Crear nuevo usuario      |
| PUT    | /api/users/\:id       | Actualizar usuario       |
| DELETE | /api/users/\:id       | Eliminar usuario         |

Ejemplo `POST /api/users`:

```json
{
  "email": "correo@ejemplo.com",
  "password": "clave123",
  "role": "admin"
}
```

---

### Clientes

| Método | Ruta                | Descripción              |
| ------ | ------------------- | ------------------------ |
| GET    | /api/customers      | Lista todos los clientes |
| GET    | /api/customers/\:id | Detalle con historial    |
| POST   | /api/customers      | Crear cliente            |
| PUT    | /api/customers/\:id | Actualizar nombre        |
| DELETE | /api/customers/\:id | Eliminar cliente         |

---

### Ventas

| Método | Ruta                                 | Descripción         |
| ------ | ------------------------------------ | ------------------- |
| GET    | /api/sales/report                    | Reporte completo    |
| GET    | /api/sales/report?start=...\&end=... | Reporte filtrado    |
| GET    | /api/sales/\:id                      | Detalle + productos |
| POST   | /api/sales                           | Registrar venta     |
| DELETE | /api/sales/\:id                      | Eliminar venta      |

Ejemplo `POST /api/sales`:

```json
{
  "invoiceNumber": 112,
  "saleDate": "2023-10-04",
  "customerId": 1,
  "productsSold": [
    { "product_id": 1, "product_quantity": 2 },
    { "product_id": 3, "product_quantity": 1 }
  ]
}
```

---

### Proveedores

| Método | Ruta                | Descripción          |
| ------ | ------------------- | -------------------- |
| GET    | /api/providers      | Lista de proveedores |
| GET    | /api/providers/\:id | Detalle + productos  |
| POST   | /api/providers      | Crear proveedor      |
| PUT    | /api/providers/\:id | Actualizar proveedor |
| DELETE | /api/providers/\:id | Eliminar proveedor   |

---

### Productos

| Método | Ruta                       | Descripción         |
| ------ | -------------------------- | ------------------- |
| GET    | /api/products/stock-report | Reporte de stock    |
| GET    | /api/products/\:id         | Detalle por ID      |
| POST   | /api/products              | Insertar producto   |
| PUT    | /api/products/\:id         | Actualizar producto |
| DELETE | /api/products/\:id         | Eliminar producto   |

Ejemplo `POST /api/products`:

```json
{
  "name": "Camisa",
  "color": "Azul",
  "price": 19.99,
  "stockS": 10,
  "stockM": 5,
  "stockL": 8,
  "providerId": 1,
  "categoryId": 1
}
```

---

### Categorías

| Método | Ruta                 | Descripción          |
| ------ | -------------------- | -------------------- |
| GET    | /api/categories      | Lista de categorías  |
| POST   | /api/categories      | Crear categoría      |
| PUT    | /api/categories/\:id | Actualizar categoría |
| DELETE | /api/categories/\:id | Eliminar categoría   |

Ejemplo `POST /api/categories`:

```json
{
  "name": "Ropa deportiva"
}
```

---

## Consideraciones técnicas

* Todas las operaciones usan procedimientos almacenados (SP) de MySQL.
* Se usa `mysql2` con `async/await` para consultas asíncronas.
* La conexión a la base de datos está en `/config/db-connection.js`.
* Las respuestas son en formato JSON.

---

## Requisitos

* Node.js `>=18`
* MySQL `>=8.0.36`

---
