"use strict";
const express = require('express');
const app = express();
const data = require('../database.json');
app.use(express.json());
app.get('/users', (request, response) => {
    response.send(data);
});
app.listen(3333, () => {
    console.log(`Servidor rodando com sucesso na porta 3333`);
});
//# sourceMappingURL=server.js.map