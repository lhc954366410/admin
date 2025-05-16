
import mysql from 'mysql2/promise';

// 创建连接池（推荐生产环境使用）
const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'web_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  typeCast:(field, next) =>{
    console.log('field.type',field.type);
    if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
      return field.string() === null ? null : new Date(field.string()+'');
    }
    if (field.type === 'DATE') {
      const dateString = field.string();
      return dateString === null ? null : new Date(dateString + 'T00:00:00');
    }
    return next();
  }

});

// 导出 Promise 接口
export default dbPool;