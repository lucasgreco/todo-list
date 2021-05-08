var http = require('http')
var express = require('express')
    ,app = express()
    ,bodyParser = require('body-parser')

app.use(express.static('./index.html'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


http.createServer(app).listen(3000, function() {
    console.log('Servidor escutando na porta: ' + this.address().port);
});

