import express from 'express';
import { UserControllers } from '../../controllers/index.js';

const userRouter = express.Router();

userRouter.get('/login', UserControllers.formLogin) 
userRouter.post('/login', UserControllers.autentication) 

userRouter.get('/register', UserControllers.formRegister)

userRouter.post('/register', UserControllers.registration)

userRouter.get('/checkAccount/:token', UserControllers.checkAccount)

userRouter.get('/olvide-password', UserControllers.formForgetPassword)

userRouter.post('/olvide-password', UserControllers.resetPassword)

// Almacenamiento nuevo pass
userRouter.get('/olvide-password/:token', UserControllers.checkToken);
userRouter.post('/olvide-password/:token', UserControllers.newPassword);

export default userRouter