require('dotenv').config();
const mysql = require('mysql2/promise');

async function check() {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL);
        const [rows] = await connection.execute('DESCRIBE patients');
        const jsonCols = rows.filter(r => r.Type === 'json');
        console.log('JSON columns found in patients table:');
        console.table(jsonCols);
        await connection.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}
check();
