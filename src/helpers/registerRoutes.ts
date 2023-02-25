import { Router } from "express";

import { IRouteConfig } from "../types/routeConfig.type";

import { logger } from "../utils/logger";
import { asyncWrapper } from "./asyncWrapper";
import { getDirectoryFiles } from "./getDirectoryFiles";

export const registerRoutes = (router: Router, path: string) => {
  getDirectoryFiles(path).map(async (routeName: string) => {
    const route = await import(`${path}/${routeName}`);

    const routeConfig: IRouteConfig = route.default;

    const { method } = routeConfig;

    if (routeConfig.route) {
      router[method](routeConfig.path, asyncWrapper(routeConfig.route));
      // logger.info(
      //   `ROUTE ${"\x1b[33m"}${
      //     routeConfig.path
      //   }${"\x1b[0m"} registered with method ${"\x1b[33m"}${routeName.replace(
      //     ".route.js",
      //     ""
      //   )}${"\x1b[0m"}`
      // );
    } else {
      logger.error(
        `Route ${routeConfig.path} is not defined in ${routeName} file`
      );
    }
  });
};
