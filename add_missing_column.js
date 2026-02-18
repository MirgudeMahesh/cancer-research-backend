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
        console.log("Adding patientType column...");
        await pool.execute("ALTER TABLE patients ADD COLUMN patientType VARCHAR(255) AFTER firstCancerTherapy");
        console.log("Successfully added patientType column.");
    } catch (err) {
        console.error("Error adding column:", err.message);
    } finally {
        await pool.end();
    }
}

addColumn();
