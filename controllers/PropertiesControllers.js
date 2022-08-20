
const admin = (req, res) => {
    const functionName = "PropertiesContoller.admin"
    console.log(functionName , 'start');
    // res.send('mis propiedades') SE usa para pegar un texto o algo en la pantalla

    res.render('properties/admin', {
        pagina: 'Mis propiedades',
        csrfToken: req.csrfToken(),
        barra: true
    })

    console.log(functionName , 'end');

}

const create = (req, res) => {
    const functionName = "PropertiesContoller.create"
    console.log(functionName , 'start');

    res.render('properties/create', {
        pagina: 'Crear propiedad',
        csrfToken: req.csrfToken(),
        barra: true
    })

    console.log(functionName , 'end');

}

export const PropertiesControllers = {
    admin,
    create
}