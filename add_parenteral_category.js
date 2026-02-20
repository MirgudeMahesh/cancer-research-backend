const mysql = require("mysql2/promise");
require('dotenv').config();

async function addColumn() {
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
        console.log("Adding parenteralNutritionCategory column...");
        await pool.execute("ALTER TABLE patients ADD COLUMN parenteralNutritionCategory VARCHAR(255) AFTER parenteralNutritionType");
        console.log("Successfully added parenteralNutritionCategory column.");
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("Column already exists.");
        } else {
            console.error("Error adding column:", err.message);
        }
    } finally {
        await pool.end();
    }
}

addColumn();
