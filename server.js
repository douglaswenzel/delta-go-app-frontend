const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Configuração do CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados
const dbConfig = {
  host: '162.241.2.230', // Apenas o IP/host
  user: 'dougl947_websitedeltago',
  password: 'TT)exP@@AZi1',
  database: 'dougl947_DeltaGo',
  port: 3306, // Porta padrão do MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { // Muitos provedores exigem SSL
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.resolve(__dirname, 'cacert.pem')) // Se necessário
  }
};


// Criar pool de conexões
const pool = mysql.createPool(dbConfig);

// Rota para cadastrar usuário
app.post('/api/register', upload.single('foto'), async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    
    // Iniciar transação
    await connection.beginTransaction();

    // Extrair dados do formulário
    const { 
      name, 
      sobrenome, 
      tipo, 
      email, 
      telefone, 
      cpf, 
      rg, 
      nascimento, 
      unidade, 
      observacoes, 
      permisso,
      funcionario,
      aluno,
      visitante
    } = req.body;

    // Inserir usuário na tabela principal
    const [userResult] = await connection.execute(
      `INSERT INTO usuarios (
        nome, 
        sobrenome, 
        tipo, 
        email, 
        telefone, 
        cpf, 
        rg, 
        nascimento, 
        unidade, 
        observacoes, 
        permisso,
        foto_path
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, 
        sobrenome, 
        tipo, 
        email, 
        telefone, 
        cpf, 
        rg, 
        nascimento, 
        unidade, 
        observacoes, 
        permisso,
        req.file ? req.file.path : null
      ]
    );

    const userId = userResult.insertId;

    // Inserir dados específicos do tipo de usuário
    if (tipo === 'funcionario' && funcionario) {
      await connection.execute(
        `INSERT INTO funcionarios (
          usuario_id, 
          cargo, 
          setor, 
          data_admissao
        ) VALUES (?, ?, ?, ?)`,
        [userId, funcionario.cargo, funcionario.setor, funcionario.data_admissao]
      );
    } else if (tipo === 'aluno' && aluno) {
      await connection.execute(
        `INSERT INTO alunos (
          usuario_id, 
          matricula, 
          curso, 
          turma, 
          data_ingresso
        ) VALUES (?, ?, ?, ?, ?)`,
        [userId, aluno.matricula, aluno.curso, aluno.turma, aluno.data_ingresso]
      );
    } else if (tipo === 'visitante' && visitante) {
      await connection.execute(
        `INSERT INTO visitantes (
          usuario_id, 
          motivo_visita, 
          visitado, 
          data_visita, 
          empresa
        ) VALUES (?, ?, ?, ?, ?)`,
        [userId, visitante.motivo_visita, visitante.visitado, visitante.data_visita, visitante.empresa]
      );
    }

    // Commit da transação
    await connection.commit();

    res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    // Rollback em caso de erro
    if (connection) await connection.rollback();
    
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário' });
  } finally {
    if (connection) connection.release();
  }
});

// Servir arquivos estáticos (seu app React)
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/movimentacoes', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const [logs] = await connection.execute(`
      SELECT 
        logs_acesso.log_id,
        usuario.nome,
        usuario.sobrenome,
        logs_acesso.acao,
        logs_acesso.data_hora,
        logs_acesso.descricao,
        logs_acesso.ip_address,
        logs_acesso.dispositivo
      FROM logs_acesso
      JOIN usuario ON logs_acesso.usuario_id = usuario.id
      ORDER BY logs_acesso.data_hora DESC
    `);
    

    res.json(logs);
  } catch (error) {
    console.error('Erro ao buscar movimentações:', error);
    res.status(500).json({ success: false, message: 'Erro ao buscar movimentações' });
  } finally {
    if (connection) connection.release();
  }
});

const PORT = 3308;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
