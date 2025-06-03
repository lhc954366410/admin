
import { ConnectionOptions } from 'typeorm';
import { config } from './env';
const ormconfig: ConnectionOptions = {
  type: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database:  config.db.database,
  synchronize: false,  // 生产环境应为 false
  logging: false,
  entities: [
   'src/**/*.entity.ts',
  ],
//   数据库迁移
//   migrations: [ 
//     'src/migration/**/*.ts'
//   ],
//   subscribers: [
//     'src/subscriber/**/*.ts'
//   ],
//   cli: {
//     entitiesDir: 'src/entities',
//     // migrationsDir: 'src/migration',
//     // subscribersDir: 'src/subscriber'
//   }
};



export default ormconfig;