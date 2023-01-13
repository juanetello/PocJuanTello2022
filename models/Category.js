import { DataTypes } from 'sequelize';
import dataBase from '../config/db.js';

const Category = dataBase.define('categories',{
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
});

export default Category;