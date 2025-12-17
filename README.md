# frontproject-development-serviceApi

API service for frontend project development deployment methods comparison.

## Overview

This service provides a REST API that returns information about different deployment methods for frontend projects, including their complexity, cost, and best use cases.

## Deployment Methods Comparison

| Method | Complexity | Cost | Best For |
|--------|-----------|------|----------|
| PaaS (Vercel/Netlify) | Low | Free - $$$ | Next.js, Standard SPAs, Rapid Prototyping |
| Object Storage (S3) | Medium | Low | High-traffic Static Sites, Enterprise |
| Docker / K8s | High | High | Complex Microservices, Strict Security |
| VPS (Nginx) | Medium | Low | Traditional setups, self-hosting |

## Installation

```bash
# No dependencies required - uses Node.js built-in modules
npm install
```

## Usage

Start the server:

```bash
npm start
```

The server will start on port 3000 (or the PORT environment variable if set).

## API Endpoints

### GET /

Returns API information and available endpoints.

**Response:**
```json
{
  "message": "Frontend Project Development Service API",
  "endpoints": {
    "/api/deployment-methods": "GET - Retrieve all deployment methods comparison",
    "/health": "GET - Health check endpoint"
  }
}
```

### GET /api/deployment-methods

Returns all deployment methods with their characteristics.

**Response:**
```json
{
  "deploymentMethods": [
    {
      "method": "PaaS (Vercel/Netlify)",
      "complexity": "Low",
      "cost": "Free - $$$",
      "bestFor": "Next.js, Standard SPAs, Rapid Prototyping"
    },
    {
      "method": "Object Storage (S3)",
      "complexity": "Medium",
      "cost": "Low",
      "bestFor": "High-traffic Static Sites, Enterprise"
    },
    {
      "method": "Docker / K8s",
      "complexity": "High",
      "cost": "High",
      "bestFor": "Complex Microservices, Strict Security"
    },
    {
      "method": "VPS (Nginx)",
      "complexity": "Medium",
      "cost": "Low",
      "bestFor": "Traditional setups, self-hosting"
    }
  ]
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

## Example Usage

```bash
# Get all deployment methods
curl http://localhost:3000/api/deployment-methods

# Health check
curl http://localhost:3000/health
```

## License

MIT
