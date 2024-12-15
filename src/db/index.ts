import { drizzle } from 'drizzle-orm/neon-http';

// TODO: get this from env
export const drizzleDatabase = drizzle("env.ATABASE_URL");