const CrudInterface = require('./CrudInterface');
const pool = require('./database');

class Pessoa extends CrudInterface {
    constructor() {
        super('pessoas');
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const query = `SELECT * FROM ${this.table} WHERE username = $1 AND password = $2`;
            const { rows } = await pool.query(query, [username, password]);
            if (rows.length === 0) {
                res.status(401).json({ error: 'Credenciais inválidas.' });
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao realizar o login.' });
        }
    }
}

module.exports = Pessoa;
