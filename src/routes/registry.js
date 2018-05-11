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

module.exports = router;