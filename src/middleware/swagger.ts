
import { koaSwagger } from 'koa2-swagger-ui';
import Router from '@koa/router';
import { swaggerSpec } from '@/docs/api-docs';

export function setupSwagger(router: Router) {
  // 提供 JSON 格式的 API 文档
  router.get('/swagger.json', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerSpec;
  });
  
  // 设置 Swagger UI 路由
  const swaggerUIMiddleware = koaSwagger({
    routePrefix: '/swagger', // 设置false的话原接口会有问题
    swaggerOptions: {
      spec: swaggerSpec,
      docExpansion: 'none'
    }
  });
  
  return { swaggerUIMiddleware };
}