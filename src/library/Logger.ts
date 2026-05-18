type LogLevel = "ERROR" | "WARN" | "INFO" | "DEBUG";

export class Logger {
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  error(message: string, ...meta: unknown[]): void {
    console.error(this.formatMessage("ERROR", message), ...meta);
  }

  warn(message: string, ...meta: unknown[]): void {
    console.warn(this.formatMessage("WARN", message), ...meta);
  }

  info(message: string, ...meta: unknown[]): void {
    console.info(this.formatMessage("INFO", message), ...meta);
  }

  debug(message: string, ...meta: unknown[]): void {
    console.debug(this.formatMessage("DEBUG", message), ...meta);
  }
}
