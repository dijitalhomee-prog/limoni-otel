const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Host-based routing middleware
app.use((req, res, next) => {
  const host = req.headers.host || '';
  const urlPath = req.path;

  // 1. Root path routing based on domain name
  if (urlPath === '/') {
    // If the host is Alacati branch domain (production or dev/Railway preview)
    if (host.includes('limoniotelalacati.com') || host.includes('alacati')) {
      return res.sendFile(path.join(__dirname, 'alacati.html'));
    }
    // If the host is Koyici branch domain (production or dev/Railway preview)
    if (host.includes('limoniotelkoyici.com') || host.includes('koyici')) {
      return res.sendFile(path.join(__dirname, 'koyici.html'));
    }
    // Default to main portal page
    return res.sendFile(path.join(__dirname, 'index.html'));
  }

  // 2. Redirect index.html on sub-domains back to the main portal domain
  if (urlPath === '/index.html') {
    const isSubDomain = host.includes('limoniotelalacati.com') || 
                        host.includes('alacati') || 
                        host.includes('limoniotelkoyici.com') || 
                        host.includes('koyici');
    if (isSubDomain) {
      return res.redirect(301, 'https://limoniotel.com/');
    }
  }

  next();
});

// Serve static assets and other files
app.use(express.static(__dirname));

// Fallback routing
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Limoni Otel Server is running on port ${PORT}`);
});
