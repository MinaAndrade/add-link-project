CREATE TABLE "links" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"short_code" varchar(20) NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_code_unique" UNIQUE("short_code")
);
