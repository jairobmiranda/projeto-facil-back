const CrudInterface = require('./CrudInterface');
const pool = require('./database');

class Convite extends CrudInterface {
    constructor() {
        super('convites');
    }

    async criarConvite(idPessoa, idEquipe, aceite = false) {
        const convite = {
            id_pessoa: idPessoa,
            id_equipe: idEquipe,
            aceite: aceite
        };

        const query = 'INSERT INTO convites (id_pessoa, id_equipe, aceite) VALUES ($1, $2, $3)';
        const result = await pool.query(query, [idPessoa, idEquipe, aceite]);

        if (result.rowCount > 0) {
            return { 'msgSucesso': 'Convite criado com sucesso.' };
        } else {
            return { 'msgErro': 'Falha ao criar o convite.' };
        }
    }

    async aceitarConvite(idConvite) {
        const convite = await this.findById(idConvite);
        if (!convite) {
            return { 'msgErro': 'Convite não encontrado.' };
        }

        // Atualizar o convite para aceito
        const query = 'UPDATE convites SET aceite = true WHERE id_convite = $1';
        await pool.query(query, [idConvite]);

        return { 'msgSucesso': 'Convite aceito com sucesso.' };
    }

    async getConvitesPorPessoa(idPessoa) {
        const query = 'SELECT * FROM convites WHERE id_pessoa = $1';
        const result = await pool.query(query, [idPessoa]);
        return result.rows;
    }

    async getConvitesPorEquipe(idEquipe) {
        const query = 'SELECT * FROM convites WHERE id_equipe = $1';
        const result = await pool.query(query, [idEquipe]);
        return result.rows;
    }

    async enviarConviteAceito(idConvite, idPessoa) {
        const convite = await this.findById(idConvite);
        if (!convite) {
            return { 'msgErro': 'Convite não encontrado.' };
        }

        // Verificar se a pessoa que está enviando o convite é o líder da equipe
        const liderEquipe = await this.verificarLiderEquipe(convite.id_equipe, idPessoa);
        if (liderEquipe) {
            // Atualizar o estado do convite para aceito
            const query = 'UPDATE convites SET aceite = true WHERE id_convite = $1';
            await pool.query(query, [idConvite]);

            return { 'msgSucesso': 'Convite aceito com sucesso.' };
        } else {
            return { 'msgErro': 'Apenas o líder da equipe pode aceitar convites.' };
        }
    }

    async verificarLiderEquipe(idEquipe, idPessoa) {
        const query = 'SELECT * FROM equipes WHERE id_equipe = $1 AND id_lider = $2';
        const result = await pool.query(query, [idEquipe, idPessoa]);
        return result.rowCount > 0;
    }
}

module.exports = Convite;
