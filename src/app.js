import express from 'express';
import fs from 'fs';
import productManager from './ProductManager.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 8080;



app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const limitProducts = parseInt(req.query.limit);
        if(limitProducts) {
            const limitedInfo = products.slice(0, limitProducts);
            return res.status(200).send(limitedInfo);
        }
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).send('Error al conectar con el servidor' + err.message);
    }
});

/* app.get('/products/:id', async (req, res) => {
    try{
        const productID = req.params.id;
        const productByID = await productManager.getProductById(productID);
        res.status(200).send(productByID);
    }
    catch(err){
        res.status(500).send('Error al conectar con el servidor' + err.message);
    }
}); */

app.get('/products/:id', async (req, res) => {
    try{
        const productID = req.params.id;
        const products = await productManager.getProducts();
        const product = products.find(prod => prod.id === productID);
        if(!product) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).send(product);
        }
    }
    catch(err){
        res.status(500).send('Error al conectar con el servidor' + err.message);
    };
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})