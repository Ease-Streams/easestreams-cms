import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_card_url" varchar,
	"sizes_card_width" numeric,
	"sizes_card_height" numeric,
	"sizes_card_mime_type" varchar,
	"sizes_card_filesize" numeric,
	"sizes_card_filename" varchar,
	"sizes_tablet_url" varchar,
	"sizes_tablet_width" numeric,
	"sizes_tablet_height" numeric,
	"sizes_tablet_mime_type" varchar,
	"sizes_tablet_filesize" numeric,
	"sizes_tablet_filename" varchar
);

ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_products_id_products_id_fk";

ALTER TABLE "products_rels" ADD COLUMN "media_id" integer;
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" ("sizes_thumbnail_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" ("sizes_card_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" ("sizes_tablet_filename");
DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "products_rels" DROP COLUMN IF EXISTS "products_id";`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "media";
ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_media_id_media_id_fk";

ALTER TABLE "products_rels" ADD COLUMN "products_id" integer;
DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "products_rels" DROP COLUMN IF EXISTS "media_id";`);

};
