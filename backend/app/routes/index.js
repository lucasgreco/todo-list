var api = require('../api'),
    path = require('path');

module.exports  = function(app) {
    
    app.route('/task')
        .post(api.adiciona)
        .get(api.lista);

    app.route('/task/:taskId')
        .delete(api.remove)
        .get(api.busca)
        .put(api.atualiza);

};