//var express = require('express')
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const crypto = require('crypto');
const mongoURI = 'mongodb://localhost:27017/milhoes';
async function gerarChaves(req, res, next) {
    await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(client => {
        const db = client.db(); 
        // Coleção que deseja listar
        const collection = db.collection('usuarios');
        // Listar todos os documentos da coleção
        collection.find({}).toArray()
          .then(docs => {
            console.log('Documentos encontrados:', docs);
            res.json({"status":"1","data":docs});
            client.close(); // Fechar a conexão com o MongoDB quando terminar
          })
          .catch(err => {
            console.error('Erro ao listar documentos:', err);
            client.close(); 
            res.json({"sucesso":"500"});  
        });
      })
      .catch(err => {
        console.error('Erro ao conectar com o MongoDB:', err);
      });

}
async function validarchave(req, res, next){

}

function testenumero(array,min,max){
  return array.every(num=>num>=min && num<=max);
}
function gerarCode(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsLength = chars.length;

  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charsLength);
    code += chars.charAt(randomIndex);
  }

  return code;
}
async function inseriraposta(req, res,next){
  //validar chave
  var code=req.body.code;
  var star=req.body.stars;
  var user=gerarCode(10);
  var valida = true;
    //teste de comprimentos
    const val1=(code.length==5)&&(star.length==2);
    if(val1==false) valida=false;
    //teste de intervalos de numeros
    const val2= testenumero(code,1,50)&&testenumero(star,1,12);
    if(val2==false) valida=false;
    //teste de repeticao de chave
    const val3= await repetida(req.body);
    if(val3==true) valida=false;


    if(!valida){
      res.json({"valida":valida,"no_tam":val1,"no_inter":val2,"repetido":val3});
      return;
    }

  //validar code e estrelas
  const aposta = {
    code:code ,
    estrela:star,
    id: user,
    vencedor:0,
    dataregisto:new Date()
  };
    await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(client => {
        const db = client.db(); 
        // Coleção em que deseja adicionar o registro
        const collection = db.collection('apostas');
        
        // Inserir o novo registro na coleção
        collection.insertOne(aposta)
          .then(result => {
            console.log('Registro adicionado com sucesso:', result.insertedId);
            client.close(); 
            res.status(200).json({"status":"1","data":result});
          })
          .catch(err => {
            console.error('Erro ao adicionar registro:', err);
           
            client.close(); 
            res.status(400).json({"status":"0","data":{}});
          });
      })
      .catch(err => {
        console.error('Erro ao conectar com o MongoDB:', err);
        res.status(500).json({"status":"0","data":{}});
        
      });
}
async function listarApostas(req, res, next) {
  const apostas = await db_lista_apostas();
  res.json(apostas);
  
}
//lista de apostas
async function db_lista_apostas(){
  let client= await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = await client.db(); 
  const collection = await db.collection('apostas');
  const dados= await collection.find({}).toArray();
  return dados;
}
async function removerAposta(req, res,next){
  console.log("Requisicao...",req.params.id);
  const dado=collection.deleteOne({ _id: ObjectId(id) });

 return dado;
}
function saoIguais(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every((element, index) => element === array2[index]);
}
async function repetida(form){
  var cd= await db_lista_apostas();
  for (let index = 0; index <cd.length; index++) {
    if(saoIguais(cd[index].code,form.code)&&saoIguais(cd[index].estrela,form.stars)) return true;
  }
  return await false;
}
//requisicao para verificarse uma chave esta repetida ou nao
async function verificarRepeticao(req, res, next) {
  const val= await repetida(req.body);
  if (val==true) res.json({"repetida_":1});
  else res.json({"repetida_":0});

}
//validarChave
async function validarChave(req, res, next) {
  let valida= true;
  console.log(req.body);
  //teste de comprimentos
  const val1=(req.body.code.length==5)&&(req.body.stars.length==2);
  if(val1==false) valida=false;
  //teste de intervalos de numeros
  const val2= testenumero(req.body.code,1,50)&&testenumero(req.body.stars,1,12);
  if(val2==false) valida=false;
  //teste de repeticao de chave
  const val3= await repetida(req.body);
  if(val3==true) valida=false;

 res.json({"valida":valida,"no_tam":val1,"no_inter":val2,"repetido":val3});
}
    module.exports = {
        gerarChaves: gerarChaves,
        inseriraposta:inseriraposta,
        listarApostas:listarApostas,
        verificarRepeticao:verificarRepeticao,
        validarChave:validarChave,
        removerAposta:removerAposta
    };