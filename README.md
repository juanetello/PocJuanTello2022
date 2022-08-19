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


npm i pug  

npm i express-validator 

npm i bcrypt   

https://mailtrap.io/
npm i nodemailer

npm i csurf cookie-parser

npm i jsonwebtoken  

Cross site request forgery (CSRF)
Nos sirve para validaciones en nuestros formularios