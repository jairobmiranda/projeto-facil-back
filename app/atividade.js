const pool = require('./database');

class Atividade {
    async findAll(req, res) {
        try {
            const query = `SELECT * FROM atividades`;
            const { rows } = await pool.query(query);
            const atividades = rows.map(row => ({
                id: row.id,
                codigo: row.codigo,
                id_projeto: row.id_projeto,
                nome: row.nome
            }));
            res.json(atividades);
        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
            res.status(500).json({ error: 'Erro ao buscar atividades.' });
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const query = `SELECT * FROM atividades WHERE id = $1`;
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0) {
                res.status(404).json({ error: 'Atividade não encontrada.' });
            } else {
                const atividade = {
                    id: rows[0].id,
                    codigo: rows[0].codigo,
                    id_projeto: rows[0].id_projeto,
                    nome: rows[0].nome
                };
                res.json(atividade);
            }
        } catch (error) {
            console.error('Erro ao buscar atividade por ID:', error);
            res.status(500).json({ error: 'Erro ao buscar atividade por ID.' });
        }
    }

    async findByCodigo(req, res) {
        try {
            const codigo = req.params.codigo;
            const query = `SELECT * FROM atividades WHERE codigo = $1`;
            const { rows } = await pool.query(query, [codigo]);

            if (rows.length === 0) {
                res.status(404).json({ error: 'Atividade não encontrada.' });
            } else {
                const atividade = {
                    id: rows[0].id,
                    codigo: rows[0].codigo,
                    id_projeto: rows[0].id_projeto,
                    nome: rows[0].nome
                };
                res.json(atividade);
            }
        } catch (error) {
            console.error('Erro ao buscar atividade pelo código:', error);
            res.status(500).json({ error: 'Erro ao buscar atividade pelo código.' });
        }
    }


    async create(req, res) {
        try {
            const { codigo, id_projeto, nome } = req.body;
            const query = `INSERT INTO atividades (codigo, id_projeto, nome) VALUES ($1, $2, $3) RETURNING id`;
            const values = [codigo, id_projeto, nome];
            const { rows } = await pool.query(query, values);
            const atividade = {
                id: rows[0].id,
                codigo,
                id_projeto,
                nome
            };
            res.json(atividade);
        } catch (error) {
            console.error('Erro ao criar atividade:', error);
            res.status(500).json({ error: 'Erro ao criar atividade.' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const { codigo, id_projeto, nome } = req.body;
            const query = `UPDATE atividades SET codigo = $1, id_projeto = $2, nome = $3 WHERE id = $4`;
            const values = [codigo, id_projeto, nome, id];
            await pool.query(query, values);
            res.json({ success: true });
        } catch (error) {
            console.error('Erro ao atualizar atividade:', error);
            res.status(500).json({ error: 'Erro ao atualizar atividade.' });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const query = `DELETE FROM atividades WHERE id = $1`;
            await pool.query(query, [id]);
            res.json({ success: true });
        } catch (error) {
            console.error('Erro ao excluir atividade:', error);
            res.status(500).json({ error: 'Erro ao excluir atividade.' });
        }
    }
    async iniciarAtividade(req, res) {
        try {
            const { codigo, id_pessoa } = req.body;
            const horaInicio = new Date().toISOString(); // Obtém a hora atual no formato ISO

            const query = `INSERT INTO atividade_pessoa (id_pessoa, id_atividade, hora_inicio)
                   SELECT $1, id, $2 FROM atividades WHERE codigo = $3`;
            const values = [id_pessoa, horaInicio, codigo];

            await pool.query(query, values);

            res.json({ success: true });
        } catch (error) {
            console.error('Erro ao iniciar atividade:', error);
            res.status(500).json({ error: 'Erro ao iniciar atividade.' });
        }
    }

    async pararAtividade(req, res) {
        try {
            const { codigo, id_pessoa } = req.body;
            const horaFim = new Date().toISOString(); // Obtém a hora atual no formato ISO

            const query = `UPDATE atividade_pessoa SET hora_fim = $1
                   FROM atividades
                   WHERE atividades.id = atividade_pessoa.id_atividade
                     AND atividades.codigo = $2
                     AND atividade_pessoa.id_pessoa = $3`;
            const values = [horaFim, codigo, id_pessoa];

            await pool.query(query, values);

            res.json({ success: true });
        } catch (error) {
            console.error('Erro ao parar atividade:', error);
            res.status(500).json({ error: 'Erro ao parar atividade.' });
        }
    }


}

module.exports = Atividade;
