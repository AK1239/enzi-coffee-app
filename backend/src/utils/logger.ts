type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

class Logger {
  private formatMessage(
    level: LogLevel,
    message: string,
    data?: any
  ): LogMessage {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
  }

  private log(level: LogLevel, message: string, data?: any) {
    const logMessage = this.formatMessage(level, message, data);

    if (process.env['NODE_ENV'] === 'development') {
      console.log(
        `[${logMessage.timestamp}] ${level.toUpperCase()}: ${logMessage.message}`,
        data || ''
      );
    } else {
      // In production, you might want to use a proper logging service
      console.log(JSON.stringify(logMessage));
    }
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, data?: any) {
    this.log('error', message, data);
  }

  debug(message: string, data?: any) {
    if (process.env['NODE_ENV'] === 'development') {
      this.log('debug', message, data);
    }
  }
}

export const logger = new Logger();
