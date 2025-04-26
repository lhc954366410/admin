import mysql from 'mysql2/promise';
import { config } from './env';

export class Database {
  private static pool: mysql.Pool;

  static async initialize() {
    this.pool = mysql.createPool(config.db);
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
Database.initialize()
export default Database.getPool();