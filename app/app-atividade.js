const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');   
const Atividade = require('./atividade');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/atividade', async (req, res) => {
  const atividade = await Atividade.findAll();
  res.json(atividade);
});


app.get('/atividade/:id', async (req, res) => {
  const atividade = await Atividade.findById(req.params.id);
  if (!atividade) {
    res.status(404).send('Atividade não encontrado');
  } else {
    res.json(atividade);
  }
});

app.post('/atividade', async (req, res) => {
  const { nome, id_projeto, codigo} = req.body;
  const atividade = new Atividade(null, nome, id_projeto, codigo);
  await atividade.save();  
  res.json(atividade);
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

app.delete('/atividade/:id', async (req, res) => {
  const atividade = await Atividade.findById(req.params.id);
  if (!atividade) {
    res.status(404).send('Atividade não encontrada');
  } else {
    await atividade.delete();
    res.status(204).send('Atividade removido com sucesso');
  }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


function codificarMD5(string) {
  const hash = crypto.createHash('md5');
  hash.update(string);
  return hash.digest('hex');
}