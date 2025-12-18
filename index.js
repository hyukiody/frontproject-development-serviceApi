const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Load deployment methods data
const dataPath = path.join(__dirname, 'data', 'deployment-methods.json');

let deploymentData;
try {
  const rawData = fs.readFileSync(dataPath, 'utf8');
  deploymentData = JSON.parse(rawData);
} catch (error) {
  console.error('Error loading deployment methods data:', error.message);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Route handling
  if (req.url === '/api/deployment-methods' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(deploymentData, null, 2));
  } else if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'healthy' }));
  } else if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'Frontend Project Development Service API',
      endpoints: {
        '/api/deployment-methods': 'GET - Retrieve all deployment methods comparison',
        '/health': 'GET - Health check endpoint'
      }
    }, null, 2));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Available endpoints:`);
  console.log(`  - GET /api/deployment-methods`);
  console.log(`  - GET /health`);
});
