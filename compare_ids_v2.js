const formIds = ["nutritionalRiskTool", "glimCriteria", "mustValue", "mnaValue", "nrsValue", "snaqValue", "sgaValue", "otherNutritionalRiskToolName", "otherNutritionalRiskValue", "usualBodyWeight", "height", "hosp_anthropometricHeading", "hosp_currentWeight", "hosp_weightLoss", "hosp_weightLossPeriod", "hosp_weightLossAmount", "hosp_waistCircumference", "hosp_hipCircumference", "hosp_bmi", "hosp_muac", "hosp_calfCircumference", "hosp_dynamometry", "inter_anthropometricHeading", "inter_currentWeight", "inter_waistCircumference", "inter_hipCircumference", "inter_bmi", "inter_muac", "inter_calfCircumference", "inter_dynamometry", "disch_anthropometricHeading", "disch_currentWeight", "disch_waistCircumference", "disch_hipCircumference", "disch_bmi", "disch_muac", "disch_calfCircumference", "disch_dynamometry", "dieteticAssessmentType", "dietType", "specialDietType", "hospitalizationHeading", "hospitalizationKcal", "hospitalizationProteins", "hospitalizationCarbohydrates", "hospitalizationFats", "hospitalizationFiber", "hospitalizationFluids", "daysToFirstConsultation", "hosp_heading", "hosp_done", "hemoglobin", "leucocytes", "lymphocytesTotal", "lymphocytesPercent", "neutrophils", "platelets", "rdw", "mcv", "glucose", "triglycerides", "cholesterol", "albumin", "prealbumin", "creatinine", "hba1c", "bun", "crp", "alkalinePhosphatase", "urineNitrogen", "vitaminD", "inter_heading", "inter_done", "disch_heading", "disch_done", "initialCancerDiagnosis", "firstCancerTherapy", "patientType", "dateOfAdmission", "conditionSpecific", "conditionSpecificOther", "primaryDiagnosis", "neoplasmsOfOrgan", "neoplasmsOfRegion", "hematologicOncology", "clinicalStage", "priorSurgery", "surgeryTiming", "typeOfTreatment", "chemotherapyScheme", "chemotherapySchemeOther", "chemotherapyLine", "chemotherapyLineOther", "performanceStatusScale", "ecogScaleValue", "karnofskyScaleValue", "emergencyContact", "emergencyPhone", "preferredLanguage", "notes", "nutritionPlanningHeading", "nutritionPlanned", "oralSupplementsName", "oralSupplementsAmount", "recommendedIntake", "recommendedIntakeOther", "nutritionSupplementType", "enteralNutritionType", "infusionType", "infusionTypeOther", "parenteralNutritionType", "planningHospitalizationHeading", "totalKcalPlanned", "totalProteinsPlanned", "totalFatsPlanned", "totalCarbohydratesPlanned", "totalFiberPlanned", "totalFluidsPlanned", "monitoringDays", "refeedingSyndrome", "mortality", "dateOfDeath", "hospitalDischargeDate", "hospitalStayLength", "discontinueOncologyTreatment", "discontinueReason", "patientId", "firstName", "lastName", "personalDetailsInfo", "dateOfBirth", "chronologicalAge", "gender", "occupation", "country"];

const dbColumns = ["id", "doctor_id", "created_at", "updated_at", "patientId", "firstName", "lastName", "dateOfBirth", "chronologicalAge", "gender", "occupation", "country", "initialCancerDiagnosis", "firstCancerTherapy", "patientType", "dateOfAdmission", "conditionSpecific", "conditionSpecificOther", "primaryDiagnosis", "neoplasmsOfOrgan", "neoplasmsOfRegion", "hematologicOncology", "clinicalStage", "priorSurgery", "surgeryTiming", "typeOfTreatment", "chemotherapyScheme", "chemotherapySchemeOther", "chemotherapyLine", "chemotherapyLineOther", "performanceStatusScale", "ecogScaleValue", "karnofskyScaleValue", "dieteticAssessmentType", "dietType", "specialDietType", "hospitalizationKcal", "hospitalizationProteins", "hospitalizationCarbohydrates", "hospitalizationFats", "hospitalizationFiber", "hospitalizationFluids", "daysToFirstConsultation", "nutritionalRiskTool", "glimCriteria", "mustValue", "mnaValue", "nrsValue", "snaqValue", "sgaValue", "otherNutritionalRiskToolName", "otherNutritionalRiskValue", "usualBodyWeight", "height", "hosp_currentWeight", "hosp_weightLoss", "hosp_weightLossPeriod", "hosp_weightLossAmount", "hosp_waistCircumference", "hosp_hipCircumference", "hosp_bmi", "hosp_muac", "hosp_calfCircumference", "hosp_dynamometry", "inter_currentWeight", "inter_waistCircumference", "inter_hipCircumference", "inter_bmi", "inter_muac", "inter_calfCircumference", "inter_dynamometry", "disch_currentWeight", "disch_waistCircumference", "disch_hipCircumference", "disch_bmi", "disch_muac", "disch_calfCircumference", "disch_dynamometry", "hosp_done", "hosp_hemoglobin", "hosp_leucocytes", "hosp_lymphocytesTotal", "hosp_lymphocytesPercent", "hosp_neutrophils", "hosp_platelets", "hosp_rdw", "hosp_mcv", "hosp_glucose", "hosp_triglycerides", "hosp_cholesterol", "hosp_albumin", "hosp_prealbumin", "hosp_creatinine", "hosp_hba1c", "hosp_bun", "hosp_crp", "hosp_alkalinePhosphatase", "hosp_urineNitrogen", "hosp_vitaminD", "inter_done", "inter_hemoglobin", "inter_leucocytes", "inter_lymphocytesTotal", "inter_lymphocytesPercent", "inter_neutrophils", "inter_platelets", "inter_rdw", "inter_mcv", "inter_glucose", "inter_triglycerides", "inter_cholesterol", "inter_albumin", "inter_prealbumin", "inter_creatinine", "inter_hba1c", "inter_bun", "inter_crp", "inter_alkalinePhosphatase", "inter_urineNitrogen", "inter_vitaminD", "disch_done", "disch_hemoglobin", "disch_leucocytes", "disch_lymphocytesTotal", "disch_lymphocytesPercent", "disch_neutrophils", "disch_platelets", "disch_rdw", "disch_mcv", "disch_glucose", "disch_triglycerides", "disch_cholesterol", "disch_albumin", "disch_prealbumin", "disch_creatinine", "disch_hba1c", "disch_bun", "disch_crp", "disch_alkalinePhosphatase", "disch_urineNitrogen", "disch_vitaminD", "nutritionPlanned", "oralSupplementsName", "oralSupplementsAmount", "recommendedIntake", "recommendedIntakeOther", "nutritionSupplementType", "enteralNutritionType", "infusionType", "infusionTypeOther", "parenteralNutritionType", "totalKcalPlanned", "totalProteinsPlanned", "totalFatsPlanned", "totalCarbohydratesPlanned", "totalFiberPlanned", "totalFluidsPlanned", "monitoringDays", "refeedingSyndrome", "mortality", "dateOfDeath", "hospitalDischargeDate", "hospitalStayLength", "discontinueOncologyTreatment", "discontinueReason", "emergencyContact", "emergencyPhone", "preferredLanguage", "notes", "status"];

const ignoreFields = [
    "personalDetailsInfo",
    "hosp_anthropometricHeading",
    "inter_anthropometricHeading",
    "disch_anthropometricHeading",
    "hospitalizationHeading",
    "hosp_heading",
    "inter_heading",
    "disch_heading",
    "planningHospitalizationHeading",
    "nutritionPlanningHeading"
];

const baseBiochem = ["hemoglobin", "leucocytes", "lymphocytesTotal", "lymphocytesPercent", "neutrophils", "platelets", "rdw", "mcv", "glucose", "triglycerides", "cholesterol", "albumin", "prealbumin", "creatinine", "hba1c", "bun", "crp", "alkalinePhosphatase", "urineNitrogen", "vitaminD"];

const missing = [];

formIds.forEach(id => {
    if (dbColumns.includes(id)) return;
    if (ignoreFields.includes(id)) return;

    if (baseBiochem.includes(id)) {
        // Check if all variants exist
        ['hosp', 'inter', 'disch'].forEach(prefix => {
            const prefixed = `${prefix}_${id}`;
            if (!dbColumns.includes(prefixed)) {
                missing.push(prefixed);
            }
        });
        return;
    }

    missing.push(id);
});

console.log("REALLY_MISSING:", JSON.stringify([...new Set(missing)]));
