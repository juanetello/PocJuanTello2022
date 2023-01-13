import { DataTypes } from 'sequelize';
import dataBase from '../config/db.js';

const Property = dataBase.define('properties',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulo:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parking: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bathroom: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calle:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lat:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lng:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
    }
});

export default Property;