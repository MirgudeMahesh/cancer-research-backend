const mysql = require("mysql2/promise");
require('dotenv').config();

async function findMissingColumns() {
    let sslOptions = undefined;
    if (process.env.DB_SSL === "true") {
        sslOptions = { rejectUnauthorized: false };
    }

    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: sslOptions
    });

    try {
        const [columns] = await pool.execute("SHOW COLUMNS FROM patients");
        const dbColumns = columns.map(c => c.Field);

        console.log("DB_COLUMNS:", JSON.stringify(dbColumns));
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await pool.end();
    }
}

findMissingColumns();
