const pool = require('./database');

class Atividade{
  constructor(id_atividade, nome, codigo, idProjeto){
    this.id_atividade = id_atividade;
    this.nome = nome;
    this.codigo = codigo;
    this.idProjeto = idProjeto;
  } 
  

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM atividades');
    return rows.map((row) => new Atividade(row.id_atividade, row.nome, row.codigo, row.idProjeto));
  }

  static async findById(id_atividade) {
    const { rows } = await pool.query('SELECT * FROM atividades WHERE id_atividade = $1', [id]);
    if (rows.length === 0) {
      msgErro = { 'msgErro': 'Atividade não localizado.' };
      return msgErro;
    }
    const row = rows[0];
    return new Atividade(row.id_atividade, row.nome, row.codigo, row.idProjeto);
  }
  async save() {
    if (this.id) {
      await pool.query('UPDATE atividades SET nome = $1, codigo = $2, id_projeto = $3 WHERE id_atividade = $4', [this.nome, this.codigo, this.id_projeto, this.id_atividade]);
    } else {
      const { rows } = await pool.query('INSERT INTO atividades (nome, codigo, id_projeto) VALUES ($1, $2, $3, $4, $5) RETURNING id_atividade', [this.nome, this.codigo, this.id_projeto]);
      this.id_atividade = rows[0].id;
    }
  }
  async delete() {
    await pool.query('DELETE FROM atividades WHERE id_atividade = $1', [this.id_atividade]);
  }

}
module.exports = Atividade;