import express from 'express';
import {getAllProducts, getOneProduct, searchProducts} from '../controllers/product.js';
import {protect}  from  "../middlweres/auth.js"

const router = express.Router();

router.get('/', getAllProducts);
router.get('/search',protect,searchProducts);
router.get('/:id',protect,getOneProduct);

export default router;