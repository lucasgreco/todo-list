var api = require('../api'),
    path = require('path');

module.exports  = function(app) {
    
    app.route('/task')
        .post(api.adiciona)
        .get(api.lista)
        .put(api.atualiza);

    app.route('/task/:taskId')
        .get(api.busca);
        

};