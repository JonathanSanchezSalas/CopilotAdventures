/**
 * Logger Utility
 * Provides logging functionality with timestamps and levels
 */

class Logger {
  constructor(level = 'info') {
    this.level = level;
    this.levels = { debug: 0, info: 1, warn: 2, error: 3 };
    this.logs = [];
  }

  /**
   * Formats a log message with timestamp
   * @private
   */
  formatMessage(message, levelName) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${levelName.toUpperCase()}] ${message}`;
  }

  /**
   * Logs a message with a given level
   * @private
   */
  logMessage(message, levelName) {
    const formatted = this.formatMessage(message, levelName);
    this.logs.push(formatted);

    // Also log to console
    const levelNum = this.levels[levelName] || this.levels.info;
    const configLevel = this.levels[this.level] || this.levels.info;

    if (levelNum >= configLevel) {
      const colors = {
        debug: '\x1b[36m',    // Cyan
        info: '\x1b[32m',     // Green
        warn: '\x1b[33m',     // Yellow
        error: '\x1b[31m'     // Red
      };
      const reset = '\x1b[0m';
      console.log(`${colors[levelName]}${formatted}${reset}`);
    }

    return formatted;
  }

  /**
   * Logs a debug message
   */
  debug(message) {
    return this.logMessage(message, 'debug');
  }

  /**
   * Logs an info message
   */
  log(message) {
    return this.logMessage(message, 'info');
  }

  /**
   * Logs a warning message
   */
  warn(message) {
    return this.logMessage(message, 'warn');
  }

  /**
   * Logs an error message
   */
  error(message) {
    return this.logMessage(message, 'error');
  }

  /**
   * Returns all logged messages
   */
  getLogs() {
    return this.logs;
  }

  /**
   * Clears all logs
   */
  clearLogs() {
    this.logs = [];
  }

  /**
   * Returns logs of a specific level
   */
  getLogsByLevel(level) {
    return this.logs.filter(log => log.includes(`[${level.toUpperCase()}]`));
  }

  /**
   * Returns statistics about logs
   */
  getStatistics() {
    return {
      totalLogs: this.logs.length,
      byLevel: {
        debug: this.getLogsByLevel('debug').length,
        info: this.getLogsByLevel('info').length,
        warn: this.getLogsByLevel('warn').length,
        error: this.getLogsByLevel('error').length
      }
    };
  }
}

module.exports = Logger;
