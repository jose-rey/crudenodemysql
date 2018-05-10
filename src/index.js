const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const path = require('path');
const app = express();

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

//Routes

app.listen(app.get('port'), () => {
    console.log('Servidor en puerto 3000');
});