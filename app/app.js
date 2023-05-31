const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pessoa = require('./pessoa');
const Atividade = require('./atividade');
const md5 = require('md5');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/pessoas', async (req, res) => {
  const pessoas = await Pessoa.findAll();
  res.json(pessoas);
});
app.get('/atividade', async (req, res) => {
  const atividade = await Atividade.findAll();
  res.json(atividade);
});

app.get('/pessoas/:id', async (req, res) => {
  const pessoa = await Pessoa.findById(req.params.id);
  if (!pessoa) {
    res.status(404).send('Pessoa não encontrado');
  } else {
    res.json(pessoa);
  }
});
app.get('/atividade/:id', async (req, res) => {
  const pessoa = await Pessoa.findById(req.params.id);
  if (!atividade) {
    res.status(404).send('Atividade não encontrado');
  } else {
    res.json(atividade);
  }
});
app.post('/pessoas', async (req, res) => {
  const { nome, cpf, dataNascimento, email, senha } = req.body;
  const pessoa = new Pessoa(null, nome, cpf, dataNascimento, email, md5(senha));
  await pessoa.save();
  pessoa.senha = null;
  res.json(pessoa);
});
app.post('/atividade', async (req, res) => {
  const { nome, id_projeto, codigo} = req.body;
  const atividade = new Atividade(null, nome, id_projeto, codigo);
  await atividade.save();  
  res.json(atividade);
});

app.put('/pessoas/:id', async (req, res) => {
  const pessoa = await Pessoa.findById(req.params.id);
  if (!pessoa) {
    res.status(404).send('Pessoa não encontrada');
  } else {
    const { nome, cpf, email } = req.body;
    pessoa.nome = nome;
    pessoa.cpf = cpf;
    pessoa.email = email;
    await pessoa.save();
    res.json(pessoa);
  }
});
app.put('/atividade/:id', async (req, res) => {
  const atividade = await Atividade.findById(req.params.id);
  if (!atividade) {
    res.status(404).send('Atividade não encontrada');
  } else {
    const { nome, codigo, id_projeto } = req.body;
    atividade.nome = nome;
    atividade.codigo = codigo;
    atividade.id_projeto = id_projeto;
    await atividade.save();
    res.json(atividade);
  }
});

// Validação de login
app.post('/pessoasLogin', async (req, res) => {
  const { email, senha } = req.body;
  if (email && senha) {
    const pessoa = await Pessoa.login(email, md5(senha));
    //se true retorna obj pessoa, caso contrário retorna false
    if (pessoa.id == null) {
      msgErro = { 'msgErro': 'Usuário ou senha incorretos.' };
      res.status(401).json(msgErro);
    } else {
      res.json(pessoa);
    }
  } else {
    res.status(404).send();
  }
});

app.delete('/pessoas/:id', async (req, res) => {
  const pessoa = await Pessoa.findById(req.params.id);
  if (!pessoa) {
    res.status(404).send('Pessoa não encontrada');
  } else {
    await pessoa.delete();
    res.status(204).send('Pessoa removido com sucesso');
  }
});
app.delete('/atividade/:id', async (req, res) => {
  const atividade = await Atividade.findById(req.params.id);
  if (!atividade) {
    res.status(404).send('Atividade não encontrada');
  } else {
    await atividade.delete();
    res.status(204).send('Atividade removido com sucesso');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


function codificarMD5(string) {
  const hash = crypto.createHash('md5');
  hash.update(string);
  return hash.digest('hex');
}