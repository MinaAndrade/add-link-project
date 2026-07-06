import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: uuid('id').primaryKey(),

  originalUrl: text('original_url').notNull(),

  shortCode: varchar('short_code', { length: 10 }).notNull().unique(),

  accessCount: integer('access_count').default(0).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
