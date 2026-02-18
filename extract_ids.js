const fs = require('fs');
const path = require('path');

const formsDir = path.join(__dirname, '..', 'cancer-research', 'src', 'forms');
const ids = new Set();

fs.readdirSync(formsDir).forEach(file => {
    if (file.endsWith('.js')) {
        const content = fs.readFileSync(path.join(formsDir, file), 'utf8');
        const matches = content.match(/id:\s*'([^']*)'/g);
        if (matches) {
            matches.forEach(m => {
                const idMatch = m.match(/'([^']*)'/);
                if (idMatch) ids.add(idMatch[1]);
            });
        }
    }
});

console.log("FORM_IDS_START");
console.log(JSON.stringify(Array.from(ids)));
console.log("FORM_IDS_END");
