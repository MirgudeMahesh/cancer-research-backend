require('dotenv').config();
const mysql = require('mysql2/promise');

async function check() {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL);
        console.log('Connected to database.');

        const [rows] = await connection.execute('SELECT email, password_hash FROM doctors');
        console.log('Current doctors in DB:');
        console.table(rows);

        await connection.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

check();
