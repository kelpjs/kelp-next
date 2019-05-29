## Controller

Kanary 中的 控制器 对于服务器来说非常重要，它是我们处理请求的关键。

目前支持以下类型：

#### Function 函数

```js
export default () => {
  return 'hello world';
};
```

### Array

```js
export default [
  () => 'hello world 1',
  () => 'hello world 2',
];
```

#### Class 类

```js
import Controller from 'kanary/controller';

class Home extends Controller {
  async index(){
    return 'hello world'; // 响应
  }
}

export default Home;
```