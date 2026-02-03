require('dotenv').config();
const mysql = require('mysql2/promise');

const columns = ["status", "nutritionalRiskTool", "glimCriteria", "mustValue", "mnaValue", "nrsValue", "snaqValue", "snaqValue", "sgaValue", "otherNutritionalRiskToolName", "otherNutritionalRiskValue", "usualBodyWeight", "height", "hosp_currentWeight", "hosp_weightLoss", "hosp_weightLossPeriod", "hosp_weightLossAmount", "hosp_waistCircumference", "hosp_hipCircumference", "hosp_bmi", "hosp_muac", "hosp_calfCircumference", "hosp_dynamometry", "inter_currentWeight", "inter_waistCircumference", "inter_hipCircumference", "inter_bmi", "inter_muac", "inter_calfCircumference", "inter_dynamometry", "disch_currentWeight", "disch_waistCircumference", "disch_hipCircumference", "disch_bmi", "disch_muac", "disch_calfCircumference", "disch_dynamometry", "dieteticAssessmentType", "dietType", "specialDietType", "hospitalizationKcal", "hospitalizationProteins", "hospitalizationCarbohydrates", "hospitalizationFats", "hospitalizationFiber", "hospitalizationFluids", "daysToFirstConsultation", "hemoglobin", "leucocytes", "lymphocytesTotal", "lymphocytesPercent", "neutrophils", "platelets", "rdw", "mcv", "glucose", "triglycerides", "cholesterol", "albumin", "prealbumin", "creatinine", "hba1c", "bun", "crp", "alkalinePhosphatase", "urineNitrogen", "vitaminD", "initialCancerDiagnosis", "firstCancerTherapy", "dateOfAdmission", "conditionSpecific", "conditionSpecificOther", "primaryDiagnosis", "neoplasmsOfOrgan", "neoplasmsOfRegion", "hematologicOncology", "clinicalStage", "priorSurgery", "surgeryTiming", "typeOfTreatment", "chemotherapyScheme", "chemotherapySchemeOther", "chemotherapyLine", "chemotherapyLineOther", "performanceStatusScale", "ecogScaleValue", "karnofskyScaleValue", "emergencyContact", "emergencyPhone", "preferredLanguage", "notes", "nutritionPlanned", "oralSupplementsName", "oralSupplementsAmount", "recommendedIntake", "recommendedIntakeOther", "nutritionSupplementType", "enteralNutritionType", "infusionType", "infusionTypeOther", "parenteralNutritionType", "totalKcalPlanned", "totalProteinsPlanned", "totalFatsPlanned", "totalCarbohydratesPlanned", "totalFiberPlanned", "totalFluidsPlanned", "monitoringDays", "refeedingSyndrome", "mortality", "dateOfDeath", "hospitalDischargeDate", "hospitalStayLength", "discontinueOncologyTreatment", "discontinueReason", "patientId", "firstName", "lastName", "dateOfBirth", "chronologicalAge", "gender", "occupation", "country", "hosp_done", "hosp_hemoglobin", "hosp_leucocytes", "hosp_lymphocytesTotal", "hosp_lymphocytesPercent", "hosp_neutrophils", "hosp_platelets", "hosp_rdw", "hosp_mcv", "hosp_glucose", "hosp_triglycerides", "hosp_cholesterol", "hosp_albumin", "hosp_prealbumin", "hosp_creatinine", "hosp_hba1c", "hosp_bun", "hosp_crp", "hosp_alkalinePhosphatase", "hosp_urineNitrogen", "hosp_vitaminD", "inter_done", "inter_hemoglobin", "inter_leucocytes", "inter_lymphocytesTotal", "inter_lymphocytesPercent", "inter_neutrophils", "inter_platelets", "inter_rdw", "inter_mcv", "inter_glucose", "inter_triglycerides", "inter_cholesterol", "inter_albumin", "inter_prealbumin", "inter_creatinine", "inter_hba1c", "inter_bun", "inter_crp", "inter_alkalinePhosphatase", "inter_urineNitrogen", "inter_vitaminD", "disch_done", "disch_hemoglobin", "disch_leucocytes", "disch_lymphocytesTotal", "disch_lymphocytesPercent", "disch_neutrophils", "disch_platelets", "disch_rdw", "disch_mcv", "disch_glucose", "disch_triglycerides", "disch_cholesterol", "disch_albumin", "disch_prealbumin", "disch_creatinine", "disch_hba1c", "disch_bun", "disch_crp", "disch_alkalinePhosphatase", "disch_urineNitrogen", "disch_vitaminD"];


async function cleanRebuild() {
    let connection;
    try {
        connection = await mysql.createConnection(process.env.DATABASE_URL);
        console.log('Connected to database.');

        // 1. Drop existing table to start fresh
        console.log('Dropping existing patients table...');
        await connection.execute('DROP TABLE IF EXISTS patients');

        // 2. Build the CREATE TABLE command
        let sql = `CREATE TABLE patients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      doctor_id CHAR(36) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `;

        // Map columns. Using TEXT for most, but JSON for arrays/objects
        const jsonColumns = ['monitoringDays', 'performanceStatusScale', 'nutritionPlanned', 'dieteticAssessmentType', 'enteralNutritionType', 'nutritionalRiskTool'];

        const sqlColumns = columns.map(col => {
            if (jsonColumns.includes(col)) {
                return `  ${col} JSON`;
            }
            return `  ${col} TEXT`;
        });

        sql += sqlColumns.join(',\n');
        sql += ',\n  FOREIGN KEY (doctor_id) REFERENCES doctors(id)\n)';

        console.log('Recreating patients table with clean structure...');
        await connection.execute(sql);
        console.log('Database clean rebuild complete!');

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        if (connection) await connection.end();
    }
}

cleanRebuild();
