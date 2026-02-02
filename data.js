require('dotenv').config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// ---------- CORS ----------
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000' ;
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
// const allowedOrigins = [
//     'http://localhost:5173',
//     'http://127.0.0.1:5173',
//     process.env.FRONTEND_ORIGIN // optional: for production
// ].filter(Boolean);

// app.use(cors({
//     origin: allowedOrigins,
//     credentials: true
// }));

app.use(express.json());

// ---------- DB pool (supports DATABASE_URL or individual env vars) ----------
let pool;

try {
    // decide sslOptions based on env
    let sslOptions = undefined;

    if (process.env.DB_SSL === "true") {
        // DEV-FRIENDLY: allow self-signed chain
        // For strict production, replace with CA file + rejectUnauthorized: true
        const certPath = path.resolve(__dirname, "certs", "aiven-ca.pem");
        if (fs.existsSync(certPath)) {
            sslOptions = {
                ca: fs.readFileSync(certPath),
                rejectUnauthorized: false, // allow self-signed in chain
            };
            console.log("🔐 Using Aiven CA certificate for SSL (relaxed verification)");
        } else {
            sslOptions = {
                rejectUnauthorized: false, // no CA file, but still use TLS without strict verify
            };
            console.log("🔐 Using SSL with relaxed verification (no CA file found)");
        }
    } else {
        console.log("🔓 DB_SSL is false or not set, connecting without SSL");
    }

    if (process.env.DATABASE_URL) {
        const dbUrl = new URL(process.env.DATABASE_URL);
        pool = mysql.createPool({
            host: dbUrl.hostname,
            port: dbUrl.port ? Number(dbUrl.port) : 3306,
            user: decodeURIComponent(dbUrl.username),
            password: decodeURIComponent(dbUrl.password),
            database: dbUrl.pathname.replace("/", ""),
            waitForConnections: true,
            connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 50),
            ssl: sslOptions,
        });
    } else {
        pool = mysql.createPool({
            host: process.env.DB_HOST || "localhost",
            port: Number(process.env.DB_PORT || 3306),
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "root",
            database: process.env.DB_NAME || "material_request_promotion",
            waitForConnections: true,
            connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 50),
            ssl: sslOptions,
        });
    }
} catch (err) {
    console.error("❌ Error creating DB pool:", err);
    process.exit(1);
}

// Test connection
pool
    .getConnection()
    .then((conn) => {
        console.log("✅ MySQL connected successfully!");
        conn.release();
    })
    .catch((err) => {
        console.error("❌ Failed to connect to MySQL:", err.message);
        process.exit(1);
    });

// ---------- Health check ----------
app.get("/healthz", (_, res) => res.send("ok"));

/**
 * 1. Login Validation & ID Fetching
 * Validates doctor credentials and returns the doctor's ID for frontend local storage.
 */
app.post("/api/login", async (req, res) => {
    const { email, password_hash } = req.body;
    const normalizedEmail = email ? email.trim().toLowerCase() : '';

    console.log(`Login attempt for: ${normalizedEmail}`);

    try {
        const [rows] = await pool.execute(
            "SELECT id, name, email, password_hash FROM doctors WHERE email = ?",
            [normalizedEmail]
        );

        if (rows.length === 0) {
            console.log("User not found in database");
            return res.status(401).json({ success: false, message: "Invalid email or credentials" });
        }

        const doctor = rows[0];

        // Direct comparison with the password_hash column
        if (password_hash !== doctor.password_hash) {
            return res.status(401).json({ success: false, message: "Invalid email or credentials" });
        }

        res.json({
            success: true,
            message: "Login successful",
            doctor: {
                id: doctor.id,
                name: doctor.name,
                email: doctor.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

/**
 * Reference for `patients` table columns (for CREATE TABLE statement):
 *
 * CREATE TABLE patients (
 *     id INT AUTO_INCREMENT PRIMARY KEY,
 *     doctor_id INT NOT NULL,
 *     patient_id VARCHAR(255),
 *     patient_identifier VARCHAR(255),
 *     patient_age INT,
 *     age_of_patient VARCHAR(255),
 *     patient_date_of_birth DATE,
 *     chronological_age VARCHAR(255),
 *     months INT,
 *     days INT,
 *     gender VARCHAR(50),
 *     occupation VARCHAR(255),
 *     country VARCHAR(255),
 *     initial_cancer_diagnosis VARCHAR(255),
 *     first_cancer_therapy DATE,
 *     patients_type VARCHAR(255),
 *     condition_specific VARCHAR(255),
 *     hematology_oncology VARCHAR(255),
 *     primary_diagnosis VARCHAR(255),
 *     neoplasms_of_organ VARCHAR(255),
 *     neoplasms_of_region VARCHAR(255),
 *     clinical_stage VARCHAR(255),
 *     prior_surgery BOOLEAN,
 *     if_yes VARCHAR(255),
 *     type_of_treatment VARCHAR(255),
 *     chemotherapy_scheme VARCHAR(255),
 *     chemotherapy VARCHAR(255),
 *     performance_status_scale VARCHAR(255),
 *     ecog_scale VARCHAR(255),
 *     karnofsky_scale VARCHAR(255),
 *     nutritional_risk_tool_name VARCHAR(255),
 *     glim_criteria JSON,
 *     must_score JSON,
 *     mna_score JSON,
 *     nrs_score JSON,
 *     snaq_score JSON,
 *     sga_score JSON,
 *     other_nutritional_risk_value VARCHAR(255),
 *     weight_loss_occurred BOOLEAN,
 *     weight_loss_amount VARCHAR(255),
 *     weight_loss_start DATE,
 *     usual_body_weight DECIMAL(5,2),
 *     current_body_weight DECIMAL(5,2),
 *     height DECIMAL(5,2),
 *     waist_circumference DECIMAL(5,2),
 *     hip_circumference DECIMAL(5,2),
 *     body_mass_index DECIMAL(5,2),
 *     middle_upper_arm_circumference DECIMAL(5,2),
 *     calf_circumference DECIMAL(5,2),
 *     dynamometry DECIMAL(5,2),
 *     hemoglobin DECIMAL(5,2),
 *     leucocytes DECIMAL(5,2),
 *     lymphocytes_total DECIMAL(5,2),
 *     lymphocytes_percent DECIMAL(5,2),
 *     neutrophils DECIMAL(5,2),
 *     platelets DECIMAL(5,2),
 *     rdw DECIMAL(5,2),
 *     mcv DECIMAL(5,2),
 *     glucose DECIMAL(5,2),
 *     triglycerides DECIMAL(5,2),
 *     cholesterol DECIMAL(5,2),
 *     albumin DECIMAL(5,2),
 *     prealbumin DECIMAL(5,2),
 *     creatinine DECIMAL(5,2),
 *     hba1c DECIMAL(5,2),
 *     bun DECIMAL(5,2),
 *     crp DECIMAL(5,2),
 *     alkaline_phosphatase DECIMAL(5,2),
 *     urine_nitrogen_24hrs DECIMAL(5,2),
 *     vitamin_d_level DECIMAL(5,2),
 *     type_of_dietetic_data_collection VARCHAR(255),
 *     type_of_diet VARCHAR(255),
 *     kcal DECIMAL(5,2),
 *     proteins DECIMAL(5,2),
 *     carbohydrates DECIMAL(5,2),
 *     fats DECIMAL(5,2),
 *     fiber DECIMAL(5,2),
 *     fluids DECIMAL(5,2),
 *     total_kcal DECIMAL(5,2),
 *     total_proteins DECIMAL(5,2),
 *     total_fats DECIMAL(5,2),
 *     total_carbohydrates DECIMAL(5,2),
 *     total_fiber DECIMAL(5,2),
 *     total_fluids DECIMAL(5,2),
 *     days_from_diagnosis_to_consultation INT,
 *     nutrition_type VARCHAR(255),
 *     enteral_nutrition VARCHAR(255),
 *     bolus_or_continued_infusion VARCHAR(255),
 *     parenteral_nutrition VARCHAR(255),
 *     oral_nutrition_supplements VARCHAR(255),
 *     supplement_amount_per_day VARCHAR(255),
 *     recommended_intake VARCHAR(255),
 *     dosage_of_supplement VARCHAR(255),
 *     total_energy_day1 DECIMAL(5,2),
 *     total_energy_day2 DECIMAL(5,2),
 *     total_energy_day3 DECIMAL(5,2),
 *     total_energy_day4 DECIMAL(5,2),
 *     total_energy_day5 DECIMAL(5,2),
 *     refeeding_syndrome BOOLEAN,
 *     hospital_discharge_date DATE,
 *     mortality BOOLEAN,
 *     length_of_hospital_stay INT,
 *     day30_readmission BOOLEAN,
 *     upcoming_follow_up DATE,
 *     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 *     FOREIGN KEY (doctor_id) REFERENCES doctors(id)
 * );
 */
/**
 * 2. Add Patient
 * Saves patient details along with the associated doctor_id.
 */
app.post("/api/patients", async (req, res) => {
    const patientData = req.body;
    
    // We want to save everything sent by the frontend that isn't metadata
    const metadataFields = ['id', 'created_at', 'updated_at'];
    
    // Iterate through all fields in patientData
    const columns = [];
    const values = [];
    
    for (const [key, value] of Object.entries(patientData)) {
        if (metadataFields.includes(key)) continue;
        
        columns.push(key);
        
        // Handle serialization of complex types (arrays or objects)
        if (value !== null && typeof value === 'object') {
            values.push(JSON.stringify(value));
        } else {
            values.push(value);
        }
    }

    if (columns.length === 0) {
        return res.status(400).json({ success: false, message: "No patient data provided" });
    }

    try {
        const placeholders = columns.map(() => "?").join(", ");
        const sql = `INSERT INTO patients (${columns.join(", ")}) VALUES (${placeholders})`;

        const [result] = await pool.execute(sql, values);
        
        res.json({ 
            success: true, 
            message: "Patient record saved successfully",
            patientId: result.insertId 
        });
    } catch (error) {
        console.error("Add patient error:", error);
        
        // If column is missing, we might want to log it specifically
        if (error.code === 'ER_BAD_FIELD_ERROR') {
            return res.status(500).json({ 
                success: false, 
                message: "Database schema mismatch. Please ensure all form fields have corresponding columns in the patients table.",
                error: error.message 
            });
        }

        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});

/**
 * 3. Fetch All Patients of a Doctor
 * Retrieves all patient records added by a specific doctor.
 */
app.get("/api/patients/doctor/:doctorId", async (req, res) => {
    const { doctorId } = req.params;
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM patients WHERE doctor_id = ? ORDER BY created_at DESC",
            [doctorId]
        );
        res.json({ success: true, patients: rows });
    } catch (error) {
        console.error("Fetch patients error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
