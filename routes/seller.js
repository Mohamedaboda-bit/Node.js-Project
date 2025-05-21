import express from 'express';
import { Add_product, Update_product, Delete_product, Get_all_products } from '../controllers/seller.js';
import {imageUplaod} from '../Utlites/imageUplaod.js';
import {seller}  from  "../middlweres/auth.js"



const router = express.Router(); 
router.use(seller)

router.get('/', Get_all_products);
router.post('/',imageUplaod.single('avatar'), Add_product);
router.patch('/:id',Update_product);
router.delete('/:id', Delete_product);

export default router;