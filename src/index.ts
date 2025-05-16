import Koa from 'koa';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser'
import router from '@/routes/index';
import { config } from './config/env';
import { Database } from './config/database';
import errorMiddleware from './middleware/error';
import { setupSwagger } from './middleware/swagger';
(async () => {

    const app = new Koa();
    // 跨域
    app.use(cors({
        origin: '*'
    }))
    app.use(errorMiddleware);
    // 解析请求体
    app.use(bodyParser())
    // Swagger 文档
    const { swaggerUIMiddleware } = setupSwagger(router);
    app.use(swaggerUIMiddleware);
    
    // 响应
    app.use(router.routes()).use(router.allowedMethods());
    const PORT = config.app.port;
    const server = app.listen(3000, async () => {
        console.log(`http://localhost:${PORT}/`);
    });
    process.on('SIGTERM', async () => {
        await Database.close();
        server.close(() => {
        console.log('Server closed');
        process.exit(0);
        });
    });

    
})()

