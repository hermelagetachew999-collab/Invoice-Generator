import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error('CRITICAL: DATABASE_URL is missing from environment variables!');
}

const sql = postgres(DATABASE_URL || '', {
    ssl: { rejectUnauthorized: false },
    connect_timeout: 10, // 10 seconds
});

export default sql;
