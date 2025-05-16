import Router from '@koa/router';
import authController from '@/controllers/auth.controller';

const router = new Router();

// 认证路由
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;