/**
 * Echo Chamber Express.js Backend Server
 * RESTful API for sequence analysis and prediction
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { SequenceAnalyzer } = require('./SequenceAnalyzer');
const Logger = require('./Logger');

const app = express();
const analyzer = new SequenceAnalyzer();
const logger = new Logger();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'web', 'public')));

// Request logging
app.use((req, res, next) => {
  logger.log(`${req.method} ${req.path}`);
  next();
});

/**
 * API Routes
 */

/**
 * POST /api/analyze
 * Analyzes a sequence and detects its pattern
 */
app.post('/api/analyze', (req, res) => {
  try {
    const { sequence } = req.body;

    if (!Array.isArray(sequence)) {
      return res.status(400).json({
        error: 'Invalid input: sequence must be an array'
      });
    }

    const result = analyzer.analyze(sequence);

    if (result.success) {
      analyzer.recordAnalysis(sequence, result.pattern, result.predicted);
      logger.log(`Analysis successful: ${result.pattern.type} pattern detected`);
      res.json(result);
    } else {
      logger.warn(`Analysis failed: ${result.error}`);
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    logger.error(`Analysis error: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/analyze-batch
 * Analyzes multiple sequences at once
 */
app.post('/api/analyze-batch', (req, res) => {
  try {
    const { sequences } = req.body;

    if (!Array.isArray(sequences)) {
      return res.status(400).json({
        error: 'Invalid input: sequences must be an array'
      });
    }

    const results = sequences.map(seq => analyzer.analyze(seq));
    logger.log(`Batch analysis: ${sequences.length} sequences processed`);

    res.json({ results });
  } catch (error) {
    logger.error(`Batch analysis error: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/statistics
 * Returns analysis statistics and history
 */
app.get('/api/statistics', (req, res) => {
  try {
    const stats = analyzer.getStatistics();
    res.json(stats);
  } catch (error) {
    logger.error(`Statistics error: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/clear-history
 * Clears analysis history
 */
app.post('/api/clear-history', (req, res) => {
  try {
    analyzer.analysisHistory = [];
    logger.log('Analysis history cleared');
    res.json({ message: 'History cleared successfully' });
  } catch (error) {
    logger.error(`Clear history error: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * GET /api/documentation
 * Returns API documentation
 */
app.get('/api/documentation', (req, res) => {
  res.json({
    title: 'Echo Chamber API',
    version: '2.0.0',
    endpoints: [
      {
        path: 'POST /api/analyze',
        description: 'Analyze a sequence',
        body: { sequence: [1, 2, 3, 4] },
        response: { pattern: 'arithmetic', predicted: 5 }
      },
      {
        path: 'POST /api/analyze-batch',
        description: 'Analyze multiple sequences',
        body: { sequences: [[1, 2, 3], [2, 4, 6]] },
        response: { results: [] }
      },
      {
        path: 'GET /api/statistics',
        description: 'Get analysis statistics'
      },
      {
        path: 'POST /api/clear-history',
        description: 'Clear analysis history'
      },
      {
        path: 'GET /api/health',
        description: 'Check server health'
      }
    ]
  });
});

/**
 * Serve the web interface
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'public', 'index.html'));
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

/**
 * 404 handler
 */
app.use((req, res) => {
  logger.warn(`404 Not Found: ${req.path}`);
  res.status(404).json({ error: 'Endpoint not found' });
});

/**
 * Start server
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.log(`🔮 Echo Chamber Server started on http://localhost:${PORT}`);
});

module.exports = app;
