const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(express.json());

// Configurar CORS
app.use(cors({
    origin: '*',
    credentials: true
}));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rotas da API
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const corredoresRouter = require('./routes/corredores')
app.use('/api/corredores', corredoresRouter)

// Rota raiz - servir index (login)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

module.exports = app;