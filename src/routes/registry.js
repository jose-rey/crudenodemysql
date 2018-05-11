const express = require('express');
const router = express.Router();

//Se utiliza el controlador del registro
const registryController = require('../controllers/registryController');

//Ruta para la pagina principal, usa un metodo GET
router.get('/', registryController.list);
//Ruta para agregar un nuevo registro, usa un metodo GET
router.get('/add', registryController.add);
//Ruta para insertar un nuevo registro, usa un metodo POST
router.post('/add', registryController.save);
//Ruta para borrar un registro, usa un metodo get
router.get('/delete/:id', registryController.delete);
//Ruta para recibir un registro, usa un metodo GET
router.get('/update/:id', registryController.edit);
//Ruta para actualizar un registro, usa un metodo POST
router.post('/update/:id', registryController.update);

module.exports = router;