var db = require('../../config/database');

var api = {}

api.adiciona = function(req, res) {
    db.query(
        `INSERT INTO todo_task (description, responsable, email, status) VALUES ('${req.body.description}', '${req.body.responsable}', '${req.body.email}', '${req.body.status}');`,
        (err, result) => {
            if (err) throw err
            if (result) res.status(200).json({id:result.insertId})
        }
    )
};

api.busca = function(req, res) {
    db.query(
        `SELECT * FROM todo_task WHERE id = ${req.params.taskId}`,
        (err, result) => {
            if (err) throw err
            console.log(result);
            if (result) res.status(200).json(...result);
        }
    )

};

api.atualiza = function(req, res) {
    
    db.update({_id : req.params.fotoId }, req.body, function(err, numReplaced) {
        if (err) return console.log(err);
        if(numReplaced) res.status(200).end();
        res.status(500).end();
        console.log('Atualizado com sucesso: ' + req.body._id);
        res.status(200).end();
    });  
};

api.lista = function(req, res) {
    db.find({}).sort({titulo: 1}).exec(function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.remove = function(req, res) {

    db.remove({ _id: req.params.fotoId }, {}, function (err, numRemoved) {
        if (err) return console.log(err);
        console.log('removido com sucesso');
        if(numRemoved) res.status(200).end();
        res.status(500).end();
    });
};


module.exports = api;