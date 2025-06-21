import express from 'express';

import userRouter from './routes/userRouter.js';
import customerRouter from './routes/customerRouter.js';
import providerRouter from './routes/providerRouter.js';
import productRouter from './routes/productRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import salesRouter from './routes/salesRouter.js';

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/customers', customerRouter);
app.use('/api/providers', providerRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/sales', salesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

