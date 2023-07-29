var express = require('express');
var router = express.Router();

//var db = require('../server/db');
//var mongo = require('../server/mongo');
var db = require('../server/db_euromilhoes');
//registar apostas
router.post('/api/aposta', db.inseriraposta);
//listarApostas
router.get('/api/aposta', db.listarApostas);
// verificar se esta repetida 
router.put('/api/aposta-repetida', db.verificarRepeticao);
//validar chave
router.put('/api/validar-chave', db.validarChave);
//remover chave
router.get('/api/aposta/eliminar/:id', db.removerAposta);
//validar chaves
//notificar numero de vezes
//listar/historico das apostas

/*
router.get('/api/players', db.getAllPlayers);
router.get('/api/players/:id', db.getSinglePlayer);
router.post('/api/players', db.createPlayer);
router.put('/api/players/:id', db.updatePlayer);
router.delete('/api/players/:id', db.deletePlayer);
*/
//teste de rotas com mongodb
//router.get('/api/mongo', mongo.getMongoTeste);
//router.get('/api/postdata', mongo.postData);
//router.get('/api/chaves', db.getChaves);
//postData  

module.exports = router;