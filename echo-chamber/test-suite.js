/**
 * Advanced Test Suite for Echo Chamber
 * Comprehensive testing for all sequence patterns
 */

const { SequenceAnalyzer } = require('./SequenceAnalyzer');

class TestSuite {
  constructor() {
    this.analyzer = new SequenceAnalyzer();
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('\n' + '='.repeat(70));
    console.log('🧪 ADVANCED ECHO CHAMBER TEST SUITE');
    console.log('='.repeat(70) + '\n');

    this.testArithmeticProgressions();
    this.testGeometricProgressions();
    this.testPolynomialSequences();
    this.testEdgeCases();
    this.testPerformance();
    this.testErrorHandling();

    this.printResults();
  }

  /**
   * Test arithmetic progressions
   */
  testArithmeticProgressions() {
    console.log('📝 Testing Arithmetic Progressions...\n');

    const testCases = [
      {
        name: 'Simple +1',
        sequence: [1, 2, 3, 4, 5],
        expectedPattern: 'arithmetic',
        expectedNext: 6
      },
      {
        name: 'Difference of 2',
        sequence: [2, 4, 6, 8, 10],
        expectedPattern: 'arithmetic',
        expectedNext: 12
      },
      {
        name: 'Negative difference',
        sequence: [100, 75, 50, 25, 0],
        expectedPattern: 'arithmetic',
        expectedNext: -25
      },
      {
        name: 'Large numbers',
        sequence: [1000000, 2000000, 3000000],
        expectedPattern: 'arithmetic',
        expectedNext: 4000000
      },
      {
        name: 'Decimal progression',
        sequence: [0.5, 1.0, 1.5, 2.0, 2.5],
        expectedPattern: 'arithmetic',
        expectedNext: 3.0
      },
      {
        name: 'Negative numbers',
        sequence: [-5, -3, -1, 1, 3],
        expectedPattern: 'arithmetic',
        expectedNext: 5
      },
      {
        name: 'Zero difference',
        sequence: [7, 7, 7, 7],
        expectedPattern: 'arithmetic',
        expectedNext: 7
      }
    ];

    testCases.forEach(testCase => {
      this.runTest(testCase);
    });

    console.log('');
  }

  /**
   * Test geometric progressions
   */
  testGeometricProgressions() {
    console.log('📈 Testing Geometric Progressions...\n');

    const testCases = [
      {
        name: 'Ratio of 2',
        sequence: [1, 2, 4, 8, 16],
        expectedPattern: 'geometric',
        expectedNext: 32
      },
      {
        name: 'Ratio of 3',
        sequence: [2, 6, 18, 54],
        expectedPattern: 'geometric',
        expectedNext: 162
      },
      {
        name: 'Fractional ratio',
        sequence: [16, 8, 4, 2, 1],
        expectedPattern: 'geometric',
        expectedNext: 0.5
      },
      {
        name: 'Negative ratio',
        sequence: [1, -2, 4, -8, 16],
        expectedPattern: 'geometric',
        expectedNext: -32
      },
      {
        name: 'Large ratio',
        sequence: [1, 10, 100, 1000],
        expectedPattern: 'geometric',
        expectedNext: 10000
      }
    ];

    testCases.forEach(testCase => {
      this.runTest(testCase);
    });

    console.log('');
  }

  /**
   * Test polynomial sequences
   */
  testPolynomialSequences() {
    console.log('📊 Testing Polynomial Sequences...\n');

    const testCases = [
      {
        name: 'Perfect squares',
        sequence: [1, 4, 9, 16, 25],
        expectedPattern: 'polynomial',
        expectedNext: 36
      },
      {
        name: 'Cubes',
        sequence: [1, 8, 27, 64],
        expectedPattern: 'polynomial',
        expectedNext: 125
      },
      {
        name: 'Triangular numbers',
        sequence: [1, 3, 6, 10, 15],
        expectedPattern: 'polynomial',
        expectedNext: 21
      }
    ];

    testCases.forEach(testCase => {
      this.runTest(testCase);
    });

    console.log('');
  }

  /**
   * Test edge cases
   */
  testEdgeCases() {
    console.log('⚠️ Testing Edge Cases...\n');

    // Valid edge cases
    const validCases = [
      {
        name: 'Minimum length (2 elements)',
        sequence: [1, 2],
        expectedPattern: 'arithmetic',
        expectedNext: 3
      },
      {
        name: 'Very small decimals',
        sequence: [0.0001, 0.0002, 0.0003],
        expectedPattern: 'arithmetic',
        expectedNext: 0.0004
      },
      {
        name: 'Mixed positive and negative',
        sequence: [-2, 0, 2, 4, 6],
        expectedPattern: 'arithmetic',
        expectedNext: 8
      }
    ];

    validCases.forEach(testCase => {
      this.runTest(testCase);
    });

    // Invalid edge cases (should fail)
    const invalidCases = [
      {
        name: 'Single element',
        sequence: [5],
        shouldFail: true
      },
      {
        name: 'Empty array',
        sequence: [],
        shouldFail: true
      },
      {
        name: 'Contains non-number',
        sequence: [1, 2, 'three'],
        shouldFail: true
      },
      {
        name: 'Not arithmetic or geometric',
        sequence: [1, 2, 4, 7, 11],
        shouldFail: true
      }
    ];

    invalidCases.forEach(testCase => {
      this.runInvalidTest(testCase);
    });

    console.log('');
  }

  /**
   * Test performance
   */
  testPerformance() {
    console.log('⚡ Testing Performance...\n');

    const sizes = [10, 100, 1000, 10000];

    sizes.forEach(size => {
      const sequence = Array.from({ length: size }, (_, i) => i + 1);
      
      const startTime = process.hrtime.bigint();
      const result = this.analyzer.analyze(sequence);
      const endTime = process.hrtime.bigint();

      const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds

      const passed = result.success;
      const test = {
        name: `Sequence of ${size} elements`,
        duration: duration + 'ms',
        passed: passed
      };

      if (passed) {
        this.results.passed++;
        console.log(`  ✅ ${test.name}: ${duration.toFixed(3)}ms`);
      } else {
        this.results.failed++;
        console.log(`  ❌ ${test.name}: FAILED`);
      }

      this.results.tests.push(test);
    });

    console.log('');
  }

  /**
   * Test error handling
   */
  testErrorHandling() {
    console.log('🛡️ Testing Error Handling...\n');

    const errorCases = [
      {
        name: 'Null input',
        sequence: null,
        shouldFail: true
      },
      {
        name: 'Undefined input',
        sequence: undefined,
        shouldFail: true
      },
      {
        name: 'String input',
        sequence: 'not an array',
        shouldFail: true
      },
      {
        name: 'NaN values',
        sequence: [1, NaN, 3],
        shouldFail: true
      },
      {
        name: 'Infinity values',
        sequence: [1, Infinity, 3],
        shouldFail: true
      }
    ];

    errorCases.forEach(testCase => {
      try {
        const result = this.analyzer.analyze(testCase.sequence);
        
        if (testCase.shouldFail && !result.success) {
          this.results.passed++;
          console.log(`  ✅ ${testCase.name}: Correctly handled error`);
        } else if (!testCase.shouldFail && result.success) {
          this.results.passed++;
          console.log(`  ✅ ${testCase.name}: Successfully analyzed`);
        } else {
          this.results.failed++;
          console.log(`  ❌ ${testCase.name}: FAILED`);
        }

        this.results.tests.push({
          name: testCase.name,
          passed: (testCase.shouldFail && !result.success) || (!testCase.shouldFail && result.success)
        });
      } catch (error) {
        this.results.failed++;
        console.log(`  ❌ ${testCase.name}: Threw exception`);
        this.results.tests.push({
          name: testCase.name,
          passed: false
        });
      }
    });

    console.log('');
  }

  /**
   * Run a single test case
   */
  runTest(testCase) {
    const result = this.analyzer.analyze(testCase.sequence);

    const patternMatches = result.success && result.pattern.type === testCase.expectedPattern;
    const nextMatches = Math.abs(result.predicted - testCase.expectedNext) < 0.0001;
    const passed = patternMatches && nextMatches;

    if (passed) {
      this.results.passed++;
      console.log(`  ✅ ${testCase.name}`);
    } else {
      this.results.failed++;
      console.log(`  ❌ ${testCase.name}`);
      if (!patternMatches) {
        console.log(`     Expected pattern: ${testCase.expectedPattern}, got: ${result.pattern?.type}`);
      }
      if (!nextMatches) {
        console.log(`     Expected next: ${testCase.expectedNext}, got: ${result.predicted}`);
      }
    }

    this.results.tests.push({
      name: testCase.name,
      passed: passed
    });
  }

  /**
   * Run a test that should fail
   */
  runInvalidTest(testCase) {
    const result = this.analyzer.analyze(testCase.sequence);
    const passed = !result.success;

    if (passed) {
      this.results.passed++;
      console.log(`  ✅ ${testCase.name}: Correctly rejected`);
    } else {
      this.results.failed++;
      console.log(`  ❌ ${testCase.name}: Should have failed but succeeded`);
    }

    this.results.tests.push({
      name: testCase.name,
      passed: passed
    });
  }

  /**
   * Print test results
   */
  printResults() {
    console.log('='.repeat(70));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(70));
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📈 Total: ${this.results.passed + this.results.failed}`);
    console.log(`📌 Success Rate: ${((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(1)}%`);
    console.log('='.repeat(70) + '\n');

    if (this.results.failed === 0) {
      console.log('🎉 ALL TESTS PASSED! 🎉\n');
    }
  }
}

// Run tests if executed directly
if (require.main === module) {
  const suite = new TestSuite();
  suite.runAllTests();
}

module.exports = TestSuite;
