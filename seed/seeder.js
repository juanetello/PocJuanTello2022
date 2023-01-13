import { exit } from "node:process";

import categories from "./categories.js";
import prices from "./prices.js";
import users from "./users.js";
import { Category, Price, Usuario, Property } from "../models/index.js"

import dataBase from '../config/db.js';

const dataImports = async () => {
    try {
        // Autenticamos en la base de datos
        await dataBase.authenticate(); // Con el await "DETENEMOS" la operacion hasta estar autenticados en la base de datos, si falla se va al CATCH

        // Generamos las columnas en la base de datos
        await dataBase.sync();

        // Insertamos los datos en la base de datos esta puede ser una opcion
        // con un doble await
        // await Category.bulkCreate(categories);
        // await Price.bulkCreate(prices);

        // Otra alternativa es Promise.all el cual "corre" los dos llenados de info al mismo tiempo
        // ya que no depende uno del otro
        await Promise.all([
            Category.bulkCreate(categories), 
            Price.bulkCreate(prices),
            Usuario.bulkCreate(users)
        ])
        
        console.log('Datos importados correctamente!!!');

        exit(); //exit(0); ambos son validos y significa que esta correcta la ejecucion del proceso! Siempre finaliza
        
    } catch (error) {
        console.log(error);
        exit(1); // De esta forma detenemos los procesos! al pasar un 1 significa que NO fue exitosa la operacion. Siempre finaliza
        
    }
}

const deleteData = async () => {
    try {

        await Promise.all([
            Category.destroy({where: {}, truncate: true}), 
            Price.destroy({where: {}, truncate: true}),
            Usuario.destroy({where: {}, truncate: true}),
            Property.destroy({where: {}, truncate: true})
        ])

        // Alternativa para eliminar
        // await dataBase.sync({force:true})
        
        console.log('Datos elminados correctamente!!!');

        exit();
        
    } catch (error) {
        console.log('error', error);
        exit(1);
    }
}

if (process.argv[2] === "-i") {
    dataImports();
} else if (process.argv[2] === "-d") {
    deleteData();
}