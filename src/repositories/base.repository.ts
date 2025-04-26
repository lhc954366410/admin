import dbPool from '../config/database';

export abstract class BaseRepository<T> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected async query(sql: string, values?: any[]): Promise<any> {

    const [rows] = await dbPool.query(sql, values);
    return rows;
  }

  async findById(id: number): Promise<T | null> {
    const [rows] = await this.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  }
}