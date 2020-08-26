class Logger {
  logLevel: number;
  setLogLevel(logLevel: string) {
    this.logLevel = this.getLogLevel(logLevel);
  }
  getLogLevel(logType: string): number {
    let level: number;
    switch (logType) {
      case 'debug':
        level = 1;
        break;
      case 'info':
        level = 2;
        break;
      case 'warn':
        level = 3;
        break;
      case 'error':
        level = 4;
        break;
      case 'trace':
        level = 5;
        break;
      default:
        level = 0;
        console.error(
          'logLevel should be one of the options [debug, info, warn, error, trace]',
        );
    }
    return level;
  }
  debug(...args: any[]) {
    if (this.logLevel <= 1) {
      console.debug(...args);
    }
  }
  info(...args: any[]) {
    if (this.logLevel <= 2) {
      console.log(...args);
    }
  }
  warn(...args: any[]) {
    if (this.logLevel <= 3) {
      console.warn(...args);
    }
  }
  error(...args: any[]) {
    if (this.logLevel <= 4) {
      console.error(...args);
    }
  }
  trace(...args: any[]) {
    if (this.logLevel <= 5) {
      console.trace(...args);
    }
  }
}

export default new Logger();
