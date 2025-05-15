import express from 'express';
import {getAllProducts, getOneProduct} from '../controllers/product.js';
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getOneProduct);

export default router;