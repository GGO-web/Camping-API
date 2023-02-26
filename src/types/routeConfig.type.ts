import { TMiddleware } from "./middleware.type";

export interface IRouteConfig {
  route: any;
  method: "get" | "post" | "put" | "delete" | "patch";
  path: string;
  middlewares?: TMiddleware[];
}
