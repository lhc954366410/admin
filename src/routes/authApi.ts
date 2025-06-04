import Router from '@koa/router';
import authController from '@/controllers/auth.controller';
import { authMiddleware } from '@/middleware/authMiddleware';
import categoriesController from '@/controllers/categories.controller';
const router = new Router();
router.use(authMiddleware)
router.post('/checkLogin', authController.checkLogin);

router.post('/categories/selectList', categoriesController.selectList);
router.post('/categories/selectOne', categoriesController.selectOne);
router.post('/categories/add', categoriesController.add);
router.post('/categories/update', categoriesController.update);
router.post('/categories/delete', categoriesController.delete);



export default router;