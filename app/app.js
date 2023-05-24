const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Produto = require('./produto');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/produtos', async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
});

app.get('/produtos/:id', async (req, res) => {
  const produto = await Produto.findById(req.params.id);
  if (!produto) {
    res.status(404).send('Produto não encontrado');
  } else {
    res.json(produto);
  }
});

app.post('/produtos', async (req, res) => {
  const { nome, preco } = req.body;
  const produto = new Produto(null, nome, preco);
  await produto.save();
  res.json(produto);
});

app.put('/produtos/:id', async (req, res) => {
  const produto = await Produto.findById(req.params.id);
  if (!produto) {
    res.status(404).send('Produto não encontrado');
  } else {
    const { nome, preco } = req.body;
    produto.nome = nome;
    produto.preco = preco;
    await produto.save();
    res.json(produto); //200 fica implícito
  }
});

app.delete('/produtos/:id', async (req, res) => {
  const produto = await Produto.findById(req.params.id);
  if (!produto) {
    res.status(404).send('Produto não encontrado');
  } else {
    await produto.delete();
    res.status(204).send('Produto removido com sucesso');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
