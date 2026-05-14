const fs = require('fs');
const path = require('path');

try {
    const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

    // Extract all styles and save globally
    const styleMatch = indexHtml.match(/<style>([\s\S]*?)<\/style>/i);
    if(styleMatch) {
        fs.writeFileSync(path.join(__dirname, 'global-styles.css'), styleMatch[1]);
    }

    // Extract sticky header and mega menu Javascript
    const scriptMatches = [...indexHtml.matchAll(/<script>([\s\S]*?)<\/script>/gi)];
    if(scriptMatches.length > 0) {
        fs.writeFileSync(path.join(__dirname, 'global-scripts.js'), scriptMatches[scriptMatches.length - 1][1]);
    }

    const files = fs.readdirSync(__dirname);
    let count = 0;

    files.forEach(file => {
        if (file.endsWith('.html') && file !== 'index.html') {
            let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
            let changed = false;
            
            // Inject global CSS securely at the TOP of <head>. 
            // This guarantees the local <style> tags further down the page take priority to protect their unique layouts!
            // But if they lack .main-header rules, they inherit the global ones!
            if (!content.includes('global-styles.css')) {
                content = content.replace(/<head>/i, '<head>\n    <link rel="stylesheet" href="global-styles.css">');
                changed = true;
            }
            
            // Inject Javascript at the bottom
            if (!content.includes('global-scripts.js')) {
                content = content.replace(/<\/body>/i, '    <script src="global-scripts.js"></script>\n</body>');
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(path.join(__dirname, file), content);
                count++;
            }
        }
    });

    console.log(`Successfully generated external global assets and repaired header rendering on ${count} files.`);
} catch (e) {
    console.error(e);
}
