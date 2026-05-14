const fs = require('fs');
const path = require('path');

try {
    const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

    // 1. Extract the master style block
    const styleMatch = indexHtml.match(/<style>[\s\S]*?<\/style>/i);
    const indexStyle = styleMatch ? styleMatch[0] : "";

    // 2. Extract the master mega-menu script block
    const scriptMatches = [...indexHtml.matchAll(/<script>[\s\S]*?<\/script>/gi)];
    const indexScript = scriptMatches.length > 0 ? scriptMatches[scriptMatches.length - 1][0] : "";

    const files = fs.readdirSync(__dirname);

    files.forEach(file => {
        // Target only the newly generated SEO landing pages
        if (file.startsWith('hospital-software-') && file.endsWith('.html')) {
            let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
            let initialContent = content;
            
            // Inject the massive master CSS exactly ABOVE the existing local <style> 
            // This ensures index.html styles render the Header/Footer, but local styles override for the body
            if (!content.includes('RESET & VARIABLES')) {
                content = content.replace(/<style>/i, `${indexStyle}\n    <style>`);
            }
            
            // Inject the Javascript block (for Mega Menu dropsdowns) ABOVE </body>
            if (!content.includes('syncPadding()')) {
                content = content.replace(/<\/body>/i, `${indexScript}\n</body>`);
            }

            if (content !== initialContent) {
                fs.writeFileSync(path.join(__dirname, file), content);
                console.log(`Successfully repaired CSS and JS rendering for ${file}`);
            }
        }
    });
} catch(e) {
    console.error(e);
}
