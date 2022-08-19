import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({path: '.env'})

const databaseName = process.env.DB_NAME;
const databaseUser = process.env.DB_USER;
const databasePassword = process.env.DB_PASS;
const databaseHost = process.env.DB_HOST;

const database = new Sequelize(databaseName, databaseUser, databasePassword, {
    host: databaseHost,
    port: 3306,
    dialect: 'mysql',
    define:{
        timestamps:true,
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    operatorsAliases: false
});

export default database;