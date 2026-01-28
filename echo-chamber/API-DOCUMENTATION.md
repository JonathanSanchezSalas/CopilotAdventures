# Echo Chamber API Documentation

## 🔌 API Overview

The Echo Chamber backend provides a RESTful API for programmatic sequence analysis and predictions. All endpoints return JSON responses and support CORS.

**Base URL**: `http://localhost:3000/api`

---

## 📋 Endpoints

### 1. POST /api/analyze

Analyzes a single sequence and detects its pattern.

**Request**:
```http
POST /api/analyze
Content-Type: application/json

{
  "sequence": [1, 2, 3, 4, 5]
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "pattern": {
    "type": "arithmetic",
    "difference": 1,
    "multiplier": null,
    "coefficients": null,
    "confidence": 1
  },
  "predicted": 6,
  "nextFive": [7, 8, 9, 10, 11]
}
```

**Response (Error - 400)**:
```json
{
  "error": "Sequence must contain at least 2 numbers"
}
```

**Parameters**:
- `sequence` (array of numbers, required): The sequence to analyze

**Pattern Types**:
- `arithmetic`: Constant difference between terms
- `geometric`: Constant ratio between terms
- `polynomial`: Polynomial relationship detected

**Example using curl**:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"sequence": [2, 4, 6, 8, 10]}'
```

**Example using JavaScript**:
```javascript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sequence: [1, 2, 3, 4, 5] })
});
const result = await response.json();
console.log(result);
```

---

### 2. POST /api/analyze-batch

Analyzes multiple sequences at once.

**Request**:
```http
POST /api/analyze-batch
Content-Type: application/json

{
  "sequences": [
    [1, 2, 3, 4],
    [2, 4, 8, 16],
    [1, 4, 9, 16]
  ]
}
```

**Response (Success - 200)**:
```json
{
  "results": [
    {
      "success": true,
      "pattern": { "type": "arithmetic", "difference": 1, ... },
      "predicted": 5,
      "nextFive": [6, 7, 8, 9, 10]
    },
    {
      "success": true,
      "pattern": { "type": "geometric", "multiplier": 2, ... },
      "predicted": 32,
      "nextFive": [64, 128, 256, 512, 1024]
    },
    {
      "success": true,
      "pattern": { "type": "polynomial", ... },
      "predicted": 25,
      "nextFive": [36, 49, 64, 81, 100]
    }
  ]
}
```

**Parameters**:
- `sequences` (array of arrays, required): Multiple sequences to analyze

**Limits**:
- Maximum 100 sequences per request
- Each sequence must have 2-10000 elements

**Example**:
```bash
curl -X POST http://localhost:3000/api/analyze-batch \
  -H "Content-Type: application/json" \
  -d '{
    "sequences": [
      [1, 2, 3, 4],
      [2, 4, 8, 16]
    ]
  }'
```

---

### 3. GET /api/statistics

Returns analysis statistics and history.

**Request**:
```http
GET /api/statistics
```

**Response (Success - 200)**:
```json
{
  "totalAnalyzed": 15,
  "patternBreakdown": {
    "arithmetic": 8,
    "geometric": 4,
    "polynomial": 3
  },
  "analysisHistory": [
    {
      "sequence": [1, 2, 3, 4, 5],
      "pattern": "arithmetic",
      "predicted": 6,
      "timestamp": "2026-01-28T21:30:45.123Z"
    },
    ...
  ]
}
```

**Query Parameters**: None

**Returns**:
- `totalAnalyzed`: Total number of sequences analyzed
- `patternBreakdown`: Count by pattern type
- `analysisHistory`: Array of analysis records (up to 50 most recent)

**Example**:
```bash
curl http://localhost:3000/api/statistics
```

---

### 4. POST /api/clear-history

Clears all analysis history.

**Request**:
```http
POST /api/clear-history
```

**Response (Success - 200)**:
```json
{
  "message": "History cleared successfully"
}
```

**Example**:
```bash
curl -X POST http://localhost:3000/api/clear-history
```

---

### 5. GET /api/health

Health check endpoint for monitoring.

**Request**:
```http
GET /api/health
```

**Response (Success - 200)**:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-28T21:35:12.456Z",
  "uptime": 342.567
}
```

**Returns**:
- `status`: Server status ("healthy" or "unhealthy")
- `timestamp`: Current server time (ISO 8601)
- `uptime`: Server uptime in seconds

**Example**:
```bash
curl http://localhost:3000/api/health
```

**Use Case**: 
- Load balancer health checks
- Application monitoring
- Status page updates

---

### 6. GET /api/documentation

Returns API documentation.

**Request**:
```http
GET /api/documentation
```

**Response (Success - 200)**:
```json
{
  "title": "Echo Chamber API",
  "version": "2.0.0",
  "endpoints": [
    {
      "path": "POST /api/analyze",
      "description": "Analyze a sequence",
      "body": { "sequence": [1, 2, 3, 4] },
      "response": { "pattern": "arithmetic", "predicted": 5 }
    },
    ...
  ]
}
```

**Example**:
```bash
curl http://localhost:3000/api/documentation
```

---

## 🔐 Request/Response Formats

### Content-Type

All requests should include:
```
Content-Type: application/json
```

All responses are JSON.

### Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful analysis |
| 400 | Bad Request | Invalid sequence format |
| 404 | Not Found | Invalid endpoint |
| 500 | Server Error | Internal error |

### Common Response Fields

**Success Response**:
```json
{
  "success": true,
  "pattern": { ... },
  "predicted": number,
  "nextFive": [...]
}
```

**Error Response**:
```json
{
  "error": "Description of what went wrong"
}
```

---

## 📊 Pattern Response Format

### Arithmetic Pattern
```json
{
  "type": "arithmetic",
  "difference": 2,
  "multiplier": null,
  "coefficients": null,
  "confidence": 1.0
}
```

### Geometric Pattern
```json
{
  "type": "geometric",
  "difference": null,
  "multiplier": 2,
  "coefficients": null,
  "confidence": 1.0
}
```

### Polynomial Pattern
```json
{
  "type": "polynomial",
  "difference": null,
  "multiplier": null,
  "coefficients": [1],
  "confidence": 1.0
}
```

---

## 📝 Examples

### Example 1: Simple Arithmetic Progression

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"sequence": [10, 20, 30, 40, 50]}'
```

**Response**:
```json
{
  "success": true,
  "pattern": {
    "type": "arithmetic",
    "difference": 10
  },
  "predicted": 60,
  "nextFive": [70, 80, 90, 100, 110]
}
```

### Example 2: Geometric Progression

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"sequence": [1, 3, 9, 27, 81]}'
```

**Response**:
```json
{
  "success": true,
  "pattern": {
    "type": "geometric",
    "multiplier": 3
  },
  "predicted": 243,
  "nextFive": [729, 2187, 6561, 19683, 59049]
}
```

### Example 3: Batch Analysis

```bash
curl -X POST http://localhost:3000/api/analyze-batch \
  -H "Content-Type: application/json" \
  -d '{
    "sequences": [
      [1, 2, 3, 4],
      [2, 4, 8, 16],
      [1, 4, 9, 16]
    ]
  }'
```

**Response**:
```json
{
  "results": [
    { "success": true, "pattern": { "type": "arithmetic", ... }, ... },
    { "success": true, "pattern": { "type": "geometric", ... }, ... },
    { "success": true, "pattern": { "type": "polynomial", ... }, ... }
  ]
}
```

### Example 4: Error Case

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"sequence": [1]}'
```

**Response** (400):
```json
{
  "error": "Sequence must contain at least 2 numbers"
}
```

---

## 🔄 CORS Headers

The API supports Cross-Origin Resource Sharing (CORS) from all origins.

**Response Headers**:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## 🧪 Testing the API

### Using curl

```bash
# Test health
curl http://localhost:3000/api/health

# Test analyze
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"sequence": [1,2,3,4,5]}'

# Test statistics
curl http://localhost:3000/api/statistics
```

### Using Postman

1. Create new POST request
2. URL: `http://localhost:3000/api/analyze`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {"sequence": [1, 2, 3, 4, 5]}
   ```
5. Click Send

### Using Python

```python
import requests
import json

url = 'http://localhost:3000/api/analyze'
data = {'sequence': [1, 2, 3, 4, 5]}

response = requests.post(url, json=data)
result = response.json()
print(json.dumps(result, indent=2))
```

### Using JavaScript

```javascript
const sequence = [1, 2, 3, 4, 5];

const response = await fetch('http://localhost:3000/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sequence })
});

const result = await response.json();
console.log(result);
```

---

## ⚡ Performance Considerations

### Request Limits
- Maximum sequence length: 10,000 elements
- Maximum batch size: 100 sequences
- Average response time: < 50ms

### Best Practices
1. Use batch endpoint for multiple sequences
2. Cache results to avoid duplicate analysis
3. Implement timeout (recommended: 30 seconds)
4. Handle 4xx and 5xx error responses

---

## 🛠️ Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Sequence must contain at least 2 numbers" | Too short | Add more elements |
| "All elements must be valid numbers" | Non-numeric | Remove non-numbers |
| "Could not detect a known pattern" | Unknown pattern | Try different sequence |
| Server returns 500 | Internal error | Check server logs |

### Retry Strategy

For production use, implement exponential backoff:

```javascript
async function analyzeWithRetry(sequence, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence })
      });
      return await response.json();
    } catch (error) {
      if (i < maxRetries - 1) {
        await new Promise(r => setTimeout(r, 1000 * (2 ** i)));
      } else {
        throw error;
      }
    }
  }
}
```

---

## 📈 Monitoring

### Health Check
```bash
# Check server health every 60 seconds
while true; do
  curl -s http://localhost:3000/api/health | jq '.status'
  sleep 60
done
```

### Monitor Statistics
```bash
# Get current statistics
curl -s http://localhost:3000/api/statistics | jq '.totalAnalyzed'
```

---

## 🔮 API Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-01-28 | Multi-pattern support, batch analysis |
| 1.0.0 | 2026-01-28 | Initial release |

---

## 📚 Additional Resources

- Web Interface Documentation: See `README-v2.md`
- Installation Guide: See `INSTALLATION.md`
- Quick Start: See `QUICKSTART.md`
- Running Server: `npm start`

---

**API is ready for production use! 🚀✨**
