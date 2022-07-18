import Router from "koa-router";

import {
  createOne,
  addToTeam,
  dropChildren,
  removeChild,
} from "../models/Children";
import { getAll as getAllSignUps } from "../models/SignUps";
import { getBySignUp } from "../models/Teams";

export const router = new Router();

router
  .get("/teams/:id", async (ctx) => {
    try {
      ctx.body = await getBySignUp(+ctx.params.id);
    } catch (err) {
      ctx.throw(404, "Cannot find team!");
    }
  })
  .get("/signups", async (ctx) => {
    try {
      ctx.body = await getAllSignUps();
    } catch (err) {
      ctx.throw(404, "Cannot find sign up!");
    }
  })
  .post("/addchild", async (ctx) => {
    try {
      ctx.body = await createOne(ctx.request.body.data);
    } catch (err) {
      ctx.throw(500, "Unable to register!");
    }
  })
  .post("/addchildtoteam", async (ctx) => {
    try {
      ctx.body = await addToTeam(ctx.request.body.data);
    } catch (err) {
      ctx.throw(500, "Unable to register!");
    }
  })
  .post("/dropchildren", async (ctx) => {
    try {
      ctx.body = await dropChildren();
    } catch (err) {
      ctx.throw(500, "Unable to drop!");
    }
  })
  .post("/removechild", async (ctx) => {
    try {
      console.log(ctx.request.body);
      ctx.body = await removeChild(ctx.request.body);
    } catch (err) {
      ctx.throw(500, "Unable to drop!");
    }
  });
