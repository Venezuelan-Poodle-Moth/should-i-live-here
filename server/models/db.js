const { Pool } = require('pg');

// URI to sql database hosted on ElephantSQL
const PG_URI = 'postgres://rqwzfyey:SClwgb4ZkpEnSuQpxtI1La-tb94ZGNPZ@rajje.db.elephantsql.com:5432/rqwzfyey';

// creating a pool so that we don't overload the psql server with multiple queries
const pool = new Pool({
  connectionString: PG_URI,
});

// console.log to make sure db is connecting is working
pool.on('connect', () => {
  console.log('connected to db');
});

// export thenable query obj
module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
  getPool: () => pool,
};
