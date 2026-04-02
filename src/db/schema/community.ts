import { InferInsertModel } from "drizzle-orm";
import { pgTable, varchar, timestamp, uuid, text } from "drizzle-orm/pg-core";

export const community = pgTable('communities', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    createdBy: text('created_by').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})


type InsertCommunity = InferInsertModel<typeof community>
// type InsertCommunity2 = typeof community.$inferInsert  Otra forma de generar el tipo desde el esquema de drizzle ORM