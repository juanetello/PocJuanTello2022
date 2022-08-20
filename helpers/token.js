import jwt from "jsonwebtoken";

const tokenJWT = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});

const idGenerator = () => Math.random().toString(32).substring(2) + Date.now().toString(32);

export {
    tokenJWT,
    idGenerator
}