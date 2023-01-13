import { validationResult } from "express-validator";

import { Price, Category, Usuario, Property } from "../models/index.js"

const admin = async (req, res) => {
    const functionName = "PropertiesContoller.admin"
    console.log(functionName, '****** start ******');

    const { id } = req.user;
    console.log('ID:', id);

    const properties = await Property.findAll({
        where: {
            userId: id
        },
        include: [
            { model: Category, as: 'category' },
            { model: Price, as: 'price' }

        ]
    })

    res.render('properties/admin', {
        pagina: 'Mis propiedades',
        csrfToken: req.csrfToken(),
        properties
    })

    console.log(functionName, '------ end ------');

}

const create = async (req, res) => {
    const functionName = "PropertiesContoller.create"
    console.log(functionName, '****** start ******');

    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('properties/create', {
        pagina: 'Crear propiedad',
        csrfToken: req.csrfToken(),
        categories,
        prices,
        datos: {}
    })

    console.log(functionName, '------ end ------');

}

const save = async (req, res) => {
    const functionName = "PropertiesContoller.save"
    console.log(functionName, '****** start ******');

    let result = validationResult(req);

    console.log('!result.isEmpty()', !result.isEmpty());

    if (!result.isEmpty()) {

        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ])

        return res.render('properties/create', {
            pagina: 'Crear propiedad',
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errores: result.array(),
            datos: req.body
        })
    }

    // Creamos registro de la propiedad

    // Destructuring
    // en este podemos "renombrar la variable" --> price : priceId
    const { titulo, descripcion, rooms, parking, bathroom, calle, lat, lng, price: priceId, categories: categoryId } = req.body;

    console.log('FUERA DEL IF ya en Creamos registro de la propiedad');
    console.log('titulo -->', titulo);
    console.log('descripcion -->', descripcion);
    console.log('rooms -->', rooms);
    console.log('parking -->', parking);
    console.log('bathroom -->', bathroom);
    console.log('calle -->', calle);
    console.log('lat -->', lat);
    console.log('lng -->', lng);
    console.log('priceId -->', priceId);
    console.log('categoryId -->', categoryId);

    const { id: userId } = req.user;
    console.log('userId -->', userId);

    try {
        // Al ser un OBJETO el create que enviamos,
        // podemos utilizar Object literal ....?
        const propertieSave = await Property.create({
            titulo,
            descripcion,
            rooms,
            parking,
            bathroom,
            calle,
            lat,
            lng,
            priceId,
            categoryId,
            userId,
            imagen: ''
        });

        const { id } = propertieSave;
        console.log('ID prop guardada', id);

        console.log(`/properties/agregar-imagen/${id}`);
        // http://localhost:4343/properties/agregar-imagen/76bb5f39-e398-4d3b-a12c-fa467b119415

        res.redirect(`/properties/agregar-imagen/${id}`)

    } catch (error) {
        console.log('error', error);
    }

    console.log(functionName, '------ end ------');
}

const addImage = async (req, res) => {
    const functionName = "PropertiesContoller.addImage"
    console.log(functionName, '****** start ******');

    // res.send('Agregando imagen')
    // http://localhost:4343/properties/agregar-imagen/9ab811b4-82d1-425c-b911-afc525f7bddd

    // 822f6bb6-805e-4474-9815-ae873141ddd0 ejemplo ID
    // Validamos que la propiedad existe
    const { id } = req.params

    // Validar que la propiedad existe
    const property = await Property.findByPk(id);

    console.log('property-->', JSON.stringify(property));
    console.log('property ID', property.id);

    if (!property) {
        return res.redirect('/mis-propiedades');
    }

    // Validamos que la propiedad no este publicada
    if (property.publicado) {
        return res.redirect('/mis-propiedades');
    }

    // Validamos que la propiedad pertenece a quien visita la pagina
    // Usamos el middleware routeProtector, de esta forma agregamos la info
    // del usuario al request
    console.log('user en request ', req.user);
    console.log('req.user.id.toString() !== property.userId.toString()', req.user.id.toString() !== property.userId.toString());
    console.log('req.user.id.toString()', req.user.id.toString());
    console.log('property.userId.toString()', property.userId.toString());

    if (req.user.id.toString() !== property.userId.toString()) {
        return res.redirect('/mis-propiedades')
    }

    res.render('properties/agregar-imagen', {
        pagina: `Agregar imagen de propiedad ${property.titulo}, y ID ${property.id} `,
        csrfToken: req.csrfToken(),
        property
    })

    console.log(functionName, '------ end ------');
}

const saveImage = async (req, res, next) => {
    const functionName = "PropertiesContoller.saveImage"
    console.log(functionName, '****** start ******');

    /* Para asegurar MAS el endPoint (sacar a una fn externa?? utils maybe) */
    // Validamos que la propiedad existe
    const { id } = req.params

    // Validar que la propiedad existe
    const property = await Property.findByPk(id);

    if (!property) {
        return res.redirect('/mis-propiedades');
    }

    // Validamos que la propiedad no este publicada
    if (property.publicado) {
        return res.redirect('/mis-propiedades');
    }

    // Validamos que la propiedad pertenece a quien visita la pagina
    // Usamos el middleware routeProtector, de esta forma agregamos la info
    // del usuario al request
    console.log('user en request ', req.user);

    if (req.user.id.toString() !== property.userId.toString()) {
        return res.redirect('/mis-propiedades')
    }

    try {
        // Sacamos DATA del request para SABER que trae file... Eso ya lo "carga" multer
        console.log('req.file', req.file);
        console.log('req.files', req.files);

        property.imagen = req.file.filename;
        property.publicado = 1;

        await property.save();

        next()

    } catch (error) {
        console.log('error ', error);
    }

    console.log(functionName, '------ end ------');
}

const edit = async (req, res) => {
    const functionName = "PropertiesContoller.edit"
    console.log(functionName, '****** start ******');

    /* Para asegurar MAS el endPoint (sacar a una fn externa?? utils maybe) */
    // Validamos que la propiedad existe
    const { id } = req.params

    // Validar que la propiedad existe
    const property = await Property.findByPk(id);

    if (!property) {
        return res.redirect('/mis-propiedades');
    }

    if (req.user.id.toString() !== property.userId.toString()) {
        return res.redirect('/mis-propiedades')
    }

    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('properties/edit', {
        pagina: `Editar propiedad: ${property.titulo}`,
        csrfToken: req.csrfToken(),
        categories,
        prices,
        datos: property
    })

    console.log(functionName, '------ end ------');
}

const saveChage = async (req, res) => {
    const functionName = "PropertiesContoller.saveChage"
    console.log(functionName, '****** start ******');

    // Verificamos la validacion
    let result = validationResult(req);

    console.log('!result.isEmpty()', !result.isEmpty());

    if (!result.isEmpty()) {

        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ])

        return res.render('properties/edit', {
            pagina: 'Editar propiedad',
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errores: result.array(),
            datos: req.body
        })
    }

    // Validamos que la propiedad existe   
    const { id } = req.params

    // Validar que la propiedad existe
    const property = await Property.findByPk(id);

    if (!property) {
        return res.redirect('/mis-propiedades');
    }

    if (req.user.id.toString() !== property.userId.toString()) {
        return res.redirect('/mis-propiedades')
    }

    // Reescribir el objeto y actualizar

    try {
        console.log('property: ', JSON.stringify(property));

        const { titulo, descripcion, rooms, parking, bathroom, calle, lat, lng, price: priceId, categories: categoryId } = req.body;
        
        property.set({
            titulo,
            descripcion,
            rooms,
            parking,
            bathroom,
            calle,
            lat,
            lng,
            priceId,
            categoryId 
        });
        
        await property.save();

        res.redirect('/mis-propiedades')

    } catch (error) {
        console.log('error--> ',error);
    }



    console.log(functionName, '------ end ------');
}

export const PropertiesControllers = {
    admin,
    create,
    save,
    addImage,
    saveImage,
    edit,
    saveChage
}