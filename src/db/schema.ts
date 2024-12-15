import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const facilityTable = pgTable("facility", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    city: varchar({ length: 255 }),
    address: varchar({ length: 512}),
    state: varchar({ length: 255 }),
    zipCode: varchar({ length: 128 }),
    phone: varchar({ length: 128 }),
    photoUrl: varchar({length: 512})
});