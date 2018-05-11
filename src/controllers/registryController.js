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
            res.redirect('/');
        })
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    //console.log(id);
    req.getConnection((err, conn) => {
        //Se realiza un a consulta a la BD, pasando como parametros el id del registro
        conn.query('SELECT * FROM REGISTRY WHERE id = ?', [id], (err, element) => {
            //console.log(element);
            res.render('edit', {
                data: element[0]
            })
        })
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const date = moment().format("YYYY/MM/DD HH:mm:ss");
    const data = req.body;
    data.modifiedDate = date;
    //console.log(id);
    req.getConnection((err, conn) => {
        //Se realiza un insert a la base de datos, pasando como parametros la informacion obtenida del formulario
        conn.query('UPDATE REGISTRY set ? WHERE id = ?', [data, id], (err, element) => {
            res.redirect('/');
        })
    });
};

controller.delete = (req, res) => {
    //console.log(req.params.id);
    const { id } = req.params;
    req.getConnection((err, conn) => {
        //Se realiza un insert a la base de datos, pasando como parametros la informacion obtenida del formulario
        conn.query('DELETE FROM REGISTRY WHERE ID = ?', [id], (err, element) => {
            res.redirect('/');
        })
    });
};

module.exports = controller;