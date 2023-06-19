class Convite {
    // Listar todos os convites
    async findAll(req, res) {
        try {
            const query = `SELECT * FROM convites`;
            const result = await pool.query(query);
            res.json(result.rows);
        } catch (error) {
            console.error('Erro ao listar convites:', error);
            res.status(500).json({ error: 'Erro ao listar convites.' });
        }
    }

    // Encontrar convite por ID
    async findById(req, res) {
        try {
            const id = req.params.id;
            const query = `SELECT * FROM convites WHERE id = $1`;
            const result = await pool.query(query, [id]);
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'Convite não encontrado.' });
            } else {
                res.json(result.rows[0]);
            }
        } catch (error) {
            console.error('Erro ao encontrar convite:', error);
            res.status(500).json({ error: 'Erro ao encontrar convite.' });
        }
    }

    // Criar um novo convite
    async create(req, res) {
        try {
            const { id_equipe, id_pessoa, aceite } = req.body;
            const query = `INSERT INTO convites (id_equipe, id_pessoa, aceite) VALUES ($1, $2, $3) RETURNING *`;
            const values = [id_equipe, id_pessoa, aceite];
            const result = await pool.query(query, values);
            res.json(result.rows[0]);
        } catch (error) {
            console.error('Erro ao criar convite:', error);
            res.status(500).json({ error: 'Erro ao criar convite.' });
        }
    }

    // Atualizar um convite
    async update(req, res) {
        try {
            const id = req.params.id;
            const { id_equipe, id_pessoa, aceite } = req.body;
            const query = `UPDATE convites SET id_equipe = $1, id_pessoa = $2, aceite = $3 WHERE id = $4 RETURNING *`;
            const values = [id_equipe, id_pessoa, aceite, id];
            const result = await pool.query(query, values);
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'Convite não encontrado.' });
            } else {
                res.json(result.rows[0]);
            }
        } catch (error) {
            console.error('Erro ao atualizar convite:', error);
            res.status(500).json({ error: 'Erro ao atualizar convite.' });
        }
    }

    // Excluir um convite
    async delete(req, res) {
        try {
            const id = req.params.id;
            const query = `DELETE FROM convites WHERE id = $1`;
            await pool.query(query, [id]);
            res.json({ success: true });
        } catch (error) {
            console.error('Erro ao excluir convite:', error);
            res.status(500).json({ error: 'Erro ao excluir convite.' });
        }
    }

    async enviarConvite(req, res) {
        try {
            const { id_equipe, id_pessoa } = req.body;
            let aceite = false;

            // Verificar se o id_pessoa é líder de alguma equipe
            const queryLider = `SELECT COUNT(*) FROM equipes WHERE id_pessoa_lider = $1`;
            const resultLider = await pool.query(queryLider, [id_pessoa]);
            if (resultLider.rows[0].count > 0) {
                aceite = true; // Definir aceite como verdadeiro se o id_pessoa for líder
            }

            // Inserir o convite
            const query = `INSERT INTO convites (id_equipe, id_pessoa, aceite) VALUES ($1, $2, $3) RETURNING *`;
            const values = [id_equipe, id_pessoa, aceite];
            const result = await pool.query(query, values);
            res.json(result.rows[0]);
        } catch (error) {
            console.error('Erro ao enviar convite:', error);
            res.status(500).json({ error: 'Erro ao enviar convite.' });
        }
    }
}

module.exports = Convite;
