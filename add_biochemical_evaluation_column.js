const mysql = require("mysql2/promise");
require('dotenv').config();

async function addColumn() {
    let sslOptions = undefined;
    if (process.env.DB_SSL === "true") {
        sslOptions = {
            rejectUnauthorized: false
        };
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
        console.log("Adding biochemicalEvaluation column...");
        // Check if column exists first to avoid error
        const [columns] = await pool.execute("SHOW COLUMNS FROM patients LIKE 'biochemicalEvaluation'");
        if (columns.length === 0) {
            await pool.execute("ALTER TABLE patients ADD COLUMN biochemicalEvaluation JSON DEFAULT NULL");
            console.log("✅ biochemicalEvaluation column added successfully.");
        } else {
            console.log("ℹ️ biochemicalEvaluation column already exists.");
        }

    } catch (err) {
        console.error("❌ Error adding column:", err.message);
    } finally {
        await pool.end();
    }
}

addColumn();
