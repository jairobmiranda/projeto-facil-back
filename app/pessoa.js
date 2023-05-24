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

    static async findAll() {
      const { rows } = await pool.query('SELECT * FROM pessoas');
      return rows.map((row) => new Produto(row.id, row.nome, row.cpf, row.dataNascimento, row.email));
    }

    static async findById(id) {
      const { rows } = await pool.query('SELECT * FROM pessoas WHERE id_pessoa = $1', [id]);
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new Produto(row.id, row.nome, row.preco);
    }

    async save() {
      if (this.id) {
        await pool.query('UPDATE pessoas SET nome_pessoa = $1, cpf = $2, data_nascimento = $3, email = $4 WHERE id = $5', [this.nome, this.cpf, this.cpf, this.email, this.id]);
      } else {
        const { rows } = await pool.query('INSERT INTO pessoas (nome, cpf, data_nascimento) VALUES ($1, $2) RETURNING id', [this.nome, this.preco]);
        this.id = rows[0].id;
      }
    }

    async delete() {
      await pool.query('DELETE FROM pessoas WHERE id = $1', [this.id]);
    }
}