require('dotenv').config();
const mysql = require('mysql2/promise');

async function addStatusColumn() {
    let connection;
    try {
        connection = await mysql.createConnection(process.env.DATABASE_URL);
        console.log('Connected to database.');

        // Check if status column exists
        const [rows] = await connection.execute("SHOW COLUMNS FROM patients LIKE 'status'");

        if (rows.length === 0) {
            console.log('Adding status column to patients table...');
            await connection.execute("ALTER TABLE patients ADD COLUMN status VARCHAR(20) DEFAULT 'completed'");
            console.log('Status column added successfully.');
        } else {
            console.log('Status column already exists.');
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        if (connection) await connection.end();
    }
}

addStatusColumn();
