export default {
  error: (app, logger) => {
    app.use(async (ctx, next) => {
      console.log('error step1 await before');
      try {
        await next();
      } catch(error) {
        console.log('出错：',error);
        logger.error(error);
        ctx.status = error.status || 500;
        ctx.body = "error Page";
      }
    });
    app.use(async (ctx, next) => {
      console.log('error step2 await before');
      await next();
      console.log('error step2 await after');
      if (ctx.status != 404) return;
      ctx.status = 404;
      ctx.body = "<h1>404</h1>";
    })
  }
}