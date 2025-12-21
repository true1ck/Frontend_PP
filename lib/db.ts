import { Pool } from 'pg';

// PostgreSQL connection pool
let pool: Pool | null = null;

export function getPool() {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
    }
    return pool;
}

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
    const pool = getPool();
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

// Close pool (useful for testing)
export async function closePool() {
    if (pool) {
        await pool.end();
        pool = null;
    }
}
