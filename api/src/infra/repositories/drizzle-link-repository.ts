import { eq } from "drizzle-orm";

import { Link } from "@/app/entities/link";
import {
  CreateLinkDTO,
  LinkRepository,
} from "@/app/repositories/link-repository";

import { db } from "../db/connections";
import { links } from "../db/schema/links";

export class DrizzleLinkRepository implements LinkRepository {
  async create(data: CreateLinkDTO): Promise<Link> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Link | null> {
    throw new Error("Method not implemented.");
  }

  async findByShortCode(shortCode: string): Promise<Link | null> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Link[]> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async incrementAccessCount(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}