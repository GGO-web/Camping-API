import { Router } from "express";

import { ControllerConfig } from "../types/controllerConfig";

import { logger } from "../utils/logger";

import { getDirectoryFiles } from "./getDirectoryFiles";

export const registerControllers = (router: Router, path: string) => {
  getDirectoryFiles(path).map(async (routeName: string) => {
    const controller = await import(`${path}/${routeName}`);

    const controllerConfigs: ControllerConfig[] = controller.default;

    controllerConfigs.map((controllerConfig: ControllerConfig) => {
      const { method, middlewares } = controllerConfig;

      if (controllerConfig.controller) {
        router[method](
          controllerConfig.path,
          ...(middlewares || []),
          controllerConfig.controller
        );
        // logger.info(
        //   `ROUTE ${"\x1b[33m"}${
        //     controllerConfig.path
        //   }${"\x1b[0m"} registered with method ${"\x1b[33m"}${routeName.replace(
        //     ".route.js",
        //     ""
        //   )}${"\x1b[0m"}`
        // );
      } else {
        logger.error(
          `Route ${controllerConfig.path} is not defined in ${routeName} file`
        );
      }
    });
  });
};
