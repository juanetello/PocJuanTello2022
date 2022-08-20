import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/Usuario.js"
import { tokenJWT, idGenerator } from "../helpers/token.js";
import { registryEmail, emailForgetPassword } from "../helpers/emails.js";

const formLogin = (req, res) => {
    const functionName = "AuthControllers.formLogin"
    console.log(functionName , 'start');

    res.render('auth/login', {
        pagina: 'Iniciar sesion',
        csrfToken: req.csrfToken()
    })
    console.log(functionName , 'end');
}

const autentication = async (req, res) => {
    const functionName = "AuthControllers.autentication"
    console.log(functionName , 'start');

    await check('email').isEmail().withMessage('Email es requerido').run(req);
    await check('password').notEmpty().withMessage('Password es requerido').run(req);
    
    let resultado = validationResult(req);//Validation Result "me informa" el resultado de los check antes agregados

    if (!resultado.isEmpty()) {

        // res.status(403)
        console.log(functionName , 'end');
        return res.render('auth/login', {
            pagina : 'Iniciar sesion',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }

    const {email, password} = req.body;

    const userToLogin = await User.findOne({ where: {email}});

    if (!userToLogin) {
        // res.status(403)
        console.log(functionName , 'end');
            return res.render('auth/login', {
                pagina : 'Iniciar sesion',
                csrfToken: req.csrfToken(),
                errores: [{msg: 'Email no existente para un user'}]
            })
    }

    if (!userToLogin.confirm) {
        // res.status(403)
        console.log(functionName , 'end');
            return res.render('auth/login', {
                pagina : 'Iniciar sesion',
                csrfToken: req.csrfToken(),
                errores: [{msg: 'Email no confirmado'}]
            })
    }

    if (!userToLogin.verifyPassword(password)) {
        // res.status(403)
        console.log(functionName , 'end');
            return res.render('auth/login', {
                pagina : 'Iniciar sesion',
                csrfToken: req.csrfToken(),
                errores: [{msg: 'Password no es correcto'}]
            })
    }

    //  Autenticamos el user, con Json Web Token

    const ourToken = tokenJWT(userToLogin.id)
    console.log('ourToken', ourToken);

    console.log(functionName , 'end');
    // Almacenamos en cookie el token
    return res.cookie('_token', ourToken, {
        httpOnly: true,
        secure:true
    }).redirect('/mis-propiedades')
    
}

const formRegister = (req, res) => {
    const functionName = "AuthControllers.formRegister"
    console.log(functionName , 'start');

    console.log('csrfToken', req.csrfToken());

    res.render('auth/register', {
        pagina: 'Crear cuenta',
        csrfToken: req.csrfToken()
    })

    console.log(functionName , 'end');
}

const registration = async (req, res) => {
    const functionName = "AuthControllers.registration"
    console.log(functionName , 'start');

    // Validacion!!!
    await check('nombre').notEmpty().withMessage('Nombre es requerido').run(req);
    await check('apellido').notEmpty().withMessage('Apellido es requerido').run(req);
    await check('email').isEmail().withMessage('Email es requerido').run(req);
    await check('password').isLength({ min: 6 }).withMessage('Password es requerido y de al menos 6 caracteres').run(req);
    await check('repite_password').equals('password').withMessage('Password no son iguales').run(req);

    let resultado = validationResult(req);//Validation Result "me informa" el resultado de los check antes agregados

    // Extraigo los datos del req con destruction
    const { nombre, apellido, email, password } = req.body;

    //  Verificar que el resultado este vacio
    if (!resultado.isEmpty()) {
        console.log(functionName , 'end');
        return res.render('auth/register', {
            pagina : 'Crear cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            user: {
                nombre,
                apellido,
                email
            }
        })
    }

    // if (!resultado.isEmpty()) {

    //     res.status(403)
    // }


    // Verificamos si el Usuario esta registrado o no
    const registeredUser = await User.findOne({ where: { email } });

    if (registeredUser) {

        // res.status(403)
        console.log(functionName , 'end');

        return res.render('auth/register', {
            pagina : 'Crear cuenta',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'Este email ya se encuentra registrado'}],
            user: {
                nombre,
                apellido,
                email
            }
        })
    }

    //  Creacion/ ALMACENAMIENTO de Usuario
    const user = await User.create({
        nombre,
        apellido,
        email,
        password,
        token: idGenerator()
    });

    // Enviamos mail de confirmacion
    await registryEmail({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        token: user.token
    })

    // res.status(200)

    // Mostramos mensaje de confirmacion
    res.render('templates/mensaje', {
        pagina : 'Cuenta creada correctamente',
        mensaje : 'Hemos enviado un mail a tu cuenta'
    });

    console.log(functionName , 'end');

}

// Comprobamos la cuenta
const checkAccount = async (req, res) => {
    const functionName = "AuthControllers.checkAccount"
    console.log(functionName , 'start');

    const { token } = req.params;
    console.log('TOKEN!!', token);

    const checkUser = await User.findOne({ where: { token } })

    if (!checkUser) {

        // res.status(403)
        console.log(functionName , 'end');

        return res.render('auth/create-account', {
            pagina : 'Error al confirmar tu cuenta',
            mensaje : 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        });
    }

    // confirmar la Cuenta
    checkUser.token = null;
    checkUser.confirm = true;
    // hasta este punto aun continua en memoria, para guardardo/persistirlo en la base hacemos 
    await checkUser.save() //User.save(); // Con esto ya lo persistimos en la base

    console.log('confirm checkUser', JSON.stringify(checkUser));

    // res.status(200)

    console.log(functionName , 'end');

    return res.render('auth/create-account', {
        pagina : 'Cuenta confirmada',
        mensaje : 'La cuenta se confirmo correctamente'
    });

}

const formForgetPassword = (req, res) => {
    const functionName = "AuthControllers.formForgetPassword"
    console.log(functionName , 'start');
    
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso',
        csrfToken: req.csrfToken()
    })

    console.log(functionName , 'end');
}

const resetPassword = async (req, res) => {
    const functionName = "AuthControllers.resetPassword"
    console.log(functionName , 'start');

    // Validacion!!!
    await check('email').isEmail().withMessage('Email es requerido').run(req);

    let resultado = validationResult(req);//Validation Result "me informa" el resultado de los check antes agregados

    // Extraigo los datos del req con destruction
    const { email } = req.body;

    //  Verificar que el resultado este vacio
    if (!resultado.isEmpty()) {

        console.log(functionName , 'end');

        return res.render('auth/olvide-password', {
             pagina : 'Recupera tu acceso',
             errores: resultado.array(),
             csrfToken: req.csrfToken()
        })
    }

    // if (!resultado.isEmpty()) {

    //     res.status(403)
    // }

    // Buscamos el Usuario
    const oldUser = await User.findOne({ where: { email } });

    if (!oldUser) {

        // res.status(403)

        console.log(functionName , 'end');

        return res.render('auth/olvide-password', {
            pagina : 'Recupera tu acceso',
            errores: [{msg: 'El email este no es de nadie pa'}],
            csrfToken: req.csrfToken()
        })
    }


    oldUser.token = idGenerator();
    await oldUser.save();

    // Enviamos mail para resetPassword
    emailForgetPassword({
        email: oldUser.email,
        nombre: oldUser.nombre,
        apellido: oldUser.apellido,
        token: oldUser.token
    })

    // res.status(200)

    // Mostramos mensaje de confirmacion
    res.render('templates/mensaje', {
        pagina : 'Restablece tu pass',
        mensaje : 'Hemos enviado un mail a tu cuenta con las instrucciones'
    });

    console.log(functionName , 'end');

}

const checkToken = async (req, res) => {
    const functionName = "AuthControllers.checkToken"
    console.log(functionName , 'start');

    const { token } = req.params;

    const userChangePass = await User.findOne({ where: { token } })

    if (!userChangePass) {
        // res.status(403)

        console.log(functionName , 'end');

        return res.render('auth/create-account', {
            pagina : 'Reestablece tu pass',
            mensaje : 'Hubo un error al validar tu cuenta, intenta de nuevo',
            error: true
        });
    }

    res.render('auth/reset-password', {
        pagina: 'Reestablece tu pass!!',
        csrfToken: req.csrfToken()
    })

    console.log(functionName , 'end');

}

const newPassword = async (req, res) => {
    const functionName = "AuthControllers.newPassword"
    console.log(functionName , 'start');

    await check('password').isLength({ min: 6 }).withMessage('Password es requerido y de al menos 6 caracteres').run(req);

    let resultado = validationResult(req);//Validation Result "me informa" el resultado de los check antes agregados

    if (!resultado.isEmpty()) {

        console.log(functionName , 'end');

        return res.render('auth/reset-password', {
            pagina : 'Reestablece tu pass',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        })
    }

    // if (!resultado.isEmpty()) {

    //     res.status(403)
    // }

    // Extraigo los datos del req con destruction
    const { password } = req.body;

    console.log('res.params', JSON.stringify(req.params));
    const { token } = req.params;

    // Identificamos quien hace el cambio, que Usuario
    const userToUpdate = await User.findOne({ where: { token } })

    // Hasheamos el nuevo pass aca, ya que el HOOK del Modelo no lo puede hacer
    // o no tiene "ese fin" existe un update pero se ejecuta/utiliza para otra cosa
    const salt = await bcrypt.genSalt(13)
    userToUpdate.password = await bcrypt.hash(password, salt);
    userToUpdate.token = null;

    await userToUpdate.save();

    // res.status(200)

    res.render('auth/create-account', {
        pagina : 'Password reestablecido',
        mensaje : 'La pass se guardo correctamente'
    });

    console.log(functionName , 'end');

}

export const AuthControllers = {
    formLogin,
    autentication,
    formRegister,
    registration,
    checkAccount,
    formForgetPassword,
    resetPassword,
    checkToken,
    newPassword
}