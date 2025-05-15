import express from 'express';
import { Add_product, Update_product, Delete_product, Get_product, Get_all_products } from '../controllers/seller.js';
const router = express.Router(); 

router.get('/', Get_all_products);
router.get('/:id', Get_product); 
router.post('/', Add_product);
router.patch('/:id', Update_product);
router.delete('/:id', Delete_product);

export default router;