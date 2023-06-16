const pool = require('./database');

class CrudInterface {
    constructor(table) {
        this.table = table;
    }

    async findAll(req, res) {
        try {
            const query = `SELECT * FROM ${this.table}`;
            const { rows } = await pool.query(query);
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar entidades.' });
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const query = `SELECT * FROM ${this.table} WHERE id = $1`;
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0) {
                res.status(404).json({ error: `${this.table} não localizado(a).` });
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar entidade por ID.' });
        }
    }

    async create(req, res) {
        try {
            const data = req.body;
            const fields = Object.keys(data).filter(key => key !== 'id');
            const values = Object.values(data).filter(value => value !== null && value !== undefined && value !== '');
            const placeholders = values.map((_, index) => `$${index + 1}`);
            const query = `INSERT INTO ${this.table} (${fields}) VALUES (${placeholders}) RETURNING id`;
            const { rows } = await pool.query(query, values);
            data.id = rows[0].id;
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar entidade.' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const fields = Object.keys(data).filter(key => key !== 'id');
            const values = Object.values(data).filter(value => value !== null && value !== undefined && value !== '');
            const placeholders = values.map((_, index) => `$${index + 1}`);
            const query = `UPDATE ${this.table} SET (${fields}) = (${placeholders}) WHERE id = $${values.length + 1}`;
            await pool.query(query, [...values, id]);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar entidade.' });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const query = `DELETE FROM ${this.table} WHERE id = $1`;
            await pool.query(query, [id]);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir entidade.' });
        }
    }

    async save(req, res) {
        try {
            const data = req.body;
            const id = data.id;
            if (id) {
                await this.update(req, res);
            } else {
                await this.create(req, res);
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao salvar entidade.' });
        }
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

module.exports = CrudInterface;