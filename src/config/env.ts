interface Config {
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    charset: string;
    connectionLimit: number;
  };
  app: {
    port: number;
    saltRounds: number;
  };
}

export const config: Config = {
  db: {
    host: 'localhost',
    port: 3306,
    user:  'root',
    password: '123456',
    database: 'web_database',
    charset: 'utf8mb4',
    connectionLimit: 10
  },
  app: {
    port: 3000,
    saltRounds: 10
  }
};