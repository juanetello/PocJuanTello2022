import nodemailer from "nodemailer";

const registryEmail = async (data) => {
    const functionName = "emailHelper.registryEmail"
    console.log(functionName , 'start');

    const transport = infoTransport();

    console.log('data en registryEmail', data);

    const { nombre, apellido, email, token } = data;

    await transport.sendMail({
        from: 'Juan POC',
        to : email,
        subject: 'Hola que tal? te llego un mail',
        text: 'Hola que tal? te llego un mail',
        html: `
            <p>Hola ${nombre},${apellido}, comprueba tu cuenta</p>

            <p>Tu cuenta esta lista para ser activada, dale click al siguiente enlace 
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4343}/auth/checkAccount/${token}">Confirmar cuenta</a> </p>

            <p>Si no creaste esta cuenta en Juan POC, ignora el mensaje</p>
        `
    })

    console.log(functionName , 'end');
}

// TODO refactorizar para usar una fn con parametros
const emailForgetPassword = async (data) => {
    const functionName = "emailHelper.emailForgetPassword"
    console.log(functionName , 'start');

    const transport = infoTransport();

    console.log('data en emailForgetPassword =', data);

    const { nombre, apellido, email, token } = data;

    await transport.sendMail({
        from: 'Juan POC',
        to : email,
        subject: 'Restablecer contraseña!!',
        text: 'Restablecer contraseña!!',
        html: `
            <p>Hola ${nombre},${apellido}, estas restableciendo tu contraseña</p>

            <p>Genera una contraseña nueva con este link: 
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4343}/auth/olvide-password/${token}">Reestablecer contraseña</a> </p>

            <p>Si no pediste cambiar la contraseña, ignora el mensaje</p>
        `
    })

    console.log(functionName , 'end');
}

const infoTransport = () => {
    const functionName = "emailHelper.infoTransport"
    console.log(functionName , 'start and end');

    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

export {
    registryEmail,
    emailForgetPassword
}