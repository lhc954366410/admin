import Router from '@koa/router';
import authApi from './authApi';
import noAuthApi from './noAuthApi';
const router = new Router({ prefix: '/api' });
router.use(noAuthApi.routes(), noAuthApi.allowedMethods())
router.use(authApi.routes(), authApi.allowedMethods());

export default router;