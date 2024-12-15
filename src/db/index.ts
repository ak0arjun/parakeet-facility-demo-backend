import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';

export default class DrizzleService extends NeonHttpDatabase {
    private static drizzleDatabase: NeonHttpDatabase;

    public static getInstance(databaseUrl: string): NeonHttpDatabase {
        if (!DrizzleService.drizzleDatabase) {
            DrizzleService.drizzleDatabase = drizzle(databaseUrl);
        }

        return DrizzleService.drizzleDatabase;
    }
}
