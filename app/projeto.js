const CrudInterface = require('./CrudInterface');

class Projeto extends CrudInterface {
    constructor() {
        super('projetos');
    }
}

module.exports = Projeto;
