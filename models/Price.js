import { DataTypes } from 'sequelize';
import dataBase from '../config/db.js';

const Price = dataBase.define('prices',{
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
});

export default Price;