const CrudInterface = require('./CrudInterface');
const pool = require('./database');

class Equipe extends CrudInterface {
    constructor() {
        super('equipes');
    }
}

module.exports = Equipe;
