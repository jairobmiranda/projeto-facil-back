const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const CrudInterface = require('./CrudInterface');
const Projeto = require('./Projeto');
const Convite = require('./Convite');

class App {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.initializeRoutes();
    }

    initializeRoutes() {
        // Criar uma instância do CrudInterface para a entidade Pessoa
        const pessoaCrud = new CrudInterface('pessoas');

        // Rotas de Pessoa
        this.app.get('/pessoas', pessoaCrud.findAll);
        this.app.get('/pessoas/:id', pessoaCrud.findById);
        this.app.post('/pessoas', pessoaCrud.create);
        this.app.put('/pessoas/:id', pessoaCrud.update);
        this.app.post('/pessoasLogin', pessoaCrud.login);
        this.app.delete('/pessoas/:id', pessoaCrud.delete);

        // Criar uma instância do CrudInterface para a entidade Atividade
        const atividadeCrud = new CrudInterface('atividades');

        // Rotas de Atividade
        this.app.get('/atividades', atividadeCrud.findAll);
        this.app.get('/atividades/:id', atividadeCrud.findById);
        this.app.post('/atividades', atividadeCrud.create);
        this.app.put('/atividades/:id', atividadeCrud.update);
        this.app.delete('/atividades/:id', atividadeCrud.delete);

        // Criar uma instância do CrudInterface para a entidade Equipe
        const equipeCrud = new CrudInterface('equipes');

        // Rotas de Equipe
        this.app.get('/equipes', equipeCrud.findAll);
        this.app.get('/equipes/:id', equipeCrud.findById);
        this.app.post('/equipes', equipeCrud.create);
        this.app.put('/equipes/:id', equipeCrud.update);
        this.app.delete('/equipes/:id', equipeCrud.delete);

        // Criar uma instância da classe Projeto
        const projetoCrud = new Projeto();

        // Rotas de Projeto
        this.app.get('/projetos', projetoCrud.findAll);
        this.app.get('/projetos/:id', projetoCrud.findById);
        this.app.post('/projetos', projetoCrud.create);
        this.app.put('/projetos/:id', projetoCrud.update);
        this.app.delete('/projetos/:id', projetoCrud.delete);

        // Criar uma instância da classe Convite
        const conviteCrud = new Convite();

        // Rotas de Convite
        this.app.get('/convites', conviteCrud.findAll);
        this.app.get('/convites/:id', conviteCrud.findById);
        this.app.post('/convites', conviteCrud.create);
        this.app.put('/convites/:id', conviteCrud.update);
        this.app.delete('/convites/:id', conviteCrud.delete);
        this.app.put('/convites/:id/aceitar', conviteCrud.aceitarConvite);
        this.app.get('/convites/pessoa/:idPessoa', async (req, res) => {
            const idPessoa = req.params.idPessoa;
            const convites = await conviteCrud.getConvitesPorPessoa(idPessoa);
            res.json(convites);
        });
        this.app.get('/convites/equipe/:idEquipe', async (req, res) => {
            const idEquipe = req.params.idEquipe;
            const convites = await conviteCrud.getConvitesPorEquipe(idEquipe);
            res.json(convites);
        });
    }

    startServer(port) {
        this.app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    }
}

module.exports = App
