# Echo Chamber - Magical Number Sequence Prediction Application

## 📖 Overview

**Echo Chamber** is an interactive Node.js application that solves the "Chamber of Echoes" puzzle from the CopilotAdventures educational series. The application demonstrates sequence analysis, pattern recognition, and memory management through a fantasy-themed interface.

### Core Concept
The application predicts the next number in arithmetic progressions (sequences with a constant difference between consecutive terms). Each prediction is recorded as an "echo" — a memory of the discovery.

## 🎯 Features

### ✅ Core Functionality
- **Sequence Prediction**: Identifies arithmetic progressions and calculates the next number
- **Input Validation**: Validates that sequences form valid arithmetic progressions
- **Error Handling**: Comprehensive error messages for edge cases
- **Echo Memory**: Stores all predictions with timestamps and metadata
- **Statistics**: Tracks and displays prediction statistics

### ✅ User Interface
- **Immersive Story**: Fantasy-themed narrative and interface
- **Interactive Menu**: 7 options for different operations
- **Clear Output**: Well-formatted console output with visual indicators
- **Test Suite**: Automated testing with 7 comprehensive test cases

## 🚀 Getting Started

### Prerequisites
- Node.js (v12 or higher)
- npm (usually installed with Node.js)

### Installation

1. **Navigate to the echo-chamber directory**:
   ```bash
   cd echo-chamber
   ```

2. **No external dependencies needed** - this application uses only Node.js built-in modules

### Running the Application

```bash
node index.js
```

This launches the interactive Echo Chamber experience with a welcome banner and menu system.

## 📋 Usage Guide

### Main Menu Options

#### Option 1: Test with Sample Sequence
Tests the application with the provided sample sequence: `[3, 6, 9, 12]`
- **Expected Output**: Next number is `15`
- **Common Difference**: `3`
- This validates that the basic functionality works correctly

#### Option 2: Test with Custom Sequence
Enter your own sequence to test the prediction engine:
- **Input Format**: Space-separated numbers (e.g., `2 4 6 8`)
- **Requirements**: At least 2 numbers
- **Validation**: Checks that the sequence forms an arithmetic progression
- **Output**: Predicted next number and common difference

#### Option 3: View All Echoes
Displays all previous predictions stored in the chamber's memory:
- Shows each echo with its ID, sequence, and prediction
- Includes timestamps of when each echo was recorded
- Helpful for reviewing prediction history

#### Option 4: View Echo Statistics
Shows aggregate statistics about all predictions:
- Total number of predictions made
- Average sequence length
- List of all observed differences

#### Option 5: Clear All Echoes
Resets the chamber's memory, removing all recorded predictions

#### Option 6: Run Automated Tests
Executes a comprehensive test suite covering:
- Positive arithmetic progressions (increasing sequences)
- Negative differences (decreasing sequences)
- Decimal numbers
- Zero differences (constant sequences)
- Error cases (invalid sequences)

#### Option 7: Exit the Chamber
Cleanly exits the application

## 🧪 Test Cases

The automated test suite includes 7 comprehensive test cases:

| Test # | Name | Sequence | Expected Next | Type |
|--------|------|----------|---------------|------|
| 1 | Difference = 1 | [1, 2, 3, 4, 5] | 6 | ✅ Pass |
| 2 | Difference = 2 | [2, 4, 6, 8] | 10 | ✅ Pass |
| 3 | Negative difference | [20, 15, 10, 5] | 0 | ✅ Pass |
| 4 | Decimal numbers | [1.5, 2.5, 3.5, 4.5] | 5.5 | ✅ Pass |
| 5 | Difference = 0 | [5, 5, 5, 5] | 5 | ✅ Pass |
| 6 | Single number (invalid) | [5] | N/A | ❌ Fail (expected) |
| 7 | Not arithmetic (invalid) | [1, 2, 4, 8] | N/A | ❌ Fail (expected) |

### Running Tests

To run the full automated test suite:
1. Launch the application: `node index.js`
2. Select option **6** from the menu
3. Review the test results

## 📊 Application Architecture

### Core Classes

#### `EchoChamber`
Manages all sequence prediction logic and memory storage.

**Key Methods:**
- `validateSequence(sequence)`: Validates arithmetic progression
- `predictNext(sequence)`: Predicts the next number
- `getAllEchoes()`: Retrieves all predictions
- `getEchoStatistics()`: Returns prediction statistics
- `clearEchoes()`: Resets memory

**Memory Structure:**
```javascript
{
  echoId: number,              // Unique echo identifier
  timestamp: string,           // ISO timestamp
  inputSequence: number[],     // Original sequence
  commonDifference: number,    // Constant difference
  predictedNext: number,       // Predicted next number
  sequenceLength: number       // Length of input sequence
}
```

#### `ConsoleInterface`
Manages all user interactions and display formatting.

**Key Methods:**
- `displayWelcome()`: Shows welcome banner
- `displayMenu()`: Shows menu options
- `testSampleSequence()`: Tests with [3, 6, 9, 12]
- `testCustomSequence()`: Interactive custom sequence testing
- `displayEchoes()`: Shows all recorded predictions
- `displayStatistics()`: Shows prediction statistics
- `runAutomatedTests()`: Executes test suite
- `run()`: Main interactive loop

## 🔍 Example Usage

### Example 1: Sample Sequence
```
🔮 Testing with the sample sequence: [3, 6, 9, 12]
   (Multiples of 3)

   ✅ SUCCESS! The pattern recognized!
   📊 Common difference: 3
   🎯 Next number in the sequence: 15
   📝 Echo ID #1 recorded in chamber memory
```

### Example 2: Custom Sequence
```
Input: 10 20 30 40
Output:
   ✅ SUCCESS! The pattern recognized!
   📊 Input sequence: [10, 20, 30, 40]
   📊 Common difference: 10
   🎯 Next number in the sequence: 50
   📝 Echo ID #2 recorded in chamber memory
```

### Example 3: Invalid Input
```
Input: 1 2 4 8
Output:
   ❌ ERROR: Not an arithmetic progression. Expected difference of 1, but found 2 between positions 1 and 2
```

## 🛠️ Technical Details

### Validation Logic
The sequence validator checks:
1. ✅ Sequence exists and has at least 2 elements
2. ✅ All elements are valid numbers
3. ✅ Consecutive differences are constant
4. ✅ Returns detailed error messages for failures

### Error Handling
Comprehensive error handling for:
- Empty or insufficient sequences
- Non-numeric input
- Non-arithmetic progressions
- Invalid user input in menus
- Malformed input strings

### Data Persistence
- Echoes are stored in memory during the session
- Use option 3 to view all recorded echoes
- Use option 5 to clear echoes if needed
- Data is lost when the application exits (for future enhancement: could add file-based persistence)

## 📈 Potential Enhancements

Future improvements could include:
- Save/load echoes to JSON files
- Support for geometric progressions
- Sequence visualization with ASCII charts
- Difficulty levels for custom sequences
- Leaderboard system
- Machine learning for pattern detection
- Web-based interface
- Multi-user support

## 🎓 Educational Value

This application teaches:
- **Pattern Recognition**: Identifying arithmetic progressions
- **Input Validation**: Ensuring data integrity
- **Object-Oriented Programming**: Class design and methods
- **Array Manipulation**: Working with sequences
- **Error Handling**: Comprehensive exception management
- **User Interface Design**: Console-based interactive applications
- **Testing Methodology**: Automated test suite creation
- **Memory Management**: Storing and retrieving data

## 📝 Code Documentation

The code includes extensive inline comments explaining:
- Class and method purposes
- Algorithm logic
- Edge cases and validations
- Parameter descriptions
- Return value structures
- Fantasy-themed narrative elements

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Command not found | Ensure Node.js is installed: `node --version` |
| Menu not responding | Press Enter after selecting an option |
| Input not recognized | Ensure space-separated numbers with no special characters |
| Memory full | Use option 5 to clear echoes if many predictions were made |

## 📄 File Structure

```
echo-chamber/
├── index.js              # Main application file
├── README.md             # This file
└── package.json          # (Optional) For npm configuration
```

## 🎮 Tips for Playing

1. **Start Simple**: Begin with the sample sequence to understand how it works
2. **Experiment**: Try different progressions with option 2
3. **Explore**: Use option 3 to see your prediction history (echoes)
4. **Test Edge Cases**: Try decimal numbers, negative differences, zero differences
5. **Challenge Yourself**: Create sequences others couldn't predict
6. **Run Tests**: Use option 6 to verify all features work correctly

## 📞 Support

For questions or issues:
1. Check the Troubleshooting section above
2. Review the inline code comments in index.js
3. Ensure you're using Node.js v12 or higher
4. Test with the sample sequence first

## 🌟 Credits

This application is part of the **CopilotAdventures** educational series, designed to teach GitHub Copilot's interaction modes through fantasy-themed coding challenges.

---

**Happy echoing! May your sequences ever be arithmetic! 🔮✨**
