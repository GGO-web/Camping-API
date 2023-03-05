import { Express } from "express";
import { resolve, join } from "path";
import { readdirSync } from "fs";
import { logger } from "../utils/logger";

import { getDirectories } from "./getDirectoryStructure";

const path = resolve(__dirname, "../features");

export const registerRouters = async (app: Express) => {
  const getControllerFromPath = (
    currentPath: string,
    baseFolderName = "index"
  ) => {
    const pathParts = currentPath.split("/");

    let featurePath = "";

    if (currentPath.includes(baseFolderName)) {
      pathParts.splice(pathParts.length - 2, 1);

      featurePath = pathParts.join("/");
    } else {
      featurePath = currentPath;
    }

    /* 
      get the router name from path, for example: /trip/ROUTER_NAME/index => ROUTER_NAME
      if the router name is not found, use name "index.router.ts" as default
     */
    const feature: string = pathParts.at(-2) || "index";

    return { feature, featurePath };
  };

  const resolveRouter = async (currentPath: string) => {
    const fullPath = join(path, currentPath);

    const isControllerFolder = readdirSync(fullPath, {
      withFileTypes: true,
    }).some((dirent) => dirent.isFile());

    if (!isControllerFolder) {
      getDirectories(fullPath).map(async (feature) => {
        resolveRouter(join(currentPath, `${feature}/`));
      });
    } else {
      const { feature, featurePath } = getControllerFromPath(currentPath);

      const router = await import(join(fullPath, `${feature}.router`));
      const routerPath = `/api${featurePath}`;

      logger.log({
        level: "info",
        message: `Registering router at path: ${routerPath}`,
      });

      app.use(routerPath, router.default);
    }
  };

  resolveRouter("/");
};
