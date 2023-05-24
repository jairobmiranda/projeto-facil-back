const pool = require('./database');

class Produto {
  constructor(id, nome, preco) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM produtos');
    return rows.map((row) => new Produto(row.id, row.nome, row.preco));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new Produto(row.id, row.nome, row.preco);
  }

  async save() {
    if (this.id) {
      await pool.query('UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3', [this.nome, this.preco, this.id]);
    } else {
      const { rows } = await pool.query('INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING id', [this.nome, this.preco]);
      this.id = rows[0].id;
    }
  }

  async delete() {
    await pool.query('DELETE FROM produtos WHERE id = $1', [this.id]);
  }
}

module.exports = Produto;
