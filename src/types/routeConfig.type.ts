export interface IRouteConfig {
  route: any;
  method: "get" | "post" | "put" | "delete" | "patch";
  path: string;
}
