const { Client } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_tREOyK93YVkC@ep-soft-shape-amm4nsqs.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
  connectionString: connectionString,
});

client.connect()
  .then(() => {
    console.log('Connected successfully');
    return client.query('SELECT NOW()');
  })
  .then(res => {
    console.log('Current time:', res.rows[0]);
    return client.end();
  })
  .catch(err => {
    console.error('Connection error', err.stack);
    process.exit(1);
  });
