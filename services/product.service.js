import Product from '../models/Product.model.js'

export default{
    async createProduct(title, description, price, status, Image, category) {
        await Product.create({ title, description, price, status, Image, category});
    },
}