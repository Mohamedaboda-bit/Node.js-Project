import express from 'express';
import {getAllOrders, deleteOrder, createOrder, updateOrder} from '../controllers/order.js';
const router = express.Router();

router.get('/', getAllOrders);
router.delete('/:id', deleteOrder);
router.post('/', createOrder);
router.patch('/:id', updateOrder);

export default router;