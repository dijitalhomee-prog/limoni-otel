const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const BRANCH = process.env.BRANCH || 'portal';

console.log(`Initializing server for BRANCH: ${BRANCH}`);

// 1. Redirect index.html on sub-domains back to the main portal domain
app.use((req, res, next) => {
  const host = req.headers.host || '';
  const urlPath = req.path;

  if (urlPath === '/index.html' && BRANCH !== 'portal') {
    return res.redirect(301, 'https://limoniotel.com/');
  }
  next();
});

// 2. Serve branch-specific homepage at root path '/'
app.get('/', (req, res) => {
  if (BRANCH === 'alacati') {
    return res.sendFile(path.join(__dirname, 'alacati.html'));
  }
  if (BRANCH === 'koyici') {
    return res.sendFile(path.join(__dirname, 'koyici.html'));
  }
  // Default to main portal page
  return res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static assets and other files
app.use(express.static(__dirname));

// Fallback routing
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Limoni Otel (${BRANCH}) Server is running on port ${PORT}`);
});

