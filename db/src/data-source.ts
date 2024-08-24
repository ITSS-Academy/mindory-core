import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Card } from './entity/Card';
import { Flashcard } from './entity/Flashcard';
import { Folder } from './entity/Folder';
import { Profile } from './entity/Profile';
import { Subjects } from './entity/Subjects';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'dpg-cqqp48qj1k6c73dktef0-a.singapore-postgres.render.com',
  port: 5432,
  username: 'mindory_postgresql_user',
  password: 'TGt66sMLhC5WaGlwDpIoTIHNDruElR1a',
  database: 'mindory_postgresql',
  synchronize: true,
  logging: false,
  entities: [Card, Flashcard, Folder, Profile, Subjects],
  migrations: [],
  subscribers: [],
  ssl: { rejectUnauthorized: false },
});
