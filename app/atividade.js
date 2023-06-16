const CrudInterface = require('./CrudInterface');


class Atividade extends CrudInterface {
  constructor() {
    super('atividades');
  }
}

module.exports = Atividade;
