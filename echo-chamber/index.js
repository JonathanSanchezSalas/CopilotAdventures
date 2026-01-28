/**
 * Echo Chamber - A Magical Number Sequence Prediction Puzzle
 * 
 * This application solves the Chamber of Echoes adventure by predicting the next
 * number in arithmetic progressions. The application demonstrates sequence analysis,
 * pattern recognition, and memory management (echoes).
 * 
 * Usage: node index.js
 */

// ============================================================================
// MEMORY STORAGE - "Echoes of Past Predictions"
// ============================================================================

/**
 * EchoChamber class manages sequence predictions and memory storage
 * Each prediction is stored as an "echo" - a memory of previous discoveries
 */
class EchoChamber {
  constructor() {
    // Array to store memories of all echoes (predictions made)
    this.echoes = [];
    this.echoCount = 0;
  }

  /**
   * Validates that a sequence forms a valid arithmetic progression
   * An arithmetic progression has a constant difference between consecutive terms
   * 
   * @param {number[]} sequence - The sequence to validate
   * @returns {object} - { isValid: boolean, difference: number, error: string }
   */
  validateSequence(sequence) {
    // Check if sequence exists and has at least 2 numbers
    if (!Array.isArray(sequence) || sequence.length < 2) {
      return {
        isValid: false,
        difference: null,
        error: 'Sequence must contain at least 2 numbers'
      };
    }

    // Check if all elements are numbers
    if (!sequence.every(num => typeof num === 'number' && !isNaN(num))) {
      return {
        isValid: false,
        difference: null,
        error: 'All elements must be valid numbers'
      };
    }

    // Calculate the difference between first two numbers
    const difference = sequence[1] - sequence[0];

    // Verify all consecutive differences are equal
    for (let i = 2; i < sequence.length; i++) {
      const currentDifference = sequence[i] - sequence[i - 1];
      if (currentDifference !== difference) {
        return {
          isValid: false,
          difference: null,
          error: `Not an arithmetic progression. Expected difference of ${difference}, but found ${currentDifference} between positions ${i - 1} and ${i}`
        };
      }
    }

    return {
      isValid: true,
      difference: difference,
      error: null
    };
  }

  /**
   * Predicts the next number in an arithmetic progression
   * 
   * @param {number[]} sequence - The input sequence
   * @returns {object} - { success: boolean, nextNumber: number, echo: object, error: string }
   */
  predictNext(sequence) {
    // Validate the sequence first
    const validation = this.validateSequence(sequence);

    if (!validation.isValid) {
      return {
        success: false,
        nextNumber: null,
        echo: null,
        error: validation.error
      };
    }

    // Get the last number and the common difference
    const lastNumber = sequence[sequence.length - 1];
    const nextNumber = lastNumber + validation.difference;

    // Create an echo (memory) of this prediction
    const echo = {
      echoId: ++this.echoCount,
      timestamp: new Date().toISOString(),
      inputSequence: [...sequence],
      commonDifference: validation.difference,
      predictedNext: nextNumber,
      sequenceLength: sequence.length
    };

    // Store the echo in our memory
    this.echoes.push(echo);

    return {
      success: true,
      nextNumber: nextNumber,
      echo: echo,
      error: null
    };
  }

  /**
   * Retrieves all echoes (memories) from the chamber
   * @returns {array} - Array of all echo predictions
   */
  getAllEchoes() {
    return this.echoes;
  }

  /**
   * Gets statistics about the echoes
   * @returns {object} - Statistics about predictions made
   */
  getEchoStatistics() {
    return {
      totalPredictions: this.echoes.length,
      averageSequenceLength: this.echoes.length > 0
        ? (this.echoes.reduce((sum, e) => sum + e.sequenceLength, 0) / this.echoes.length).toFixed(2)
        : 0,
      allDifferences: this.echoes.map(e => e.commonDifference)
    };
  }

  /**
   * Clears all echoes from memory
   */
  clearEchoes() {
    this.echoes = [];
    this.echoCount = 0;
  }
}

// ============================================================================
// CONSOLE INTERFACE - "The Echo Chamber Experience"
// ============================================================================

/**
 * ConsoleInterface manages all user interactions and display
 * Creates an immersive fantasy experience around the sequence prediction
 */
class ConsoleInterface {
  constructor() {
    this.chamber = new EchoChamber();
  }

  /**
   * Displays the welcome banner and story introduction
   */
  displayWelcome() {
    console.clear();
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║         🔮 WELCOME TO THE CHAMBER OF ECHOES 🔮             ║');
    console.log('║   A Magical Realm of Number Sequences and Prophecies      ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📖 THE LEGEND:');
    console.log('   In the depths of the magical realm, there exists a mystical chamber');
    console.log('   where numbers echo and resonate with ancient patterns. Your task is');
    console.log('   to listen to the echoes, understand the hidden pattern, and predict');
    console.log('   what number shall echo next...\n');

    console.log('✨ RULES OF THE CHAMBER:');
    console.log('   • Each sequence follows a magical law - the difference between');
    console.log('     consecutive numbers remains constant (arithmetic progression)');
    console.log('   • Your role is to discover this hidden difference');
    console.log('   • From it, predict the next number in the sequence');
    console.log('   • All your predictions will be remembered as echoes\n');
  }

  /**
   * Displays the main menu options
   */
  displayMenu() {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('ECHO CHAMBER MENU:');
    console.log('  1) Test with sample sequence [3, 6, 9, 12]');
    console.log('  2) Test with custom sequence');
    console.log('  3) View all echoes (previous predictions)');
    console.log('  4) View echo statistics');
    console.log('  5) Clear all echoes from memory');
    console.log('  6) Run automated tests');
    console.log('  7) Exit the chamber');
    console.log('═══════════════════════════════════════════════════════════════\n');
  }

  /**
   * Tests with the sample sequence from the adventure
   */
  testSampleSequence() {
    console.log('\n🔮 Testing with the sample sequence: [3, 6, 9, 12]');
    console.log('   (Multiples of 3)\n');

    const sampleSequence = [3, 6, 9, 12];
    const result = this.chamber.predictNext(sampleSequence);

    if (result.success) {
      console.log('   ✅ SUCCESS! The pattern recognized!');
      console.log(`   📊 Common difference: ${result.echo.commonDifference}`);
      console.log(`   🎯 Next number in the sequence: ${result.nextNumber}`);
      console.log(`   📝 Echo ID #${result.echo.echoId} recorded in chamber memory\n`);
    } else {
      console.log(`   ❌ ERROR: ${result.error}\n`);
    }
  }

  /**
   * Interactively tests with a custom sequence
   */
  async testCustomSequence() {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      console.log('\n🔮 Enter a custom sequence');
      console.log('   Example: 2 4 6 8 (space-separated numbers)\n');

      rl.question('   Enter your sequence: ', (input) => {
        try {
          // Parse the input
          const sequence = input
            .trim()
            .split(/\s+/)
            .map(num => {
              const parsed = parseFloat(num);
              if (isNaN(parsed)) throw new Error(`"${num}" is not a valid number`);
              return parsed;
            });

          if (sequence.length < 2) {
            console.log('\n   ❌ Please enter at least 2 numbers\n');
            rl.close();
            resolve();
            return;
          }

          const result = this.chamber.predictNext(sequence);

          if (result.success) {
            console.log('\n   ✅ SUCCESS! The pattern recognized!');
            console.log(`   📊 Input sequence: [${sequence.join(', ')}]`);
            console.log(`   📊 Common difference: ${result.echo.commonDifference}`);
            console.log(`   🎯 Next number in the sequence: ${result.nextNumber}`);
            console.log(`   📝 Echo ID #${result.echo.echoId} recorded in chamber memory\n`);
          } else {
            console.log(`\n   ❌ ERROR: ${result.error}\n`);
          }
        } catch (error) {
          console.log(`\n   ❌ Invalid input: ${error.message}\n`);
        }

        rl.close();
        resolve();
      });
    });
  }

  /**
   * Displays all recorded echoes
   */
  displayEchoes() {
    console.log('\n📚 ALL ECHOES IN THE CHAMBER:');

    const echoes = this.chamber.getAllEchoes();

    if (echoes.length === 0) {
      console.log('   (No echoes yet - the chamber is silent...)\n');
      return;
    }

    echoes.forEach((echo, index) => {
      console.log(`\n   Echo #${echo.echoId}:`);
      console.log(`   • Sequence: [${echo.inputSequence.join(', ')}]`);
      console.log(`   • Difference: ${echo.commonDifference}`);
      console.log(`   • Predicted Next: ${echo.predictedNext}`);
      console.log(`   • Recorded: ${new Date(echo.timestamp).toLocaleTimeString()}`);
    });

    console.log('');
  }

  /**
   * Displays statistics about all echoes
   */
  displayStatistics() {
    const stats = this.chamber.getEchoStatistics();

    console.log('\n📊 ECHO CHAMBER STATISTICS:');
    console.log(`   • Total predictions made: ${stats.totalPredictions}`);
    console.log(`   • Average sequence length: ${stats.averageSequenceLength}`);
    console.log(`   • All differences observed: [${stats.allDifferences.join(', ') || 'none yet'}]`);
    console.log('');
  }

  /**
   * Clears all echoes from memory
   */
  clearEchoes() {
    this.chamber.clearEchoes();
    console.log('\n🔄 All echoes have been cleared from the chamber.\n');
  }

  /**
   * Runs automated test cases
   */
  runAutomatedTests() {
    console.log('\n🧪 RUNNING AUTOMATED TESTS:\n');

    const testCases = [
      {
        name: 'Arithmetic progression (difference = 1)',
        sequence: [1, 2, 3, 4, 5],
        expectedNext: 6
      },
      {
        name: 'Arithmetic progression (difference = 2)',
        sequence: [2, 4, 6, 8],
        expectedNext: 10
      },
      {
        name: 'Arithmetic progression (negative difference)',
        sequence: [20, 15, 10, 5],
        expectedNext: 0
      },
      {
        name: 'Arithmetic progression (decimal numbers)',
        sequence: [1.5, 2.5, 3.5, 4.5],
        expectedNext: 5.5
      },
      {
        name: 'Arithmetic progression (difference = 0)',
        sequence: [5, 5, 5, 5],
        expectedNext: 5
      },
      {
        name: 'Single number (should fail)',
        sequence: [5],
        shouldFail: true
      },
      {
        name: 'Not an arithmetic progression (should fail)',
        sequence: [1, 2, 4, 8],
        shouldFail: true
      }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((testCase, index) => {
      const result = this.chamber.predictNext(testCase.sequence);

      if (testCase.shouldFail) {
        if (!result.success) {
          console.log(`   ✅ Test ${index + 1}: ${testCase.name}`);
          console.log(`      └─ Correctly rejected: ${result.error}`);
          passed++;
        } else {
          console.log(`   ❌ Test ${index + 1}: ${testCase.name}`);
          console.log(`      └─ Should have failed but succeeded`);
          failed++;
        }
      } else {
        if (result.success && result.nextNumber === testCase.expectedNext) {
          console.log(`   ✅ Test ${index + 1}: ${testCase.name}`);
          console.log(`      └─ Got ${result.nextNumber} as expected`);
          passed++;
        } else {
          console.log(`   ❌ Test ${index + 1}: ${testCase.name}`);
          if (!result.success) {
            console.log(`      └─ Error: ${result.error}`);
          } else {
            console.log(`      └─ Got ${result.nextNumber}, expected ${testCase.expectedNext}`);
          }
          failed++;
        }
      }
    });

    console.log(`\n   📊 Results: ${passed} passed, ${failed} failed out of ${testCases.length} tests\n`);
  }

  /**
   * Main interactive loop
   */
  async run() {
    const readline = require('readline');

    this.displayWelcome();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const askQuestion = (query) => {
      return new Promise(resolve => rl.question(query, resolve));
    };

    let running = true;

    while (running) {
      this.displayMenu();
      const choice = await askQuestion('Enter your choice (1-7): ');

      switch (choice.trim()) {
        case '1':
          this.testSampleSequence();
          await askQuestion('Press Enter to continue...');
          break;

        case '2':
          rl.close();
          await this.testCustomSequence();
          rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          await askQuestion('Press Enter to continue...');
          break;

        case '3':
          this.displayEchoes();
          await askQuestion('Press Enter to continue...');
          break;

        case '4':
          this.displayStatistics();
          await askQuestion('Press Enter to continue...');
          break;

        case '5':
          this.clearEchoes();
          await askQuestion('Press Enter to continue...');
          break;

        case '6':
          this.runAutomatedTests();
          await askQuestion('Press Enter to continue...');
          break;

        case '7':
          console.log('\n👋 Farewell, seeker. May your sequences ever be arithmetic...\n');
          running = false;
          break;

        default:
          console.log('\n   ❌ Invalid choice. Please enter a number from 1 to 7.\n');
          await askQuestion('Press Enter to continue...');
      }
    }

    rl.close();
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

// Create and run the console interface
const app = new ConsoleInterface();
app.run().catch(console.error);

// Export for testing purposes
module.exports = { EchoChamber, ConsoleInterface };
