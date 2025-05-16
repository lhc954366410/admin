import { convertKeysToCamelCase, convertKeysToSnakeCase } from '@/utils/namingConverter';
import dbPool from '../config/database';

export abstract class BaseRepository<T> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected async query(sql: string, values?: any[]): Promise<any> {
    values = convertKeysToSnakeCase(values);
    const [rows,fieldPacket] = await dbPool.query(sql, values);
    return convertKeysToCamelCase(rows)
  }

  async findById(id: number): Promise<T | null> {
    const rows = await this.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  }
  async deleteById(id: number): Promise<T | null> {
    const rows = await this.query(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  }
}