## 从0开始搭建koa项目,结合typescript
### 基础项目搭建
1. 初始化项目
```bash
yarn init 
```
2. 安装koa
```bash
yarn add koa
yarn add typescript @types/koa @types/node -D
```
3. 生成tsconfig.json
```bash
npx tsc --init
```
4. 编写src/index.ts
```ts
import Koa from 'koa';
const app = new Koa()
app.use((ctx, next) => {
  ctx.body = 'Hello World'
  next()
});
app.listen(3000)
```
5. 编译并运行
先在package.json中添加启动脚本
```json
"scripts": {
  "dev": "ts-node src/index.ts"
}
```
然后运行
```bash
yarn dev
```
在浏览器打开 http://localhost:3000/ 可以看到 Hello World

6. 安装nodemon
这个时候将Hello World修改为Hello Koa，但是需要重启服务器才能看到修改后的效果，使用nodemon可以自动重启服务器，不需要手动重启
```bash
yarn add nodemon -D
```
修改package.json中的启动脚本
```json
"scripts": {
  "dev": "nodemon src/index.ts"  
}
```
7. 发布
当前dev模式下运行的是ts代码，需要先编译为js代码，然后运行js代码，编译命令为

配置编译目录dist，修改tsconfig.json
```json
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
 编译后的文件在dist目录下，发布时将dist目录下的文件复制到服务器上即可
```bash
yarn build
```
打包后启动服务器

修改package.json中的main字段
```json
"main": "dist/index.js"
```
```bash
yarn start
```

启动脚本在package.json中添加
```json
"scripts": {
  "dev": "nodemon src/index.ts",
  "build": "rimraf dist  && tsc",
  "start": "node dist/index.js"
}
打包之前先删除原来的文件，rimraf是一个跨平台的删除文件和文件夹的命令，使用前需要安装
```bash
yarn add rimraf -D
···

```

到这里已经可以将项目运行发发布了。
8. 安装koa-router
```bash
yarn add koa-router
yarn add @types/koa-router -D
```
新建src/routes/index.ts
```ts
import Router from 'koa-router';
const router = new Router();
router.get('/', (ctx, next) => {
  ctx.body = 'Hello koa-router'
  next()
})
export default router
```
修改src/index.ts
```ts
import Koa from 'koa';
import router from '/routes/index';
const app = new Koa()
app.use(router.routes())
app.listen(3000)
```
再次访问http://localhost:3000/ 可以看到 Hello koa-router。

9. 使用路径别名
在目录深层次引用的时候，使用相对路径会很麻烦，使用路径别名可以简化路径。
修改tsconfig.json
```json
{
  "compilerOptions": {
    
    "paths": {
      "@/*": ["*"]
    }
  }
}
```
这个时候就可以使用@/routes/index.ts来引用src/routes/index.ts了。
但是呢，这个时候会报错
```
Error: Cannot find module '@/routes/index'
```
这是因为tsc编译的时候会将@/routes/index.ts编译为dist/@/routes/index.js，但是nodejs是无法识别@/routes/index.js的，tsconfig-paths可以解决这个问题。
```bash
yarn add tsconfig-paths -D
```
修改package.json中的dev脚本
```json
    "dev": "nodemon -r tsconfig-paths/register --files src/index.ts",
```
这时候开发环境已经可以正常运行了。
下面我们再来试一下发布正式环境

可以正常打包出来，但是报错
```
tsconfig.json:34:15 - error TS5090: Non-relative paths are not allowed when 'baseUrl' is not set. Did you forget a leading './'?

34       "@/*": ["src/*"]
                 ~~~~~~~


Found 1 error in tsconfig.json:34

error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
需要修改tsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
  }
}
```


运行打包后的代码，也是报错
```
Error: Cannot find module '@/routes/index'
```
同样是无法解析  @/routes/index.js，这是因为nodejs无法识别@/routes/index.js，需要使用ts-node来运行。
安装依赖tsc-alias处理别名
```bash
yarn add tsc-alias -D
```
修改package.json中的build脚本
```json
    "build": "rimraf dist  && tsc && tsc-alias",
```
这时候就可以正常打包了。下面将此作为基础，做一个企业站，慢慢去完善安装依赖


### 企业站搭建

1. 路由中增加login接口
```ts
router.post('/login', (ctx, next) => {
  ctx.body = {
    code: 200,
    data: {
      name: 'zhangsan',
      age: 18,
      sex: '男'
    }
  }
});
···
2. 使用umi创建前端项目，并请求login接口，发下报错了，跨域
```
Access to XMLHttpRequest at 'http://localhost:3000/login' from origin 'http://localhost:3001' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```
3. 处理跨域问题
```bash
yarn add koa2-cors
yarn add  @types/koa2-cors -D
```
src/index.ts增加
```ts
import cors from 'koa2-cors'
app.use(cors({
    origin: '*'
}))
```
重新请求login接口，发现可以正常请求了。