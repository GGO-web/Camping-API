import { MiddlewareType } from "./middleware";

import { HttpMethod } from "./httpMethod";

export interface ControllerConfig {
  path: string;
  method: HttpMethod;
  middlewares?: MiddlewareType[];
  controller: any;
}
