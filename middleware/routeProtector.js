import jwt from "jsonwebtoken";
import {Usuario} from '../models/index.js';

const routeProtector = async (req, res, next) => {
    const functionName = "middleware.routeProtector"
    console.log(functionName , 'start');

    const {_token} = req.cookies;

    if (!_token) {

        console.log(functionName , 'end');
        return res.render('/auth/login')        
    }

    // Chequeamos el token que sea valido
    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET);
        const user = await Usuario.scope('deleteDataToShow').findByPk(decoded.id)

        if (user) {
            req.user = user;
        } else {
            console.log(functionName , 'end');
            return res.redirect('/auth/login');
        }

        console.log(functionName , 'end');
        return next();
        
    } catch (error) {

        console.log(functionName , 'end');
        return res.clearCookies('_token').redirect('auth/login');
    }
}

export default routeProtector;