var moment = require('moment');

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM REGISTRY', (err, elements) => {
            if(err) {
                res.json(err);
            }
            console.log(elements);
            res.render('index', {
                data : elements
            });
        });
    });
};

controller.add = (req, res) => {
    res.render('add');
};

controller.save = (req, res) => {
    const data = req.body;
    const date = moment().format("YYYY/MM/DD HH:mm:ss");
    data.modifiedDate = date;
    data.createdDate = date;
    console.log(req.body);
    req.getConnection((err, conn) => {
        //Se realiza un insert a la base de datos, pasando como parametros la informacion obtenida del formulario
        conn.query('INSERT INTO REGISTRY set ?', [data], (err, element) => {
            console.log(element);
            res.render('add');
        })
    });
};

module.exports = controller;