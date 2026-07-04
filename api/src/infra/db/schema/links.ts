import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: varchar("id", { length: 36 }).primaryKey(),

  originalUrl: text("original_url").notNull(),

  shortCode: varchar("short_code", { length: 20 })
    .notNull()
    .unique(),

  accessCount: integer("access_count")
    .default(0)
    .notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});