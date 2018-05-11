const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection')
const path = require('path');
const app = express();

//Importar rutas
const registryRoutes = require('./routes/registry');

//Configuraciones
app.set('port', process.env.PORT || 3000); //Toma el puerto del servidor, si no existe, toma el 3000
app.set('view engine', 'ejs'); //Motor de vista
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(morgan('dev')); //Para escuchar las peticiones
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'crudverse'
}, 'single'));

app.use(express.urlencoded({extended: false})); //Nos permite entender todos los datos que vienen del formulario

//Routes
app.use('/', registryRoutes); //Url principal

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public'))); //Archivos resource

//Comienza servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto 3000');
});