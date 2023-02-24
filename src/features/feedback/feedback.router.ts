import express, { Router } from "express";

import { asyncWrapper } from "../../helpers/asyncWrapper";

import controller, { IRouteConfig } from "./feedback.controller";

const router: Router = express.Router();

setTimeout(() => {
  // Notification routes
  controller.forEach((routeConfig: IRouteConfig) => {
    const method = routeConfig.method;

    switch (method) {
      case "get":
        router.get(routeConfig.path, asyncWrapper(routeConfig.route));
        break;
      case "post":
        router.post(routeConfig.path, asyncWrapper(routeConfig.route));
        break;
      case "put":
        router.put(routeConfig.path, asyncWrapper(routeConfig.route));
        break;
      case "delete":
        router.delete(routeConfig.path, asyncWrapper(routeConfig.route));
        break;
      case "patch":
        router.patch(routeConfig.path, asyncWrapper(routeConfig.route));
        break;
      default:
        break;
    }
  });
}, 0);

export default router;
