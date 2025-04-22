import { log } from 'console';
import Router from 'koa-router';
const router = new Router();
router.get('/', (ctx, next) => {
  ctx.body = 'Hello koa-router---> koa2';
});
router.post('/login', (ctx, next) => {
  const {username,password} = <any>ctx.request.body
  ctx.body = {
    code: 200,
    data: {
      username,
      password
    }
  }
});
export default router;