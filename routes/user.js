import express from 'express';
import {Register, Login, Reset_password, Update_user, Delete_user} from '../controllers/user.js';

const router = express.Router();

router.patch('/', Update_user);
router.delete('/', Delete_user);
router.post('/Register',Register);
router.post('/login', Login);   
router.post('/reset_password', Reset_password);



// ------------------------------ bouns ya shabab ---------------------------- 
// router.post('/send_email_to_rest_password', (req, res) => {
//   const orderId = req.params.id;
//   const updatedOrder = req.body;
//   // Update the order
//   res.send(`Order with ID: ${orderId} updated`);
// });

// router.post('/rest_password', (req, res) => {
//   const orderId = req.params.id;
//   const updatedOrder = req.body;
//   // Update the order
//   res.send(`Order with ID: ${orderId} updated`);
// });

export default router;