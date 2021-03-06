var db = require('../../config/database');

var api = {}

api.adiciona = function(req, res) {
    db.query(
        'INSERT INTO todo_task SET ?', req.body,
        // `INSERT INTO todo_task (description, responsable, email, status) VALUES ('${req.body.description}', '${req.body.responsable}', '${req.body.email}', '${req.body.status}');`,
        (err, result) => {
            if (err) throw err
            if (result) res.status(200).json({id:result.insertId})
        }
    )
};

api.busca = function(req, res) {
    db.query(
        'SELECT * FROM todo_task WHERE id = ?',[req.params.taskId],
        (err, result) => {
            if (err) throw err
            if (result) res.status(200).json(...result);
        }
    )

};

api.atualiza = function(req, res) {
    db.query(
        'UPDATE todo_task SET description = ?, responsable = ?, email = ?, status = ?, reset_status_count = ? WHERE id = ?',
        [req.body.description, req.body.responsable, req.body.email, req.body.status,req.body.reset_status_count, req.body.id], 
        (err, result) => {
            if (err) throw err
            if (result) res.status(200).json(result);
        }
    )    

};

api.lista = function(req, res) {
    db.query(
        'SELECT * FROM todo_task',
        (err, result) => {
            if (err) throw err
            if (result) res.status(200).json(result);
        })

};


module.exports = api;