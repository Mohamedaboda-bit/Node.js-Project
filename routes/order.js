import express from 'express';
import {getAllOrders, deleteOrder, createOrder, updateOrder} from '../controllers/order.js';
import {customer}  from  "../middlweres/auth.js"
import {valdate}  from  "../middlweres/valdation.js"
import {createOrderSchema} from '../Utlites/validationScehma.js'

const router = express.Router();

router.get('/',customer, getAllOrders);
router.delete('/:id',customer, deleteOrder);
router.post('/', valdate(createOrderSchema),customer ,createOrder);
router.patch('/:id',customer, updateOrder);

export default router;