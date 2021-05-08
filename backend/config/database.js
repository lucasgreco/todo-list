var mysql = require('mysql');

var con = mysql.createConnection({
  host: "webdev.myhoost.com",
  user: "webdevmy",
  password: "Net2050",
  database: 'webdevmy_omie_59051441000165' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;