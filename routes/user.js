import express from 'express';
import {Register, Login, Reset_password, Update_user, Delete_user} from '../controllers/user.js';
import {protect}  from  "../middlweres/auth.js"
import {valdate}  from  "../middlweres/valdation.js"
import {registerSchema} from '../Utlites/validationScehma.js'

const router = express.Router();

router.patch('/', protect,Update_user);
router.delete('/',protect, Delete_user);  
router.post('/reset_password',protect,Reset_password);
router.post('/Register',valdate(registerSchema),Register);
router.post('/login', Login); 



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