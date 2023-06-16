const CrudInterface = require('./CrudInterface');
const pool = require('./database');

class Pessoa extends CrudInterface {
    constructor() {
        super('pessoas');
    }

    async iniciarAtividade(idPessoa, idAtividade) {
        const pessoa = await this.findById(idPessoa);
        if (!pessoa) {
            return { 'msgErro': 'Pessoa não encontrada.' };
        }

        const atividade = await this.findById('atividades', idAtividade);
        if (!atividade) {
            return { 'msgErro': 'Atividade não encontrada.' };
        }

        const dataHoraInicio = new Date();
        // Inserir um novo registro na tabela "atividade_pessoa" com os dados de início da atividade
        const query = 'INSERT INTO atividade_pessoa (id_pessoa, id_atividade, hora_inicio) VALUES ($1, $2, $3)';
        await pool.query(query, [idPessoa, idAtividade, dataHoraInicio]);

        return { 'msgSucesso': 'Atividade iniciada com sucesso.' };
    }

    async pararAtividade(idPessoa, idAtividade) {
        const pessoa = await this.findById(idPessoa);
        if (!pessoa) {
            return { 'msgErro': 'Pessoa não encontrada.' };
        }

        const atividade = await this.findById('atividades', idAtividade);
        if (!atividade) {
            return { 'msgErro': 'Atividade não encontrada.' };
        }

        const dataHoraParada = new Date();
        // Atualizar o campo "hora_fim" no registro correspondente na tabela "atividade_pessoa"
        const query = 'UPDATE atividade_pessoa SET hora_fim = $1 WHERE id_pessoa = $2 AND id_atividade = $3';
        await pool.query(query, [dataHoraParada, idPessoa, idAtividade]);

        // Calcular a duração da atividade
        const duracao = dataHoraParada - atividade.hora_inicio;

        return { 'msgSucesso': 'Atividade parada com sucesso.', 'duracao': duracao };
    }
}

module.exports = Pessoa;
