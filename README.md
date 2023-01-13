Introcuccion a MVC
Model - View - Controller
Es un patron de diseño de software que permite la separacion de obligaciones
de cada pieza de codigo. Enfatiza la separacion de la logica de programacion
y lo que se muestra en pantalla

- Model: 
    Encargado de los datos desde la BD y de la logica para mostrar esos datos.
A través de metodos se realizan las consultas a la BD, y tambien le da modelos a los
clientes por ejemplo le asigna un ID, un nombre, un tipo, etc.
* Ejemplo: 
    Un usuario quiere ver la seccion de productos, el modelo se encargara
de realizar esa consulta en la BD.

- View:
    Se encarga de lo que se ve en pantalla
* Ejemplo:
    Si el modelo hace la consulta de la BD para los productos, es la vista la que 
muestra esos resultados.

- Controller:
    Es el que se comunica entre el modelo y la vista, antes de que el modelo consulte
a la DB es el engargado de mandarlo a llamar, y tambien una vez que el modelo tiene
los resultados de la consulta, es el que se encargara de pasarlos a la vista

Para Express vamos a usar tambien
- Router:
    Encargado de registrar todas las URL's o endpoints que la aplicacion soporta
* Ejemplo:
    Si el usuario accede a /productos, el router llama un controlador, que se
comunica con el modelo para obtener los datos que son pasados hacia la vista para ser mostrados.     


Templete engine:
ES LA VISTA DEL PROYECTO!!!


Seeder!! Es una forma de insertar datos en nuestra base de forma masiva

## Sequelize
Que son las asociaciones (relaciones tambien llamadas) entre un medolo y tabla 
* Son formas de cruzar informacion en la base de datos
* Sequelize soporta todo tipo de relaciones:
    1 a 1
    1 a muchos
    muchos a muchos
* Se realizan estas asociaciones por medio de metodos que ya existen en sequelize:
    -hasOne:
        Crea relaciones 1 a 1, 1 registro puede tener hasta 1 registro relacionado en otra tabla
        EJ: 1 propiedad tiene un vendedor, un usuario tiene un perfil, un producto tiene una categoria
        SINTAXIS: Vendedor.hasOne(Propiedad)
            Propiedad debera tener una llave foranea que haga referencia a un Vendedor, caso contrario sequelize la crea
    -belongsTo
        Crea relaciones 1 a 1, donde un registro puede tener hasta 1 registro relacionado en otra tabla, la diferencia es la sintaxis
        SINTAXIS: Propiedad.belongsTo(Vendedor)
            Propiedad debera tener una llave foranea que haga referencia a un Vendedor, caso contrario sequelize la crea
    -hasMany
        Crea relaciones 1 a N, donde un registro puede tener multiples relaciones en otra tabla
        EJ: 1 vendedor tiene multiples propiedades, un usuario tiene multiples posts, un producto tiene multiples reviews
        SINTAXIS: Vendedor.hasMany(Propiedad)
            Propiedad debera tener una llave foranea que haga referencia a un Vendedor
    -belongsToMany
        Utilizado para relaciones N a N, en este tipo de relaciones se utiliza una tabla pivote, por lo tanto se realiza mediante 3 modelos.
        EJ: Muliples estudiantes tendran multiples clases por lo tanto se crea una 3er tabla que sirve como pivote por referencias por llave foranea tanto a Estudiante como a Clase
        SINTAXIS: Estudiante.belogsToMany(Clase, {through:HorarioClase })
            Propiedad debera tener una llave foranea que haga referencia a un Vendedor

##### npm 
npm i pug  

npm i express-validator 

npm i bcrypt   

https://mailtrap.io/
npm i nodemailer

npm i csurf cookie-parser
https://www.npmjs.com/package/csurf
https://www.imperva.com/learn/application-security/csrf-cross-site-request-forgery/

npm i jsonwebtoken  
https://www.npmjs.com/package/jsonwebtoken
https://jwt.io/introduction

Cross site request forgery (CSRF)
Nos sirve para validaciones en nuestros formularios

npm i -D webpack webpack-cli

Herramienta que nos permite ejecutar varias tareas al mismo tiempo
npm i -D concurrently 

npm i dropzone@5.9.3


npm i multer 


##### NOTAS
MYSQL con DOCKER (revisar)
sudo docker run --name=mysql-container -p 8100:3306 -e MYSQL_ROOT_PASSWORD=juan -e MYSQL_DATABASE=test-docker-db -d mysql


