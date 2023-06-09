# projeto-facil-back
API de Documentação da Aplicação
Esta é a documentação da API da aplicação, que fornece endpoints para interagir com as entidades Pessoa, Atividade, Equipe, Projeto e Convite.

URL Base: http://localhost:{port}

Endpoints
A seguir estão listados os endpoints disponíveis na API.

Pessoa
Recursos: Pessoa

Listar Pessoas

Método: GET
URL: /pessoas
Descrição: Retorna uma lista de todas as pessoas cadastradas.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Array de objetos Pessoa
Obter Pessoa por ID

Método: GET
URL: /pessoas/:id
Descrição: Retorna os detalhes de uma pessoa específica com base no seu ID.
Parâmetros de URL:
id (string) - ID da pessoa.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Objeto Pessoa
Criar Pessoa

Método: POST
URL: /pessoas
Descrição: Cria uma nova pessoa.
Corpo da Requisição: Objeto Pessoa com os campos apropriados.
Resposta de Sucesso:
Código de Status: 201 (Criado)
Conteúdo: Objeto Pessoa criado
Atualizar Pessoa

Método: PUT
URL: /pessoas/:id
Descrição: Atualiza os dados de uma pessoa existente.
Parâmetros de URL:
id (string) - ID da pessoa.
Corpo da Requisição: Objeto Pessoa com os campos a serem atualizados.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Objeto Pessoa atualizado
Excluir Pessoa

Método: DELETE
URL: /pessoas/:id
Descrição: Exclui uma pessoa existente.
Parâmetros de URL:
id (string) - ID da pessoa.
Resposta de Sucesso:
Código de Status: 204 (Sem Conteúdo)
Login

Método: POST
URL: /pessoasLogin
Descrição: Realiza o login de uma pessoa com base nas credenciais fornecidas.
Corpo da Requisição: Objeto com os campos email e senha.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Objeto com informações de login da pessoa
Atividade
Recursos: Atividade

Listar Atividades

Método: GET
URL: /atividades
Descrição: Retorna uma lista de todas as atividades cadastradas.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Array de objetos Atividade
Obter Atividade por ID

Método: GET
URL: /atividades/:id
Descrição: Retorna os detalhes de uma atividade específica com base no seu ID.
Parâmetros de URL:id (string) - ID da atividade.

Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Objeto Atividade
Criar Atividade

Método: POST
URL: /atividades
Descrição: Cria uma nova atividade.
Corpo da Requisição: Objeto Atividade com os campos apropriados.
Resposta de Sucesso:
Código de Status: 201 (Criado)
Conteúdo: Objeto Atividade criado
Atualizar Atividade

Método: PUT
URL: /atividades/:id
Descrição: Atualiza os dados de uma atividade existente.
Parâmetros de URL:
id (string) - ID da atividade.
Corpo da Requisição: Objeto Atividade com os campos a serem atualizados.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Objeto Atividade atualizado
Excluir Atividade

Método: DELETE
URL: /atividades/:id
Descrição: Exclui uma atividade existente.
Parâmetros de URL:
id (string) - ID da atividade.
Resposta de Sucesso:
Código de Status: 204 (Sem Conteúdo)
Equipe
Recursos: Equipe

Listar Equipes

Método: GET
URL: /equipes
Descrição: Retorna uma lista de todas as equipes cadastradas.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Array de objetos Equipe
Obter Equipe por ID

Método: GET
URL: /equipes/:id
Descrição: Retorna os detalhes de uma equipe específica com base no seu ID.
Parâmetros de URL:
id (string) - ID da equipe.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Objeto Equipe
Criar Equipe

Método: POST
URL: /equipes
Descrição: Cria uma nova equipe.
Corpo da Requisição: Objeto Equipe com os campos apropriados.
Resposta de Sucesso:
Código de Status: 201 (Criado)
Conteúdo: Objeto Equipe criado
Atualizar Equipe

Método: PUT
URL: /equipes/:id
Descrição: Atualiza os dados de uma equipe existente.
Parâmetros de URL:
id (string) - ID da equipe.
Corpo da Requisição: Objeto Equipe com os campos a serem atualizados.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Objeto Equipe atualizado
Excluir Equipe

Método: DELETE
URL: /equipes/:id
Descrição: Exclui uma equipe existente.
Parâmetros de URL:
id (string) - ID da equipe.
- Resposta de Sucesso:
- Código de Status: 204 (Sem Conteúdo)

Projeto
Recursos: Projeto

Listar Projetos

Método: GET
URL: /projetos
Descrição: Retorna uma lista de todos os projetos cadastrados.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Array de objetos Projeto
Obter Projeto por ID

Método: GET
URL: /projetos/:id
Descrição: Retorna os detalhes de um projeto específico com base no seu ID.
Parâmetros de URL:
id (string) - ID do projeto.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Objeto Projeto
Criar Projeto

Método: POST
URL: /projetos
Descrição: Cria um novo projeto.
Corpo da Requisição: Objeto Projeto com os campos apropriados.
Resposta de Sucesso:
Código de Status: 201 (Criado)
Conteúdo: Objeto Projeto criado
Atualizar Projeto

Método: PUT
URL: /projetos/:id
Descrição: Atualiza os dados de um projeto existente.
Parâmetros de URL:
id (string) - ID do projeto.
Corpo da Requisição: Objeto Projeto com os campos a serem atualizados.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Objeto Projeto atualizado
Excluir Projeto

Método: DELETE
URL: /projetos/:id
Descrição: Exclui um projeto existente.
Parâmetros de URL:
id (string) - ID do projeto.
Resposta de Sucesso:
Código de Status: 204 (Sem Conteúdo)
Convite
Recursos: Convite

Listar Convites

Método: GET
URL: /convites
Descrição: Retorna uma lista de todos os convites cadastrados.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Array de objetos Convite
Obter Convite por ID

Método: GET
URL: /convites/:id
Descrição: Retorna os detalhes de um convite específico com base no seu ID.
Parâmetros de URL:
id (string) - ID do convite.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Objeto Convite
Criar Convite

Método: POST
URL: /convites
Descrição: Cria um novo convite.
Corpo da Requisição: Objeto Convite com os campos apropriados.
Resposta de Sucesso:
Código de Status: 201 (Criado)
Conteúdo: Objeto Convite criado

Atualizar Convite
Método: PUT
- URL: /convites/:id
- Descrição: Atualiza os dados de um convite existente.
- Parâmetros de URL:
- id (string) - ID do convite.
- Corpo da Requisição: Objeto Convite com os campos a serem atualizados.
- Resposta de Sucesso:
- Código de Status: 200 (OK)
- Conteúdo: Objeto Convite atualizado

Excluir Convite

Método: DELETE
URL: /convites/:id
Descrição: Exclui um convite existente.
Parâmetros de URL:
id (string) - ID do convite.
Resposta de Sucesso:
Código de Status: 204 (Sem Conteúdo)
Aceitar Convite

Método: PUT
URL: /convites/:id/aceitar
Descrição: Aceita um convite existente.
Parâmetros de URL:
id (string) - ID do convite.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Objeto Convite atualizado
Listar Convites por Pessoa

Método: GET
URL: /convites/pessoa/:idPessoa
Descrição: Retorna uma lista de convites enviados para uma pessoa específica.
Parâmetros de URL:
idPessoa (string) - ID da pessoa.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Array de objetos Convite
Listar Convites por Equipe

Método: GET
URL: /convites/equipe/:idEquipe
Descrição: Retorna uma lista de convites enviados para uma equipe específica.
Parâmetros de URL:
idEquipe (string) - ID da equipe.
Resposta de Sucesso:
Código de Status: 200 (OK)
Conteúdo: Array de objetos Convite
Casos de Teste
Aqui estão alguns casos de teste sugeridos para verificar o funcionamento correto da API:

Listar todas as pessoas:

Método: GET
URL: /pessoas
Verificar se a resposta contém uma lista válida de pessoas.
Criar uma nova pessoa:

Método: POST
URL: /pessoas
Corpo da Requisição: Objeto Pessoa com dados válidos
Verificar se a resposta contém o objeto Pessoa criado.
Obter os detalhes de uma pessoa por ID:

Método: GET
URL: /pessoas/:id
Verificar se a resposta contém os detalhes corretos da pessoa.
Atualizar os dados de uma pessoa existente:

Método: PUT
URL: /pessoas/:id
Corpo da Requisição: Objeto Pessoa com os campos a serem atualizados
Verificar se a resposta contém o objeto Pessoa atualizado.
Excluir uma pessoa existente:

Método: DELETE
URL: /pessoas/:id
Verificar se a resposta retorna o código de status
204 (Sem Conteúdo) e a pessoa é removida com sucesso.

Listar todas as atividades:

Método: GET
URL: /atividades
Verificar se a resposta contém uma lista válida de atividades.
Criar uma nova atividade:

Método: POST
URL: /atividades
Corpo da Requisição: Objeto Atividade com dados válidos
Verificar se a resposta contém o objeto Atividade criado.
Obter os detalhes de uma atividade por ID:

Método: GET
URL: /atividades/:id
Verificar se a resposta contém os detalhes corretos da atividade.
Atualizar os dados de uma atividade existente:

Método: PUT
URL: /atividades/:id
Corpo da Requisição: Objeto Atividade com os campos a serem atualizados
Verificar se a resposta contém o objeto Atividade atualizado.
Excluir uma atividade existente:

Método: DELETE
URL: /atividades/:id
Verificar se a resposta retorna o código de status 204 (Sem Conteúdo) e a atividade é removida com sucesso.
Listar todas as equipes:

Método: GET
URL: /equipes
Verificar se a resposta contém uma lista válida de equipes.
Criar uma nova equipe:

Método: POST
URL: /equipes
Corpo da Requisição: Objeto Equipe com dados válidos
Verificar se a resposta contém o objeto Equipe criado.
Obter os detalhes de uma equipe por ID:

Método: GET
URL: /equipes/:id
Verificar se a resposta contém os detalhes corretos da equipe.
Atualizar os dados de uma equipe existente:

Método: PUT
URL: /equipes/:id
Corpo da Requisição: Objeto Equipe com os campos a serem atualizados
Verificar se a resposta contém o objeto Equipe atualizado.
Excluir uma equipe existente:

Método: DELETE
URL: /equipes/:id
Verificar se a resposta retorna o código de status 204 (Sem Conteúdo) e a equipe é removida com sucesso.
Listar todos os projetos:

Método: GET
URL: /projetos
Verificar se a resposta contém uma lista válida de projetos.
Criar um novo projeto:

Método: POST
URL: /projetos
Corpo da Requisição: Objeto Projeto com dados válidos
Verificar se a resposta contém o objeto Projeto criado.
Obter os detalhes de um projeto por ID:

Método: GET
URL: /projetos/:id
Verificar se a resposta contém os detalhes corretos do projeto.
Atualizar os dados de um projeto existente:

Método: PUT
URL: /projetos/:id
Corpo da Requisição: Objeto Projeto com os campos a serem atualizados
Verificar se a resposta contém o objeto Projeto atualizado
Excluir um projeto existente:

Método: DELETE
URL: /projetos/:id
Verificar se a resposta retorna o código de status 204 (Sem Conteúdo) e o projeto é removido com sucesso.
Listar todos os convites:

Método: GET
URL: /convites
Verificar se a resposta contém uma lista válida de convites.
Criar um novo convite:

Método: POST
URL: /convites
Corpo da Requisição: Objeto Convite com dados válidos
Verificar se a resposta contém o objeto Convite criado.
Obter os detalhes de um convite por ID:

Método: GET
URL: /convites/:id
Verificar se a resposta contém os detalhes corretos do convite.
Atualizar os dados de um convite existente:

Método: PUT
URL: /convites/:id
Corpo da Requisição: Objeto Convite com os campos a serem atualizados
Verificar se a resposta contém o objeto Convite atualizado.
Excluir um convite existente:

Método: DELETE
URL: /convites/:id
Verificar se a resposta retorna o código de status 204 (Sem Conteúdo) e o convite é removido com sucesso.
Aceitar um convite:

Método: PUT
URL: /convites/:id/aceitar
Verificar se a resposta retorna o código de status 200 (OK) e o convite é aceito com sucesso.
Listar todos os convites de uma pessoa:

Método: GET
URL: /convites/pessoa/:idPessoa
Verificar se a resposta contém uma lista válida de convites enviados para a pessoa especificada.
Listar todos os convites de uma equipe:

Método: GET
URL: /convites/equipe/:idEquipe
Verificar se a resposta contém uma lista válida de convites enviados para a equipe especificada.
