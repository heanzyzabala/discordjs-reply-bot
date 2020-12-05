import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Reply } from './entities/reply';

const connect = async () => {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'thepasswordofdoom',
    database: 'discord-reply-bot-db',
    entities: [Reply],
    synchronize: true,
    logging: false,
  });
};
export default connect();
