const Pool = require('pg');

//URI to sql database hosted on ElephantSQL
const PG_URI = 'postgres://sattzzrt:K_2Lb2bEifiBN_oKJwSKBu3Q65rRerCr@rajje.db.elephantsql.com:5432/sattzzrt';

//creating a pool so that we don't overload the psql server with multiple queries
const pool = new Pool({
    connectionString: PG_URI,
});

