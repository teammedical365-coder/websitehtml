const fs = require('fs');
const html = fs.readFileSync('ecg-ekg-integration.html', 'utf8');
const headEnd = html.indexOf('</head>');
const headContent = html.substring(0, headEnd);
const headMatches = headContent.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('JSON-LD in <head>:', headMatches.length);

const bodyContent = html.substring(headEnd);
const bodyMatches = bodyContent.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('JSON-LD after <head>:', bodyMatches.length);
