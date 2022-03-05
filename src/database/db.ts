import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from '../entities';

createConnection({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: [User],
  synchronize: true,
  logging: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
})
  .then(async () => {
    // here you can start to work with your entities
    console.log('DB up and running');
  })
  .catch((error) => console.log(error));
