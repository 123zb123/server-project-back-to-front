import express from 'express';
import productsController from './controller.products.js'

const router = express.Router()

// GET localhost:8200/api/users/
router.get('/', productsController.getAllProducts)

// GET localhost:8020/api/users/8
router.get('/:id', productsController.getProductById)

// POST localhost:8200/api/products/
router.post('/', productsController.addNewProduct)

// PATCH localhost:8200/api/products/4
router.patch('/:id', productsController.updateProduct)

// PATCH localhost:8200/api/products/9
router.delete('/:id', productsController.deleteProduct)


export default router;