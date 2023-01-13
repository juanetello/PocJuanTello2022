import Property from './Property.js';
import Price from './Price.js';
import Category from './Category.js';
import Usuario from './Usuario.js';

// Son iguales las asociaciones pero es mas "amigable" leer
// de izquierda a derecha por eso usamos belongsTo

// Price.hasOne(Property)

Property.belongsTo(Price, { foreignKey: 'priceId' });
// Property.belongsTo(Price, {foreignKey: 'nombreLlaveForanea'}); // EDITAMOS LA LLAVE FORANEA

Property.belongsTo(Category, { foreignKey: 'categoryId' });

Property.belongsTo(Usuario, { foreignKey: 'userId' });


export {
    Property,
    Price,
    Category,
    Usuario,
}