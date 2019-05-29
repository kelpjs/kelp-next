## Plugin / Middleware

插件 / 中间件 是 Kanary 中强大的扩展能力的体现，在插件中你可以对 Kanary 做扩展动作，也可以处理请求。

在 Kanary 中已经内置了大量 插件 / 中间件 可以做到开箱即用

插件会在项目启动时加载并执行一次

中间件会在每次请求时触发，并且有能力调度之后的中间件运行。

```js
module.exports = (app, options) => {
  // plugin phase
  return async (req, res, next) => {
    // middleware phase
    await next();
  };
};
```