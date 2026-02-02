require('dotenv').config();
const mysql = require('mysql2/promise');

async function fix() {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL);
        console.log('Connected to database.');

        console.log('Altering glimCriteria column to TEXT...');
        await connection.execute('ALTER TABLE patients MODIFY glimCriteria TEXT');

        console.log('Successfully altered glimCriteria to TEXT.');

        await connection.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

fix();
