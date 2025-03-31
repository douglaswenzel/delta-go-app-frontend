require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2/promise');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Configuração do CORS para desenvolvimento
app.use(cors({
  origin: 'http://localhost:3306',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const pool = mysql.createPool({
  host: process.env.DB_HOST || '162.241.2.230',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'dougl947_DeltaGo',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middlewares
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rotas
app.get('/api/usuarios', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT u.*, 
        f.cargo, f.setor, f.data_admissao,
        a.matricula, a.curso, a.turma,
        v.motivo_visita, v.visitado, v.data_visita
      FROM dougl947_DeltaGo.usuario u
      LEFT JOIN dougl947_DeltaGo.funcionario f ON u.user_id = f.user_id
      LEFT JOIN dougl947_DeltaGo.aluno a ON u.user_id = a.usuario_id
      LEFT JOIN dougl947_DeltaGo.visitante v ON u.user_id = v.usuario_id
    `);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT u.*, 
        f.cargo, f.setor, f.data_admissao,
        a.matricula, a.curso, a.turma,
        v.motivo_visita, v.visitado, v.data_visita,
        fu.caminho_foto
      FROM dougl947_DeltaGo.usuario u
      LEFT JOIN dougl947_DeltaGo.funcionario f ON u.user_id = f.user_id
      LEFT JOIN dougl947_DeltaGo.aluno a ON u.user_id = a.usuario_id
      LEFT JOIN dougl947_DeltaGo.visitante v ON u.user_id = v.usuario_id
      LEFT JOIN dougl947_DeltaGo.fotos_usuarios fu ON u.user_id = fu.usuario_id
      WHERE u.user_id = ?
    `, [req.params.id]);
    
    connection.release();
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/usuarios', upload.single('foto'), async (req, res) => {
});

async function startServer() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT 1 + 1 AS solution');
    connection.release();
    
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    console.log(`Teste de consulta: 1 + 1 = ${rows[0].solution}`);
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Falha na conexão com o banco de dados:', error.message);
    process.exit(1);
  }
}

startServer();
