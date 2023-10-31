import express from 'express';
import { productsRouter } from './routes/products.router.js';
import { cartRouter } from './routes/cart.router.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});