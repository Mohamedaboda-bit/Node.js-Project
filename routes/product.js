import express from 'express';
import {getAllProducts, getOneProduct,createProduct} from '../controllers/product.js';
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.post('/', createProduct);

export default router;