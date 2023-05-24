const { Pool } = require('pg');

const pool = new Pool({
  host: 'projetofacil.ddns.net',
  user: 'user_projeto',
  password: 'Entregador@1010',
  database: 'projeto_facil',
  port: 5432
});

module.exports = pool;
