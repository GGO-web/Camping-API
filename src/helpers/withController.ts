import { ControllerConfig } from "../types/controllerConfig";
import { HttpMethod } from "../types/httpMethod";
import { MiddlewareType } from "../types/middleware";

export const withController = (
  path: string,
  method: HttpMethod,
  controller: any,
  middlewares?: MiddlewareType[]
): ControllerConfig => ({
  path,
  method,
  controller,
  middlewares: middlewares || [],
});
