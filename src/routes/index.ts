import Router from '@koa/router';
import authController from '@/controllers/auth.controller';

const router = new Router({ prefix: '/api' });

// 认证路由
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/checkLogin', authController.checkLogin);

export default router;