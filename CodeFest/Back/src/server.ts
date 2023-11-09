// Importa o pacote express
const express = require('express');
// App Express
const app = express();
const data = require('../database.json');
const fs = require("fs/promises");
const cors = require('cors')
app.use(express.json());
app.use(cors())

let list = data;

// Endpoint raiz
app.get('/users', (request: any, response: any) => {
    response.send(data);
});

// Endpoint raiz
app.post('/users', (request: any, response: any) => {
    const data = request.body;
    console.log(data);

    const fields = {
        nome: request.body.nome || '',
        cpf: request.body.cpf || '',
        dtNasc: request.body.dtNasc || '',
        sexo: request.body.sexo || '',
        telefone: request.body.telefone || '',
        pcd: request.body.pcd || '',
        //composição familiar
        qtdMembros: request.body.qtdMembros || '',
        nomeDp: request.body.nomeDp || '',
        dtNascDp: request.body.dtNascDp || '',
        parentesco: request.body.parentesco || '',
        sexoDp: request.body.sexoDp || '',
        pcdDp: request.body.pcdDp || '',
        observacao: request.body.observacao || '',
        //Endereço
        cep: request.body.cep || '',
        rua: request.body.rua || '',
        numero: request.body.numero || '',
        bairro: request.body.bairro || '',
        comp: request.body.comp || '',
        //Situação residencial
        danosResidencia: request.body.danosResidencia || '',
        perdasPessoais: request.body.perdasPessoais || '',
        bensMateriais: request.body.bensMateriais || '',
    }
    list.push(fields);
    fs.writeFile("database.json", JSON.stringify(list));
    response.send("Cadastro Realizado com Sucesso!");

});



// Inicia o sevidor
app.listen(3333, () => {
    console.log(`Servidor rodando com sucesso na porta 3333`)
})