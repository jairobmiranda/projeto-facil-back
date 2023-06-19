
const pool = require('./database');
const md5 = require('md5')


class pessoa {
    async findAll(req, res) {
        try {
            const query = `SELECT * FROM pessoas`;
            const { rows } = await pool.query(query);
            const entities = rows.map(row => ({
                id: row.id,
                nome: row.nome_pessoa,
                cpf: row.cpf,
                dataNascimento: row.data_nascimento,
                email: row.email
            }));
            res.json(entities);
        } catch (error) {
            console.error('Erro ao buscar entidades:', error);
            res.status(500).json({ error: 'Erro ao buscar entidades.' });
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const query = `SELECT * FROM pessoas WHERE id = $1`;
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0) {
                res.status(404).json({ error: 'Pessoa não localizada.' });
            } else {
                const pessoa = {
                    id: rows[0].id,
                    nome: rows[0].nome_pessoa,
                    cpf: rows[0].cpf,
                    dataNascimento: rows[0].data_nascimento,
                    email: rows[0].email
                };
                res.json(pessoa);
            }
        } catch (error) {
            console.error('Erro ao buscar entidade por ID:', error);
            res.status(500).json({ error: 'Erro ao buscar entidade por ID.' });
        }
    }

    async create(req, res) {
        try {
            const { nome, cpf, dataNascimento, email, senha } = req.body;
            const query = `INSERT INTO pessoas (nome_pessoa, cpf, data_nascimento, email, senha) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
            const values = [nome, cpf, dataNascimento, email, md5(senha)];
            const { rows } = await pool.query(query, values);
            const pessoa = {
                id: rows[0].id,
                nome_pessoa: nome,
                cpf,
                data_nascimento: dataNascimento,
                email,
                senha
            };
            res.json(pessoa);
        } catch (error) {
            console.error('Erro ao criar entidade:', error);
            res.status(500).json({ error: 'Erro ao criar entidade.' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const { nome, cpf, dataNascimento, email } = req.body;
            const query = `UPDATE pessoas SET nome_pessoa = $1, cpf = $2, data_nascimento = $3, email = $4 WHERE id = $5`;
            const values = [nome, cpf, dataNascimento, email, id];
            await pool.query(query, values);
            res.json({ success: true });
        } catch (error) {
            console.error('Erro ao atualizar entidade:', error);
            res.status(500).json({ error: 'Erro ao atualizar entidade.' });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const query = `DELETE FROM pessoas WHERE id = $1`;
            await pool.query(query, [id]);
            res.json({ success: true });
        } catch (error) {
            console.error('Erro ao excluir entidade:', error);
            res.status(500).json({ error: 'Erro ao excluir entidade.' });
        }
    }


    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const query = `SELECT * FROM pessoas WHERE email = $1 AND senha = $2`;
            const values = [email, md5(senha)];
            const { rows } = await pool.query(query, values);
            if (rows.length === 0) {
                res.status(401).json({ error: 'Credenciais inválidas.' });
            } else {
                const pessoa = {
                    id: rows[0].id,
                    nome: rows[0].nome_pessoa,
                    cpf: rows[0].cpf,
                    dataNascimento: rows[0].data_nascimento,
                    email: rows[0].email
                };
                res.json(pessoa);
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            res.status(500).json({ error: 'Erro ao realizar login.' });
        }
    }
}
module.exports = pessoa;
