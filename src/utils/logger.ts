import winston from "winston";

const { combine, timestamp, printf } = winston.format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
};

const getLevelColor = (level: string) => {
  let color = "";

  if (level === "info") {
    color = "\x1b[32m"; // green
  } else if (level === "warn" || level === "verbose") {
    color = "\x1b[33m"; // yellow
  } else if (level === "error") {
    color = "\x1b[31m"; // red
  } else if (level === "http" || level === "debug" || level === "silly") {
    color = "\x1b[35m"; // magenta
  } else {
    color = "\x1b[37m"; // white
  }

  return color;
};

// Define log format
const logFormat = printf(
  ({ level, message, timestamp: tsp }) =>
    `${tsp} ${getLevelColor(
      level
    )}[${level.toUpperCase()}]${"\x1b[0m"}: ${message}`
);

// Initialize logger
export const logger = winston.createLogger({
  levels,
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new winston.transports.Console({
      level: "http",
    }),
    new winston.transports.Console({
      level: "error",
    }),
  ],
});

// Call exceptions.handle with a transport to handle exceptions
logger.exceptions.handle(new winston.transports.Console());

logger.exitOnError = false;
