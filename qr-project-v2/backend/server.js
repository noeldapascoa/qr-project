const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  const { nome, senha } = req.body;

  const existe = await pool.query(
    'SELECT * FROM usuarios WHERE nome=$1',
    [nome]
  );

  if (existe.rows.length > 0) {
    return res.json({ success: false, message: 'Usuário já existe' });
  }

  await pool.query(
    'INSERT INTO usuarios (nome, senha) VALUES ($1, $2)',
    [nome, senha]
  );

  res.json({ success: true, message: 'Conta criada' });
});

app.post('/login', async (req, res) => {
  const { nome, senha } = req.body;

  const result = await pool.query(
    'SELECT * FROM usuarios WHERE nome=$1 AND senha=$2',
    [nome, senha]
  );

  if (result.rows.length > 0) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Login inválido' });
  }
});

app.listen(3000, () => console.log('Backend rodando'));
