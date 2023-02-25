import morgan from "morgan";

import { logger } from "../utils/logger";

function statusColorClosure() {
  let color = "";
  let level = "info";

  return (status?: number) => {
    if (!status)
      return {
        getColor: () => color,
        getLevel: () => level,
      };

    level = "http";

    if (status >= 500) {
      color = "\x1b[39m"; // red
      level = "error";
    } else if (status >= 400) {
      color = "\x1b[31m"; // yellow
    } else if (status >= 300) {
      color = "\x1b[36m"; // cyan
    } else if (status >= 200) {
      color = "\x1b[32m"; // green
    } else {
      color = "\x1b[37m"; // white
      level = "info";
    }

    return {
      getColor: () => color,
      getLevel: () => level,
    };
  };
}

const statusColorTrigger = statusColorClosure();

// Set up Morgan middleware
export const morganMiddleware = morgan(
  (tokens, req, res) => {
    const status = Number(tokens.status(req, res));

    const color = statusColorTrigger(status).getColor();

    return [
      `${tokens.method(req, res)} ${tokens.url(req, res)}`,
      `${color}${status}${"\x1b[0m"} ${tokens["response-time"](req, res)}ms`,
    ].join(" ");
  },
  {
    stream: {
      write: (message) => {
        logger.log(statusColorTrigger().getLevel(), message.trim());
      },
    },
  }
);
