var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port:'8889',
  password: 'root',
  database : 'pwa_db'
})



// add query functions
function getAllPlayers(req, res, next) {
  connection.query('select * from player', function (err, rows, fields) {
  if (err) throw err
    res.json(rows);
  });
}

function getSinglePlayer(req, res, next) {
    var playerID = parseInt(req.params.id);
    connection.query('select * from player where id = ?', playerID, function (err, rows, fields) {
    if (err) throw err
      res.json(rows);
    });
}

function createPlayer(req, res, next) {
  connection.query('insert into player set ?', req.query, function (err, rows, fields) {
  if (err) throw err
    res.json(rows);
  });
}

function updatePlayer(req, res, next) {
  var playerID = parseInt(req.params.id);
  connection.query('update player set ? where ?',[req.query,parseInt(playerID)], function (err, rows, fields) {
  if (err) throw err
  });
}

function deletePlayer(req, res, next) {
  var playerId = parseInt(req.params.id)
  connection.query('delete from player where id = ?', playerId, function (err, rows, fields) {
  if (err) throw err
    res.json(rows);
  });
}

module.exports = {
  getAllPlayers: getAllPlayers,
  getSinglePlayer: getSinglePlayer,
  createPlayer: createPlayer,
  updatePlayer: updatePlayer,
  deletePlayer: deletePlayer
};