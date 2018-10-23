// index.js
let falcorExpress = require('falcor-express');
let MitigationRouter = require('./routes')
let db_service = require('./db_service/index')

var express = require('express');
var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use('/graph', falcorExpress.dataSourceRoute(function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  return MitigationRouter(db_service)
}));

// serve static files from current directory
app.use(express.static(__dirname + '/www'));

const port = 4444
var server = app.listen(port)
console.log(`listening on port ${port}`)