const pool = require('./database');

class Pessoa {
  constructor(id, nome, cpf, dataNascimento, email, senha) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.email = email;
    this.senha = senha;
  }

  static async login(email, senha) {
    const { rows } = await pool.query('SELECT * FROM pessoas WHERE email = $1 AND senha = $2', [email, senha]);
    if (rows.length === 0) {
      return new Pessoa(null, null, null, null, null);
    }
    const row = rows[0];
    return new Pessoa(row.id_pessoa, row.nome_pessoa, row.cpf, row.data_nascimento, row.email);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM pessoas');
    return rows.map((row) => new Pessoa(row.id_pessoa, row.nome_pessoa, row.cpf, row.data_nascimento, row.email));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM pessoas WHERE id_pessoa = $1', [id]);
    if (rows.length === 0) {
      msgErro = { 'msgErro': 'Usuário não localizado.' };
      return msgErro;
    }
    const row = rows[0];
    return new Pessoa(row.id_pessoa, row.nome_pessoa, row.cpf, row.data_nascimento, row.email);
  }

  async save() {
    if (this.id) {
      await pool.query('UPDATE pessoas SET nome_pessoa = $1, cpf = $2, email = $3 WHERE id_pessoa = $4', [this.nome, this.cpf, this.email, this.id]);
    } else {
      const { rows } = await pool.query('INSERT INTO pessoas (nome_pessoa, cpf, data_nascimento, email, senha) VALUES ($1, $2, $3, $4, $5) RETURNING id_pessoa', [this.nome, this.cpf, this.dataNascimento, this.email, this.senha]);
      this.id = rows[0].id;
    }
  }

  async delete() {
    await pool.query('DELETE FROM pessoas WHERE id = $1', [this.id]);
  }
  /*
    async codificarMD5(string) {
      const hash = crypto.createHash('md5');
      hash.update(string);
      return hash.digest('hex');
    }
  */
}


module.exports = Pessoa;