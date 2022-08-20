import express from 'express';
import { AuthControllers } from '../../controllers/index.js';

const userRouter = express.Router();

userRouter.get('/login', AuthControllers.formLogin) 
userRouter.post('/login', AuthControllers.autentication) 

userRouter.get('/register', AuthControllers.formRegister)

userRouter.post('/register', AuthControllers.registration)

userRouter.get('/checkAccount/:token', AuthControllers.checkAccount)

userRouter.get('/olvide-password', AuthControllers.formForgetPassword)

userRouter.post('/olvide-password', AuthControllers.resetPassword)

// Almacenamiento nuevo pass
userRouter.get('/olvide-password/:token', AuthControllers.checkToken);
userRouter.post('/olvide-password/:token', AuthControllers.newPassword);

export default userRouter