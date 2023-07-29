var express = require('express')
const cors = require('cors');
var app = express()
const bodyParser = require('body-parser');
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }))
var index = require('./routes/index')
app.use('/', index)
app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!')
})
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(4000, function(){
    console.log('Example application listening on port 4000!')
})