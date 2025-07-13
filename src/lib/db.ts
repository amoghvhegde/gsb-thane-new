import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function getDatabase(): Promise<Database> {
  if (db) {
    return db;
  }

  const dbPath = path.join(process.cwd(), 'gsb_mandal.db');
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  return db;
}

export default getDatabase;