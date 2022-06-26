import productService from "../../services/product.service.js";
export default {
    async getProductsByCategory (req, res) {
        const {category, page} = req?.query
        if(category){
            const listProducts = await productService.getListProductByCategory(category, page?page:1)
            res.send({
                data: listProducts
            })
        }
        else 
        res.status(400).json({success: false, message: 'Category is not already exists'});
    }   
}
