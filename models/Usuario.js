import { DataTypes } from 'sequelize';
import bcrypt from "bcrypt";
import dataBase from '../config/db.js';

const User = dataBase.define('users', {

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN
},{
    hooks: {
        beforeCreate: async function (user) {
            const salt = await bcrypt.genSalt(13)
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

//  Metodos personalizados nos retorna true or false
User.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

export default User