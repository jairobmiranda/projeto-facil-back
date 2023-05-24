const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pessoa = require('./pessoa');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/pessoas', async (req, res) => {
  const pessoas = await Pessoa.findAll();
  res.json(pessoas);
});

app.get('/pessoas/:id', async (req, res) => {
  const pessoa = await Pessoa.findById(req.params.id);
  if (!pessoa) {
    res.status(404).send('Pessoa não encontrado');
  } else {
    res.json(pessoa);
  }
});

app.post('/pessoas', async (req, res) => {
  const { nome, preco } = req.body;
  const pessoa = new Pessoa(null, nome, preco);
  await pessoa.save();
  res.json(pessoa);
});

app.put('/pessoas/:id', async (req, res) => {
  const pessoa = await Pessoa.findById(req.params.id);
  if (!pessoa) {
    res.status(404).send('Produto não encontrado');
  } else {
    const { nome, preco } = req.body;
    pessoa.nome = nome;
    pessoa.preco = preco;
    await pessoa.save();
    res.json(pessoa); //200 fica implícito
  }
});

app.delete('/pessoas/:id', async (req, res) => {
  const pessoa = await Pessoa.findById(req.params.id);
  if (!pessoa) {
    res.status(404).send('Pessoa não encontrado');
  } else {
    await pessoa.delete();
    res.status(204).send('Pessoa removido com sucesso');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
