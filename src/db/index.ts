import { drizzle } from 'drizzle-orm/neon-http';

// TODO: get this from env
export const drizzleDatabase = drizzle("postgresql://parakeet_facilities_challenge_db_owner:ND7VpaGQ1MJb@ep-steep-field-a5h0syhd.us-east-2.aws.neon.tech/parakeet_facilities_challenge_db?sslmode=require");