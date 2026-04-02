const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - listar todos os usuários
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        } else {
            res.json(results);
        }
    });
});

// POST - criar novo usuário
router.post('/', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'nome, email e senha são obrigatórios' });
    }

    const sql = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao criar usuário:', err);
            res.status(500).json({ error: 'Erro ao criar usuário' });
        } else {
            res.status(201).json({ message: 'Usuário criado com sucesso!', id: result.insertId });
        }
    });
});

module.exports = router;