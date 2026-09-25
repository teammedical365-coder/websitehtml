const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const root = path.resolve(__dirname, '..');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let cleanUrl = req.url.split('?')[0];
    if (cleanUrl === '/') cleanUrl = '/index.html';
    
    // Check if path without extension exists as .html
    let filePath = path.join(root, cleanUrl);
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
        return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Local static web server running at http://localhost:${PORT}/`);
    console.log(`Local IP URL: http://127.0.0.1:${PORT}/`);
});
