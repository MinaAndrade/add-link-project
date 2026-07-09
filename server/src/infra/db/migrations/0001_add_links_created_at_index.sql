ALTER TABLE "links" ALTER COLUMN "short_code" SET DATA TYPE varchar(10);--> statement-breakpoint
CREATE INDEX "links_created_at_idx" ON "links" USING btree ("created_at");