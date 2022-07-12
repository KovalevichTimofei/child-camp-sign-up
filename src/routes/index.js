import Router from "koa-router";

import { router as defaultRouter } from "./default";
import { router as publicRouter } from "./public";

const router = new Router();

router.use(
  defaultRouter.routes(),
  defaultRouter.allowedMethods(),
  publicRouter.routes(),
  publicRouter.allowedMethods()
);

export default function connectRoutes(app) {
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = { code: err.statusCode, message: err.message };
      ctx.app.emit("error", err, ctx);
    }
  });
  app.use(router.routes());
}
