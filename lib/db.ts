import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.warn('DATABASE_URL is not defined in .env');
}

const sql = postgres(DATABASE_URL!, {
    ssl: { rejectUnauthorized: false }, // Common for hosted DBs, adjust as needed
});

export default sql;
