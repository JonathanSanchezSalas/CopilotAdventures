/**
 * Echo Chamber Web Application
 * Frontend JavaScript for interactive sequence analysis
 */

class EchoChamberApp {
  constructor() {
    this.currentAnalysis = null;
    this.analysisHistory = [];
    this.chart = null;
    this.patternChart = null;
    this.initializeElements();
    this.attachEventListeners();
    this.checkServerHealth();
  }

  /**
   * Initialize DOM elements
   */
  initializeElements() {
    this.sequenceInput = document.getElementById('sequenceInput');
    this.analyzeBtn = document.getElementById('analyzeBtn');
    this.clearBtn = document.getElementById('clearBtn');
    this.exampleBtn = document.getElementById('exampleBtn');
    this.resultsSection = document.getElementById('resultsSection');
    this.patternType = document.getElementById('patternType');
    this.nextNumber = document.getElementById('nextNumber');
    this.confidence = document.getElementById('confidence');
    this.nextFiveList = document.getElementById('nextFive');
    this.patternInfo = document.getElementById('patternInfo');
    this.chartType = document.getElementById('chartType');
    this.historyList = document.getElementById('historyList');
    this.historyCount = document.getElementById('historyCount');
    this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
    this.navButtons = document.querySelectorAll('.nav-btn');
    this.tabContents = document.querySelectorAll('.tab-content');
    this.serverStatus = document.getElementById('serverStatus');
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    this.analyzeBtn.addEventListener('click', () => this.analyzeSequence());
    this.clearBtn.addEventListener('click', () => this.clearInput());
    this.exampleBtn.addEventListener('click', () => this.loadRandomExample());
    this.chartType.addEventListener('change', () => this.updateChart());
    this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
    
    // Tab navigation
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn));
    });

    // Example cards
    document.querySelectorAll('.example-card').forEach(card => {
      card.addEventListener('click', () => {
        const sequence = card.dataset.sequence;
        this.sequenceInput.value = sequence;
        this.analyzeSequence();
      });
    });

    // Enter key on input
    this.sequenceInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.analyzeSequence();
      }
    });
  }

  /**
   * Parse sequence input
   */
  parseSequence(input) {
    return input
      .trim()
      .split(/[,\s]+/)
      .filter(s => s.length > 0)
      .map(s => parseFloat(s))
      .filter(n => !isNaN(n));
  }

  /**
   * Analyze the entered sequence
   */
  async analyzeSequence() {
    const input = this.sequenceInput.value;
    if (!input.trim()) {
      alert('Please enter a sequence');
      return;
    }

    const sequence = this.parseSequence(input);
    if (sequence.length < 2) {
      alert('Please enter at least 2 numbers');
      return;
    }

    try {
      this.analyzeBtn.disabled = true;
      this.analyzeBtn.textContent = 'Analyzing...';

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sequence })
      });

      if (!response.ok) {
        const error = await response.json();
        alert('Error: ' + error.error);
        return;
      }

      const result = await response.json();
      this.currentAnalysis = result;
      this.displayResults(sequence, result);
      this.addToHistory(sequence, result);
      this.updateStatistics();
      this.updateChart();
    } catch (error) {
      alert('Error analyzing sequence: ' + error.message);
    } finally {
      this.analyzeBtn.disabled = false;
      this.analyzeBtn.textContent = 'Analyze Sequence';
    }
  }

  /**
   * Display analysis results
   */
  displayResults(sequence, result) {
    this.resultsSection.classList.remove('results-hidden');

    // Update pattern type
    const patternMap = {
      'arithmetic': '🔢 Arithmetic Progression',
      'geometric': '📈 Geometric Progression',
      'polynomial': '📊 Polynomial Sequence'
    };
    this.patternType.textContent = patternMap[result.pattern.type] || result.pattern.type;

    // Update next number
    this.nextNumber.textContent = Math.round(result.predicted * 10000) / 10000;

    // Update confidence
    this.confidence.textContent = (result.pattern.confidence * 100).toFixed(0) + '%';

    // Display next 5 predictions
    this.nextFiveList.innerHTML = result.nextFive
      .map(n => `<div class="prediction-item">${Math.round(n * 10000) / 10000}</div>`)
      .join('');

    // Display pattern details
    let patternDetails = `<strong>Pattern Type:</strong> ${result.pattern.type}<br>`;
    
    if (result.pattern.type === 'arithmetic') {
      patternDetails += `<strong>Common Difference:</strong> ${result.pattern.difference}<br>`;
      patternDetails += `<strong>Formula:</strong> a(n) = a(1) + (n-1)d<br>`;
      patternDetails += `<strong>Last Element:</strong> ${sequence[sequence.length - 1]}<br>`;
      patternDetails += `<strong>Next Element:</strong> ${result.predicted}`;
    } else if (result.pattern.type === 'geometric') {
      patternDetails += `<strong>Common Ratio:</strong> ${result.pattern.multiplier.toFixed(4)}<br>`;
      patternDetails += `<strong>Formula:</strong> a(n) = a(1) × r^(n-1)<br>`;
      patternDetails += `<strong>Last Element:</strong> ${sequence[sequence.length - 1]}<br>`;
      patternDetails += `<strong>Next Element:</strong> ${Math.round(result.predicted * 10000) / 10000}`;
    } else if (result.pattern.type === 'polynomial') {
      patternDetails += `<strong>Polynomial Type:</strong> Quadratic or Higher<br>`;
      patternDetails += `<strong>Detected through:</strong> Difference Table Analysis<br>`;
      patternDetails += `<strong>Last Element:</strong> ${sequence[sequence.length - 1]}<br>`;
      patternDetails += `<strong>Next Element:</strong> ${Math.round(result.predicted * 10000) / 10000}`;
    }

    this.patternInfo.innerHTML = patternDetails;

    // Scroll to results
    this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Add to history
   */
  addToHistory(sequence, result) {
    this.analysisHistory.unshift({
      sequence: sequence,
      pattern: result.pattern.type,
      predicted: result.predicted,
      timestamp: new Date().toLocaleTimeString()
    });

    if (this.analysisHistory.length > 50) {
      this.analysisHistory.pop();
    }

    this.updateHistoryDisplay();
  }

  /**
   * Update history display
   */
  updateHistoryDisplay() {
    if (this.analysisHistory.length === 0) {
      this.historyList.innerHTML = '<p class="empty-message">No analyses yet. Perform some sequence analyses!</p>';
      this.historyCount.textContent = '0 analyses';
      return;
    }

    this.historyList.innerHTML = this.analysisHistory
      .map((item, index) => `
        <div class="history-item">
          <div class="history-item-sequence">[${item.sequence.join(', ')}]</div>
          <div class="history-item-details">
            <strong>Pattern:</strong> ${item.pattern} | 
            <strong>Next:</strong> ${Math.round(item.predicted * 10000) / 10000} | 
            <strong>Time:</strong> ${item.timestamp}
          </div>
        </div>
      `)
      .join('');

    this.historyCount.textContent = `${this.analysisHistory.length} analysis/analyses`;
  }

  /**
   * Clear input
   */
  clearInput() {
    this.sequenceInput.value = '';
    this.sequenceInput.focus();
  }

  /**
   * Load random example
   */
  loadRandomExample() {
    const examples = [
      '1,2,3,4,5',
      '2,4,8,16',
      '1,4,9,16,25',
      '3,6,9,12'
    ];
    const random = examples[Math.floor(Math.random() * examples.length)];
    this.sequenceInput.value = random;
    this.analyzeSequence();
  }

  /**
   * Update chart
   */
  updateChart() {
    if (!this.currentAnalysis) return;

    const sequence = this.parseSequence(this.sequenceInput.value);
    const nextValue = this.currentAnalysis.predicted;
    const displaySequence = [...sequence, nextValue];
    const labels = displaySequence.map((_, i) => `Position ${i + 1}`);

    const ctx = document.getElementById('sequenceChart');
    
    if (this.chart) {
      this.chart.destroy();
    }

    const chartType = this.chartType.value;
    const config = {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Sequence Values',
          data: displaySequence,
          borderColor: '#6f3aff',
          backgroundColor: chartType === 'scatter' ? 'rgba(111, 58, 255, 0.5)' : 'rgba(111, 58, 255, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: '#00d4ff',
          pointBorderColor: '#6f3aff',
          pointRadius: 6,
          pointHoverRadius: 8,
          fill: chartType !== 'scatter',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#f1f5f9'
            }
          }
        },
        scales: {
          y: {
            ticks: {
              color: '#cbd5e1'
            },
            grid: {
              color: 'rgba(51, 65, 85, 0.2)'
            }
          },
          x: {
            ticks: {
              color: '#cbd5e1'
            },
            grid: {
              color: 'rgba(51, 65, 85, 0.2)'
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);

    // Update statistics
    this.updateChartStatistics(displaySequence);
  }

  /**
   * Update chart statistics
   */
  updateChartStatistics(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const avg = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2);
    const sum = data.reduce((a, b) => a + b, 0).toFixed(2);

    document.getElementById('minValue').textContent = min;
    document.getElementById('maxValue').textContent = max;
    document.getElementById('avgValue').textContent = avg;
    document.getElementById('sumValue').textContent = sum;
  }

  /**
   * Update statistics
   */
  async updateStatistics() {
    try {
      const response = await fetch('/api/statistics');
      const stats = await response.json();

      document.getElementById('totalAnalyses').textContent = stats.totalAnalyzed;
      document.getElementById('arithmeticCount').textContent = stats.patternBreakdown.arithmetic || 0;
      document.getElementById('geometricCount').textContent = stats.patternBreakdown.geometric || 0;
      document.getElementById('polynomialCount').textContent = stats.patternBreakdown.polynomial || 0;

      // Update pattern distribution chart
      this.updatePatternChart(stats.patternBreakdown);
    } catch (error) {
      console.error('Error updating statistics:', error);
    }
  }

  /**
   * Update pattern distribution chart
   */
  updatePatternChart(breakdown) {
    const ctx = document.getElementById('patternChart');
    
    if (this.patternChart) {
      this.patternChart.destroy();
    }

    const data = [
      breakdown.arithmetic || 0,
      breakdown.geometric || 0,
      breakdown.polynomial || 0
    ];

    this.patternChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Arithmetic', 'Geometric', 'Polynomial'],
        datasets: [{
          data: data,
          backgroundColor: [
            '#6f3aff',
            '#ff6b9d',
            '#00d4ff'
          ],
          borderColor: '#1e293b',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#f1f5f9'
            }
          }
        }
      }
    });
  }

  /**
   * Clear history
   */
  clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
      this.analysisHistory = [];
      this.updateHistoryDisplay();
      
      fetch('/api/clear-history', { method: 'POST' })
        .catch(error => console.error('Error clearing history:', error));
    }
  }

  /**
   * Switch tab
   */
  switchTab(button) {
    // Update active button
    this.navButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Update active tab
    const tabId = button.getAttribute('data-tab');
    this.tabContents.forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    // Update chart if switching to visualizer
    if (tabId === 'visualizer' && this.currentAnalysis) {
      setTimeout(() => this.updateChart(), 100);
    }

    // Update statistics if switching to stats
    if (tabId === 'stats') {
      this.updateStatistics();
    }
  }

  /**
   * Check server health
   */
  checkServerHealth() {
    fetch('/api/health')
      .then(response => response.json())
      .then(data => {
        this.serverStatus.textContent = '🟢 Online';
        this.serverStatus.style.background = 'rgba(16, 185, 129, 0.3)';
      })
      .catch(error => {
        this.serverStatus.textContent = '🔴 Offline';
        this.serverStatus.style.background = 'rgba(239, 68, 68, 0.3)';
        console.error('Server health check failed:', error);
      });
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new EchoChamberApp();
});
