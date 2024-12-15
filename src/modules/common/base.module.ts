import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { drizzleDatabase } from '../../db';

/**
 * Abstract module class containing basic services required by multiple modules
 */
export abstract class BaseModule {
    // Prisma client service
    protected drizzleDatabase: NeonHttpDatabase;
    
  
    constructor(moduleName: string) {
      this.drizzleDatabase = drizzleDatabase;
    }
  }