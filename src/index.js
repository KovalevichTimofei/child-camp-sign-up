import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import "./env";
import connectRoutes from "./routes";

async function main() {
  const app = new Koa();

  app.use(bodyParser());
  app.use(cors());

  app.use(async (ctx, next) => {
    await next();
    if (!ctx.body && ctx.status === 404) {
      ctx.throw(404, { error: "Nonexistent route!" });
    }
  });

  connectRoutes(app);

  if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log(port);
  }
}

main();
