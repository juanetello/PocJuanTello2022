import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import userRouter from "./routes/users/index.js";
import propertiesRouter from "./routes/properties/index.js";
import database from "./config/db.js";

// crear una app de express y el puerto
const app = express();
const port = process.env.PORT || 4343;

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Habilitar Cookie Parser
app.use(cookieParser());

// Habilitar CSRF cross site request forgery
app.use(csrf({cookie: true}));

//Conexion BASE!
try {
    await database.authenticate();
    database.sync()
    console.log('ð Conexion con la base correctamente ðð');
    
} catch (error) {
    console.log('ð¤·ââï¸ Error: ' , error);
}

// habilitamos view engine PUG
app.set('view engine', 'pug'); // SET es para agregar configuracion
// AÃ±adimos la carpeta de las vistas
app.set('views', './views');

// Carpeta publica
app.use(express.static('public'));

// Routing
app.use('/auth', userRouter);
app.use('/', propertiesRouter);

// Aca le decimos en que puerto queremos que corrar, lo pasamos por params y arrancamos el proyecto
app.listen(port, () => {
    console.log('ð La aplicacion esta corriendo en el puerto', port, 'ð¤ ');
})

