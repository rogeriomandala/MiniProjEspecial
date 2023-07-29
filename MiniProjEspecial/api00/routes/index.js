var express = require('express');
var router = express.Router();
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

module.exports = router;