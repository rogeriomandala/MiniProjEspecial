const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/milhoes'); // Conexão
const mongoURI = 'mongodb://localhost:27017/milhoes';
const uri = 'mongodb://localhost:27017'; // URL de conexão do MongoDB
const dbName = 'milhoes'; // Nome do banco de dados que você quer acessar

// Opcional: Configurações adicionais, se necessário
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function getMongoTeste(req, res, next) {

MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db(); // Aqui você obtém o objeto do banco de dados

    // Coleção que deseja listar
    const collection = db.collection('usuarios');

    // Listar todos os documentos da coleção
    collection.find({}).toArray()
      .then(docs => {
        console.log('Documentos encontrados:', docs);
        client.close(); // Fechar a conexão com o MongoDB quando terminar
      })
      .catch(err => {
        console.error('Erro ao listar documentos:', err);
        // Lembre-se de tratar erros adequadamente em uma aplicação real
        client.close(); // Mesmo em caso de erro, é importante fechar a conexão
      });
  })
  .catch(err => {
    console.error('Erro ao conectar com o MongoDB:', err);
    // Lembre-se de tratar erros adequadamente em uma aplicação real
  });

   res.json({"teste":"Teste em execucao..."});
}
function postData(req, res, next) {
  MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      const db = client.db(); // Aqui você obtém o objeto do banco de dados
  
      // Coleção em que deseja adicionar o registro
      const collection = db.collection('usuarios');
  
      // Novo registro que será adicionado à coleção
      const novoRegistro = {
        nome: 'Fulano de Tal',
        idade: 30,
        email: 'fulano@example.com'
      };
      // Inserir o novo registro na coleção
      collection.insertOne(novoRegistro)
        .then(result => {
          console.log('Registro adicionado com sucesso:', result.insertedId);
          client.close(); // Fechar a conexão com o MongoDB quando terminar
        })
        .catch(err => {
          console.error('Erro ao adicionar registro:', err);
          // Lembre-se de tratar erros adequadamente em uma aplicação real
          client.close(); // Mesmo em caso de erro, é importante fechar a conexão
        });
    })
    .catch(err => {
      console.error('Erro ao conectar com o MongoDB:', err);
      // Lembre-se de tratar erros adequadamente em uma aplicação real
    });
    console.log('terminou..');
    res.json({"eureca":"eureca.."});
}
module.exports = {
    getMongoTeste: getMongoTeste,
    postData:postData  
};