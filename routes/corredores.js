const express = require('express');
const router = express.Router();
const db = require('../db')

router.get('/cadastrados', (req, res) => {
    const sql = "SELECT * FROM corredores"
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar corredores:', err);
            res.status(500).json({ error: 'Erro ao buscar corredores' });
        } else {
            res.json(results);
        }
    })
})

router.post('/', (req, res) => {
    const { nome, turma } = req.body
    if (!nome || !turma) {
        return res.status(400).json({ error: 'nome e turma são obrigatórios' });
    }

    const sql = "INSERT INTO corredores (nome, turma) VALUES(?,?)"
    db.query(sql, [nome, turma], (err, results) => {
        if (err) {
            console.error('Erro ao criar corredor:', err);
            res.status(500).json({ error: 'Erro ao criar corredor' });
        } else {
            res.status(201).json({ message: 'Corredor criado com sucesso!', id: results.insertId });
        }
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const sql = "DELETE FROM corredores WHERE id = ?"
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar corredor:', err);
            res.status(500).json({ error: 'Erro ao deletar corredor' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Corredor não encontrado' });
        } else {
            res.status(200).json({ message: 'Corredor deletado com sucesso!' });
        }
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { nome, turma } = req.body

    if (!nome || !turma) {
        return res.status(400).json({ error: 'nome e turma são obrigatórios' });
    }

    const sql = "UPDATE corredores SET nome = ?, turma = ? WHERE id = ?"
    db.query(sql, [nome, turma, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar corredor:', err);
            res.status(500).json({ error: 'Erro ao atualizar corredor' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Corredor não encontrado' });
        } else {
            res.status(200).json({ message: 'Corredor atualizado com sucesso!' });
        }
    })
})

router.get("/melhor-volta", (req, res) => {
    const sql = `SELECT nome, tempo
    FROM corredores, voltas
    WHERE corredores.id = voltas.corredores_id
    ORDER BY tempo ASC
    LIMIT 1`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar melhor volta:', err);
            return res.status(500).json({ error: 'Erro ao buscar melhor volta' });
        }
        res.json(results[0]);
    });
});

router.get("/tempo-total", (req, res) => {
    const sql = `
        SELECT corredores.nome, 
               SUM(voltas.tempo)
        FROM corredores, voltas
        WHERE corredores.id = voltas.corredores_id
        GROUP BY corredores.id, corredores.nome
        ORDER BY SUM(voltas.tempo) ASC
    `;

    router.get ("/voltas", (req, res) => {
        
    })

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar tempo total:', err);
            return res.status(500).json({ error: 'Erro ao buscar tempo total' });
        }
        res.json(results);
    });
});


module.exports = router;