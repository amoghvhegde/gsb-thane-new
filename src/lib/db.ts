import { Pool } from 'pg';

// Parse connection string manually
const connectionString = process.env.DATABASE_URL;
console.log('Connection string:', connectionString ? 'Present' : 'Missing');

const pool = new Pool({
  connectionString: connectionString,
  ssl: connectionString?.includes('supabase') ? {
    rejectUnauthorized: false
  } : false,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 10000
});

// Add error handling
pool.on('error', (err) => {
  console.error('Unexpected error on idle client:', err);
});

export default pool;