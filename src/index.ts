import Koa from 'koa';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser'

const app = new Koa();
import router from '@/routes/index';
app.use(cors({
    origin: '*'
}))
app.use(bodyParser())

// 响应
app.use(router.routes())

app.listen(3000, async () => {
    console.log(`http://localhost:${3000}/`);
});