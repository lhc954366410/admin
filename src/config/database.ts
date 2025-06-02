import mysql from 'mysql2/promise';
import { config } from './env';
class Database {
  static pool: mysql.Pool;

  static async initialize() {
    this.pool = mysql.createPool({
      ...config.db,
      typeCast:(field, next) =>{
        //处理日期格式
        if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
          return field?.string() ? field.string() : null;
        }
        if (field.type === 'DATE') {
          return field?.string()  ? field?.string() : null ;
        }
        return next();
      }
    
    });
    try {
      // 测试连接
      const connection = await this.pool.getConnection();
      console.log('数据库连接成功');
      connection.release(); // 释放连接
    } catch (error) {
      console.error('数据库连接失败:', error);
    }
  }

  static getPool(): mysql.Pool {
    if (!this.pool) {
      throw new Error('Database not initialized');
    }
    return this.pool;
  }

  static async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
    }
  }
}
// Database.initialize()
export default Database;