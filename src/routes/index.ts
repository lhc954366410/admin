import { log } from 'console';
import Router from 'koa-router';
const router = new Router();
router.get('/', (ctx, next) => {
  ctx.body = 'Hello koa-router---> koa2';
});
router.post('/login', (ctx, next) => {
  log('ctx.request.body', ctx.req);
  ctx.body = {
    code: 200,
    data: {
      name: 'zhangsan',
      age: 18,
      sex: '男'
    }
  }
});
export default router;