import fs from 'fs';

class ProductManager {
    constructor() {
        this.path = 'Products.json';
    };

    async writeFile(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8');
    };

    async readFile() {
        try {
            const infoProduct = await fs.promises.readFile(this.path);
            const products = JSON.parse(infoProduct);
            return products;
        }
        catch (error) {
            return [];
        }
    };

    async addProduct(title, description, price, thumbnail, code, stock) {
            const file = await this.readFile();
            const id = file.length === 0 ? file.length + 1 : file[file.length - 1].id + 1;
            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id
            };
            const codeValidation = file.find(data => data.code === code);
            const productValidation = product.title != '' && product.description != '' && product.price != '' && product.thumbnail != '' && product.code != '' && product.stock != ''
            if (!codeValidation && productValidation) {
                file.push(product);
                await this.writeFile(file);
                return 'Producto cargado';
            }
            else {
                return `El producto con código ${product.code} ya fue ingresado`
            };
    };

    async getProducts() {
        
            const products = await this.readFile();
            return products;
    };

    async getProductById(id) {
            const products = await this.readFile();
            const idProduct = products.find(product => product.id === id);
            if (idProduct) {
                return idProduct;
            }
            else {
                return;
            };
    };

    async updateProduct(id, newProduct) {
            const products = await this.readFile();
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex !== -1) {
                const updatedProduct = {
                    ...products[productIndex],
                    ...newProduct
                };
                products[productIndex] = updatedProduct;
                await this.writeFile(products);
                return 'Producto actualizado';
            } else {
                return 'Producto no encontrado';
            };
    };

    async deleteProduct(id) {
            const products = await this.readFile();
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex !== -1) {
                products.splice(productIndex, 1);
                await this.writeFile(products);
                return 'Producto eliminado';
            }
            else {
                return 'Producto no encontrado';
            };
    };


};

const productManager = new ProductManager();
export default productManager;
