const pool = require('./database');

class Equipe {
    async findAll(req, res) {
        try {
            const query = 'SELECT * FROM equipes';
            const { rows } = await pool.query(query);
            const equipes = rows.map(row => ({
                id: row.id,
                nome: row.nome_equipe,
                idLider: row.id_pessoa_lider
            }));
            res.json(equipes);
        } catch (error) {
            console.error('Erro ao buscar equipes:', error);
            res.status(500).json({ error: 'Erro ao buscar equipes.' });
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const query = 'SELECT * FROM equipes WHERE id = $1';
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0) {
                res.status(404).json({ error: 'Equipe não encontrada.' });
            } else {
                const equipe = {
                    id: rows[0].id,
                    nome: rows[0].nome_equipe,
                    idLider: rows[0].id_pessoa_lider
                };
                res.json(equipe);
            }
        } catch (error) {
            console.error('Erro ao buscar equipe por ID:', error);
            res.status(500).json({ error: 'Erro ao buscar equipe por ID.' });
        }
    }

    async create(req, res) {
        try {
            const { nome, idLider } = req.body;
            const query = 'INSERT INTO equipes (nome_equipe, id_pessoa_lider) VALUES ($1, $2) RETURNING id';
            const values = [nome, idLider];
            const { rows } = await pool.query(query, values);
            const equipe = {
                id: rows[0].id,
                nome,
                idLider
            };
            res.json(equipe);
        } catch (error) {
            console.error('Erro ao criar equipe:', error);
            res.status(500).json({ error: 'Erro ao criar equipe.' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const { nome, idLider } = req.body;
            const query = 'UPDATE equipes SET nome_equipe = $1, id_pessoa_lider = $2 WHERE id = $3';
            const values = [nome, idLider, id];
            await pool.query(query, values);
            res.json({ success: true });
        } catch (error) {
            console.error('Erro ao atualizar equipe:', error);
            res.status(500).json({ error: 'Erro ao atualizar equipe.' });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const query = 'DELETE FROM equipes WHERE id = $1';
            await pool.query(query, [id]);
            res.json({ success: true });
        } catch (error) {
            console.error('Erro ao excluir equipe:', error);
            res.status(500).json({ error: 'Erro ao excluir equipe.' });
        }
    }
}

module.exports = Equipe;
