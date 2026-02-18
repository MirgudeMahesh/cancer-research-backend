const mysql = require("mysql2/promise");
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function checkSchema() {
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
        const [columns] = await pool.execute("SHOW COLUMNS FROM patients");
        const fieldNames = columns.map(c => c.Field);
        console.log("COLUMNS_START");
        console.log(fieldNames.join(","));
        console.log("COLUMNS_END");
    } catch (err) {
        console.error("Error fetching schema:", err.message);
    } finally {
        await pool.end();
    }
}

checkSchema();
