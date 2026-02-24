import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL || DATABASE_URL.includes('username:password')) {
    console.warn('CRITICAL: DATABASE_URL is not configured correctly in .env');
}

const sql = postgres(DATABASE_URL!, {
    ssl: { rejectUnauthorized: false },
});

export default sql;
