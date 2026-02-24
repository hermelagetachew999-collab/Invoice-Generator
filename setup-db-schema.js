
const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error('DATABASE_URL is not defined');
    process.exit(1);
}

const sql = postgres(DATABASE_URL, {
    ssl: { rejectUnauthorized: false },
});

async function setupSchema() {
    try {
        console.log('Reading schema.sql...');
        const schemaPath = path.join(__dirname, 'lib', 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing schema...');
        await sql.unsafe(schemaSql);

        console.log('Schema applied successfully.');

        const tables = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `;
        console.log('Tables now in database:', tables.map(t => t.table_name));

        process.exit(0);
    } catch (err) {
        console.error('Schema setup failed:', err);
        process.exit(1);
    }
}

setupSchema();
