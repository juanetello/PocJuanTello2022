import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import mainRouter from "./routes/index.js";
import database from "./config/db.js";

// crear una app de express y el puerto
const app = express();
const port = process.env.PORT || 4343;

// Habilitar lectura de datos de formularios cuando son de tipo texto, pass, email, etc
// No puede leer cuando subimos archivos
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
    console.log('👉 Conexion con la base correctamente 🙌🙌');
    
} catch (error) {
    console.log('🤷‍♂️ Error: ' , error);
}

// habilitamos view engine PUG
app.set('view engine', 'pug'); // SET es para agregar configuracion
// Añadimos la carpeta de las vistas
app.set('views', './views');

// Carpeta publica
app.use(express.static('public'));

// Routing
app.use(mainRouter);

// Aca le decimos en que puerto queremos que corrar, lo pasamos por params y arrancamos el proyecto
app.listen(port, () => {
    console.log('👉 La aplicacion esta corriendo en el puerto', port, '🤙 ');
})

