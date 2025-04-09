import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from '@shared/schema';

const { Pool } = pg;

// Create pool and export for connect-pg-simple
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Export drizzle instance
export const db = drizzle(pool, { schema });