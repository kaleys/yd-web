"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  error: (app, logger) => {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        console.log('出错：', error);
        logger.error(error);
        ctx.status = error.status || 500;
        ctx.body = "error Page";
      }
    });
    app.use(async (ctx, next) => {
      await next();
      if (ctx.status != 404) return;
      ctx.status = 404;
      ctx.body = "<h1>404</h1>";
    });
  }
};