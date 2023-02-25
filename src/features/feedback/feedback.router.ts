import express, { Router } from "express";

import path from "path";
import { asyncWrapper } from "../../helpers/asyncWrapper";
import { getDirectoryFiles } from "../../helpers/getDirectoryFiles";

const router: Router = express.Router();

export interface IRouteConfig {
  route: any;
  method: string;
  path: string;
}

// register all routes
getDirectoryFiles(path.join(__dirname, "./routes")).map(
  async (routeName: string) => {
    const route = await import(`./routes/${routeName}`);
    const routeConfig: IRouteConfig = route.default;
    const { method } = routeConfig;

    // @ts-ignore
    router[method](routeConfig.path, asyncWrapper(routeConfig.route));
  }
);

export default router;
