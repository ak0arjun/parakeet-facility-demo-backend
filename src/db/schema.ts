import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const facilityTable = pgTable("facility", {
    id: integer().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    city: varchar({ length: 255 }).notNull(),
    address: varchar({ length: 512}).notNull(),
    state: varchar({ length: 255 }).notNull(),
    zipCode: varchar({ length: 128 }).notNull(),
    phone: varchar({ length: 128 }).notNull(),
    photoUrl: varchar({length: 512}),
    type: varchar({length: 255}),
});