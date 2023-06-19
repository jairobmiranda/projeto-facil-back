const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Projeto = require('./Projeto');
const Convite = require('./Convite');
const Pessoa = require('./pessoa');
const Atividade = require('./atividade');
const Equipe = require('./equipe');

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
        const pessoaCrud = new Pessoa();

            // Rotas de Pessoa
          this.app.get('/pessoas', pessoaCrud.findAll.bind(pessoaCrud));
          this.app.get('/pessoas/:id', pessoaCrud.findById.bind(pessoaCrud));
          this.app.post('/pessoas', pessoaCrud.create.bind(pessoaCrud));
          this.app.put('/pessoas/:id', pessoaCrud.update.bind(pessoaCrud));
          this.app.post('/pessoasLogin', pessoaCrud.login.bind(pessoaCrud));
          this.app.delete('/pessoas/:id', pessoaCrud.delete.bind(pessoaCrud));


        // Criar uma instância do CrudInterface para a entidade Atividade
        const atividadeCrud = new Atividade();

        // Rotas de Atividade
        this.app.get('/atividades', atividadeCrud.findAll);
        this.app.get('/atividades/:id', atividadeCrud.findById);
        this.app.post('/atividades', atividadeCrud.create);
        this.app.put('/atividades/:id', atividadeCrud.update);
        this.app.delete('/atividades/:id', atividadeCrud.delete);
        this.app.post('/atividades/iniciar', atividadeCrud.iniciarAtividade);
        this.app.post('/atividades/parar', atividadeCrud.pararAtividade);
        this.app.get('/atividades/codigo/:codigo', atividadeCrud.findByCodigo);



    //    // Criar uma instância do CrudInterface para a entidade Equipe
      const equipeCrud = new Equipe();

    //    // Rotas de Equipe
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
        this.app.post('/convites/enviar', conviteCrud.enviarConvite);
    
    }

    startServer(port) {
        this.app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    }
}

module.exports = App
