/**
 * Advanced Sequence Analyzer
 * Handles multiple sequence patterns: arithmetic, geometric, and polynomial progressions
 * 
 * This module extends the basic Echo Chamber functionality with sophisticated
 * pattern recognition for various mathematical sequences.
 */

/**
 * Represents a detected sequence pattern
 */
class SequencePattern {
  constructor(type, difference, multiplier = null, coefficients = null, confidence = 1.0) {
    this.type = type; // 'arithmetic', 'geometric', 'polynomial'
    this.difference = difference; // For arithmetic
    this.multiplier = multiplier; // For geometric
    this.coefficients = coefficients; // For polynomial: [a, b, c] for ax^2 + bx + c
    this.confidence = confidence; // 0-1 confidence score
  }
}

/**
 * Advanced Sequence Analyzer
 * Detects and analyzes various sequence patterns
 */
class SequenceAnalyzer {
  constructor() {
    this.patterns = [];
    this.analysisHistory = [];
  }

  /**
   * Analyzes a sequence and detects its pattern
   * @param {number[]} sequence - The input sequence
   * @returns {object} - Analysis result with pattern, prediction, and metadata
   */
  analyze(sequence) {
    if (!Array.isArray(sequence) || sequence.length < 2) {
      return {
        success: false,
        pattern: null,
        predicted: null,
        error: 'Sequence must contain at least 2 numbers'
      };
    }

    // Validate all elements are numbers
    if (!sequence.every(num => typeof num === 'number' && !isNaN(num))) {
      return {
        success: false,
        pattern: null,
        predicted: null,
        error: 'All elements must be valid numbers'
      };
    }

    // Try detecting patterns in order of likelihood
    let detectedPattern = this.detectArithmetic(sequence);
    if (detectedPattern) return { success: true, ...detectedPattern };

    detectedPattern = this.detectGeometric(sequence);
    if (detectedPattern) return { success: true, ...detectedPattern };

    detectedPattern = this.detectPolynomial(sequence);
    if (detectedPattern) return { success: true, ...detectedPattern };

    return {
      success: false,
      pattern: null,
      predicted: null,
      error: 'Could not detect a known pattern in this sequence'
    };
  }

  /**
   * Detects arithmetic progressions (constant difference)
   * @private
   */
  detectArithmetic(sequence) {
    const difference = sequence[1] - sequence[0];

    // Verify all consecutive differences are equal
    for (let i = 2; i < sequence.length; i++) {
      if (sequence[i] - sequence[i - 1] !== difference) {
        return null;
      }
    }

    const predicted = sequence[sequence.length - 1] + difference;
    const pattern = new SequencePattern('arithmetic', difference);

    return {
      pattern: pattern,
      predicted: predicted,
      nextFive: this.predictNextFive(sequence, 'arithmetic', difference)
    };
  }

  /**
   * Detects geometric progressions (constant ratio)
   * @private
   */
  detectGeometric(sequence) {
    // Skip if any element is zero (can't have meaningful ratio)
    if (sequence.some(n => n === 0)) {
      return null;
    }

    const ratio = sequence[1] / sequence[0];

    // Verify all consecutive ratios are equal (with floating point tolerance)
    const tolerance = 1e-10;
    for (let i = 2; i < sequence.length; i++) {
      const currentRatio = sequence[i] / sequence[i - 1];
      if (Math.abs(currentRatio - ratio) > tolerance) {
        return null;
      }
    }

    const predicted = sequence[sequence.length - 1] * ratio;
    const pattern = new SequencePattern('geometric', null, ratio);

    return {
      pattern: pattern,
      predicted: predicted,
      nextFive: this.predictNextFive(sequence, 'geometric', null, ratio)
    };
  }

  /**
   * Detects polynomial sequences (quadratic, cubic, etc.)
   * @private
   */
  detectPolynomial(sequence) {
    // For polynomial detection, check differences of differences
    if (sequence.length < 3) return null;

    // Calculate first differences
    const firstDifferences = [];
    for (let i = 1; i < sequence.length; i++) {
      firstDifferences.push(sequence[i] - sequence[i - 1]);
    }

    // Check if second differences are constant (quadratic)
    if (firstDifferences.length >= 2) {
      const secondDifferences = [];
      for (let i = 1; i < firstDifferences.length; i++) {
        secondDifferences.push(firstDifferences[i] - firstDifferences[i - 1]);
      }

      // If second differences are constant, it's quadratic
      if (secondDifferences.length >= 2) {
        const secondDiff = secondDifferences[0];
        const isQuadratic = secondDifferences.every(d => Math.abs(d - secondDiff) < 1e-10);

        if (isQuadratic) {
          const nextFirstDiff = firstDifferences[firstDifferences.length - 1] + secondDiff;
          const predicted = sequence[sequence.length - 1] + nextFirstDiff;
          const pattern = new SequencePattern('polynomial', null, null, [secondDiff / 2]);

          return {
            pattern: pattern,
            predicted: predicted,
            nextFive: this.predictNextFivePolynomial(sequence, firstDifferences, secondDiff)
          };
        }
      }
    }

    return null;
  }

  /**
   * Predicts the next 5 numbers for arithmetic/geometric sequences
   * @private
   */
  predictNextFive(sequence, type, diff, ratio = null) {
    const predictions = [];
    let lastValue = sequence[sequence.length - 1];

    for (let i = 0; i < 5; i++) {
      if (type === 'arithmetic') {
        lastValue += diff;
      } else if (type === 'geometric') {
        lastValue *= ratio;
      }
      predictions.push(Math.round(lastValue * 10000) / 10000); // Round to 4 decimals
    }

    return predictions;
  }

  /**
   * Predicts next 5 numbers for polynomial sequences
   * @private
   */
  predictNextFivePolynomial(sequence, firstDiffs, secondDiff) {
    const predictions = [];
    let lastValue = sequence[sequence.length - 1];
    let lastFirstDiff = firstDiffs[firstDiffs.length - 1];

    for (let i = 0; i < 5; i++) {
      lastFirstDiff += secondDiff;
      lastValue += lastFirstDiff;
      predictions.push(Math.round(lastValue * 10000) / 10000);
    }

    return predictions;
  }

  /**
   * Gets statistics about detected patterns
   */
  getStatistics() {
    const patterns = {};
    this.patterns.forEach(p => {
      patterns[p.type] = (patterns[p.type] || 0) + 1;
    });

    return {
      totalAnalyzed: this.patterns.length,
      patternBreakdown: patterns,
      analysisHistory: this.analysisHistory
    };
  }

  /**
   * Stores an analysis in history
   */
  recordAnalysis(sequence, pattern, predicted) {
    this.analysisHistory.push({
      sequence: [...sequence],
      pattern: pattern.type,
      predicted: predicted,
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = { SequenceAnalyzer, SequencePattern };
