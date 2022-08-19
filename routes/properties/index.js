import express from 'express';
import { PropertiesControllers } from '../../controllers/index.js';

const propertiesRouter = express.Router();

propertiesRouter.get('/mis-propiedades', PropertiesControllers.admin)

export default propertiesRouter