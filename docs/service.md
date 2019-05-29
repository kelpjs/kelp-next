## Service Injecting

依赖注入服务是 Kanary 中最有特色的功能之一，它能够让 [控制器](./controller.md) 处理请求时更加方便、高效。

Kanary 中 Service 服务必须定义为 [Function 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function), 该函数(即 "Service 服务") 可以依赖注入其他服务。并且返回任意类型的对象作为输出。

```js
module.exports = (req /* 注入 req 服务 */) => {
  // ...
  // 可以返回任意类型
  return {}; 
  return 1;
  return () => {};
};
```