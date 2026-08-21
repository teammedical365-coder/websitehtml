const fs = require('fs');
const c = fs.readFileSync('global-styles.css', 'utf8');

let pos = c.indexOf('@media (max-width: 1199px) {');
if (pos < 0) {
    console.log('Not found');
    process.exit(1);
}

let depth = 0;
let lines = c.split('\n');
let startLine = 0;
let currentPos = 0;

for(let i=0; i<c.length; i++) {
    if (c[i] == '{') depth++;
    if (c[i] == '}') {
        depth--;
        if (i > pos && depth == 0) {
            const lineNum = c.substring(0, i).split('\n').length;
            console.log('The @media (max-width: 1199px) { that starts at line ' + c.substring(0, pos).split('\n').length + ' CLOSES at line ' + lineNum);
            process.exit(0);
        }
    }
}
console.log('No closing brace found for the top-level @media (max-width: 1199px) {');
