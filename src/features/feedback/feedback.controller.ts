import { getDirectoryFiles } from "../../helpers/getDirectoryFiles";

import path from "path";

export interface IRouteConfig {
  route: any;
  method: string;
  path: string;
}

const controller: IRouteConfig[] = [];

getDirectoryFiles(path.join(__dirname, "./routes")).map(async (
  routeName: string
) => {
  const routeConfig = await import(`./routes/${routeName}`);

  controller.push(routeConfig.default);
});

export default controller;
