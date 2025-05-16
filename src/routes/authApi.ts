import Router from '@koa/router';
import authController from '@/controllers/auth.controller';
import { authMiddleware } from '@/middleware/authMiddleware';
const router = new Router();
router.use(authMiddleware)
router.post('/checkLogin', authController.checkLogin);
export default router;