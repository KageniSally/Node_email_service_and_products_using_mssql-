import { Router } from 'express'
import { addProduct, getProducts, getProduct, getCategoryProduct, deleteProducts, updateProduct } from '../Controllers/productController'
import { verifyToken } from '../Middleware'

const productRouter = Router()
productRouter.post('', addProduct)
productRouter.get('', verifyToken, getProducts)
productRouter.get('/:id', getProduct)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProducts)
productRouter.get('/category/:categoryId', getCategoryProduct)

export default productRouter

