const pool = require('./database');

class Projeto {
    async findAll(req, res) {
        try {
            const query = `SELECT * FROM projetos`;
            const { rows } = await pool.query(query);
            const projetos = rows.map(row => ({
                id: row.id,
                nome_projeto: row.nome_projeto,
                cliente_projeto: row.cliente_projeto,
                id_equipe: row.id_equipe,
                id_pessoa_gestor: row.id_pessoa_gestor,
                prazo: row.prazo
            }));
            res.json(projetos);
        } catch (error) {
            console.error('Erro ao buscar projetos:', error);
            res.status(500).json({ error: 'Erro ao buscar projetos.' });
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const query = `SELECT * FROM projetos WHERE id = $1`;
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0) {
                res.status(404).json({ error: 'Projeto não encontrado.' });
            } else {
                const projeto = {
                    id: rows[0].id,
                    nome_projeto: rows[0].nome_projeto,
                    cliente_projeto: rows[0].cliente_projeto,
                    id_equipe: rows[0].id_equipe,
                    id_pessoa_gestor: rows[0].id_pessoa_gestor,
                    prazo: rows[0].prazo
                };
                res.json(projeto);
            }
        } catch (error) {
            console.error('Erro ao buscar projeto por ID:', error);
            res.status(500).json({ error: 'Erro ao buscar projeto por ID.' });
        }
    }

    async create(req, res) {
        try {
            const { nome_projeto, cliente_projeto, id_equipe, id_pessoa_gestor, prazo } = req.body;
            const query = `INSERT INTO projetos (nome_projeto, cliente_projeto, id_equipe, id_pessoa_gestor, prazo) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
            const values = [nome_projeto, cliente_projeto, id_equipe, id_pessoa_gestor, prazo];
            const { rows } = await pool.query(query, values);
            const projeto = {
                id: rows[0].id,
                nome_projeto,
                cliente_projeto,
                id_equipe,
                id_pessoa_gestor,
                prazo
            };
            res.json(projeto);
        } catch (error) {
            console.error('Erro ao criar projeto:', error);
            res.status(500).json({ error: 'Erro ao criar projeto.' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const { nome_projeto, cliente_projeto, id_equipe, id_pessoa_gestor, prazo } = req.body;
            const query = `UPDATE projetos SET nome_projeto = $1, cliente_projeto = $2, id_equipe = $3, id_pessoa_gestor = $4, prazo = $5 WHERE id = $6`;
            const values = [nome_projeto, cliente_projeto, id_equipe, id_pessoa_gestor, prazo, id];
            await pool.query(query, values);
            res.json({ success: true });
        } catch (error) {
            console.error('Erro ao atualizar projeto:', error);
            res.status(500).json({ error: 'Erro ao atualizar projeto.' });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const query = `DELETE FROM projetos WHERE id = $1`;
            await pool.query(query, [id]);
            res.json({ success: true });
        } catch (error) {
            console.error('Erro ao excluir projeto:', error);
            res.status(500).json({ error: 'Erro ao excluir projeto.' });
        }
    }
}

module.exports = Projeto;


