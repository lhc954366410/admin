import Koa, { Context, Next } from 'koa';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser'
import router from '@/routes/index';
import { config } from './config/env';
import Database from './config/database';
import errorMiddleware from './middleware/error';
import { setupSwagger } from './middleware/swagger';
import { AppDataSource } from './config/AppDataSource';

(async () => {

    // 不这样处理的话，数据库存储的日期是 2025-06-09 10:26:52，查出来会变 2025-06-09T02:26:52.000Z
    Date.prototype.toJSON = function () {
        // 保持原有时区不转为UTC
        const timezoneOffset = this.getTimezoneOffset() * 60000;
        return new Date(this.getTime() - timezoneOffset).toISOString().slice(0, 19).replace('T', ' ');
    };
    //使用orm连接
    try {
        await AppDataSource.initialize()
        console.log("orm连接成功")
    } catch (e) {
        console.log("orm连接失败---", e)
    }

    // console.log("ormres",ormres)
    //连接数据库
    // await Database.initialize()
    const app = new Koa();

    // 跨域
    app.use(cors({
        origin: '*'
    }))
    app.use(async (ctx: Context, next: Next) => {
        ctx.setBody = (data: any, code = 200, message: "") => {
            ctx.body = {
                data,
                code,
                message
            }
        }
        await next()
    })
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
        // await Database.close();
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    });


})()

