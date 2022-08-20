import express from "express";
import userRouter from "./users/index.js";
import propertiesRouter from "./properties/index.js";

const mainRouter = express.Router();

mainRouter.use('/auth', userRouter)
mainRouter.use('/', propertiesRouter)

export default mainRouter