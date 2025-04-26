
import mysql from 'mysql2/promise';

// 创建连接池（推荐生产环境使用）
const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'web_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 导出 Promise 接口
export default dbPool;