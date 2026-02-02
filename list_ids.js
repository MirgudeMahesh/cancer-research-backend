const fs = require('fs');
const path = require('path');

const formsDir = 'd:/cancer-research-parent/cancer-research/src/forms';
const files = fs.readdirSync(formsDir);

let allIds = new Set();

files.forEach(file => {
    if (file.endsWith('.js')) {
        const content = fs.readFileSync(path.join(formsDir, file), 'utf8');
        // Simple regex to find id: '...'
        const matches = content.match(/id:\s*['"]([^'"]+)['"]/g);
        if (matches) {
            matches.forEach(m => {
                const id = m.match(/id:\s*['"]([^'"]+)['"]/)[1];
                allIds.add(id);
            });
        }
    }
});

// Biochemical evaluation prefixes
const baseBio = ['hemoglobin', 'leucocytes', 'lymphocytesTotal', 'lymphocytesPercent', 'neutrophils', 'platelets', 'rdw', 'mcv', 'glucose', 'triglycerides', 'cholesterol', 'albumin', 'prealbumin', 'creatinine', 'hba1c', 'bun', 'crp', 'alkalinePhosphatase', 'urineNitrogen', 'vitaminD'];
['hosp', 'inter', 'disch'].forEach(prefix => {
    allIds.add(`${prefix}_done`);
    baseBio.forEach(b => allIds.add(`${prefix}_${b}`));
});

console.log(JSON.stringify(Array.from(allIds)));
