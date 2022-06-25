import Product from '../models/Product.model.js'
import { mongoose } from 'mongoose';

export default{
    async createProduct(title, description, price, status, Image, category) {
        await Product.create({ title, description, price, status, Image, category});
    },
    async getListProductByCategory(category, pageNumber, nPerPage = 20) {
        console.log(pageNumber)
        const list = await Product.find({category: new mongoose.Types.ObjectId(category)})
        .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
        .limit( nPerPage )
        return list
    }
}