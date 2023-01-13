import express from 'express';
import { body } from "express-validator";
import { PropertiesControllers } from '../../controllers/index.js';
import routeProtector from '../../middleware/routeProtector.js';
import upload from '../../middleware/uploadFiles.js';

const propertiesRouter = express.Router();

propertiesRouter.get('/mis-propiedades', routeProtector, PropertiesControllers.admin)
propertiesRouter.get('/propiedades/create', routeProtector, PropertiesControllers.create);
propertiesRouter.post('/propiedades/create', 
    routeProtector, 
    body('titulo').notEmpty().withMessage('Ingese el titulo de la propiedad'),
    body('descripcion')
        .notEmpty().withMessage('Ingese la descripcion de la propiedad')
        .isLength({max: 200}).withMessage('La descripcion de la propiedad es muy larga'),
    body('categories').isNumeric().withMessage('Seleccione valor para categories de la propiedad'),
    body('price').isNumeric().withMessage('Seleccione valor para price de la propiedad'),
    body('rooms').isNumeric().withMessage('Seleccione valor para rooms de la propiedad'),
    body('parking').isNumeric().withMessage('Seleccione valor para parking de la propiedad'),
    body('bathroom').isNumeric().withMessage('Seleccione valor para bathroom de la propiedad'),
    body('lat').isNumeric().withMessage('Seleccione ubicacion de la propiedad'),
    PropertiesControllers.save
);
propertiesRouter.get('/properties/agregar-imagen/:id', routeProtector, PropertiesControllers.addImage)
propertiesRouter.post('/properties/agregar-imagen/:id', routeProtector,
    /* Para una imagen */
    upload.single('images'),
    /* Para multiples imagenes le pasas un array */
    // upload.array()
    PropertiesControllers.saveImage
)
propertiesRouter.get('/properties/editar/:id', routeProtector, PropertiesControllers.edit)

propertiesRouter.post('/properties/editar/:id', 
    routeProtector, 
    body('titulo').notEmpty().withMessage('Ingese el titulo de la propiedad'),
    body('descripcion')
        .notEmpty().withMessage('Ingese la descripcion de la propiedad')
        .isLength({max: 200}).withMessage('La descripcion de la propiedad es muy larga'),
    body('categories').isNumeric().withMessage('Seleccione valor para categories de la propiedad'),
    body('price').isNumeric().withMessage('Seleccione valor para price de la propiedad'),
    body('rooms').isNumeric().withMessage('Seleccione valor para rooms de la propiedad'),
    body('parking').isNumeric().withMessage('Seleccione valor para parking de la propiedad'),
    body('bathroom').isNumeric().withMessage('Seleccione valor para bathroom de la propiedad'),
    body('lat').isNumeric().withMessage('Seleccione ubicacion de la propiedad'),
    PropertiesControllers.saveChage
);

export default propertiesRouter