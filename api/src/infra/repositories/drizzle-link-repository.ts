import { eq, desc, sql } from "drizzle-orm";

import { Link } from "@/app/entities/link";
import {
  CreateLinkDTO,
  LinkRepository,
} from "@/app/repositories/link-repository";

import { db } from "../db/connections";
import { links } from "../db/schema/links";

export class DrizzleLinkRepository implements LinkRepository {
  async create(data: CreateLinkDTO): Promise<Link> {
  const [link] = await db
    .insert(links)
    .values({
      id: data.id,
      originalUrl: data.originalUrl,
      shortCode: data.shortCode,
    })
    .returning();

  return link;
}

  async findById(id: string): Promise<Link | null> {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.id, id));

  return link ?? null;
}

  async findByShortCode(shortCode: string): Promise<Link | null> {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode));

  return link ?? null;
}

  async findAll(): Promise<Link[]> {
  return db
    .select()
    .from(links)
    .orderBy(desc(links.createdAt));
}

  async delete(id: string): Promise<void> {
  await db
    .delete(links)
    .where(eq(links.id, id));
}

 async incrementAccessCount(id: string): Promise<void> {
  await db
    .update(links)
    .set({
      accessCount: sql`${links.accessCount} + 1`,
    })
    .where(eq(links.id, id));
}
}