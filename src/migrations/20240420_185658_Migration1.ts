import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_users_role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_customers_role" AS ENUM('admin', 'service_provider', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"role" "enum_users_role" NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"lexical_text" jsonb,
	"slug" varchar,
	"lexicaltext_html" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "country" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"is_active" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "country_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"is_verified_supplier" boolean,
	"is_email_verified" boolean,
	"is_active" boolean,
	"location" varchar,
	"contact" varchar,
	"role" "enum_customers_role",
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"_verified" boolean,
	"_verificationtoken" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "state" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"is_active" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "state_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"country_id" integer,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "city" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"is_active" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "city_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"state_id" integer,
	"country_id" integer,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "rootcategory" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"is_deleted" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "rootcategory_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "parentcategory" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"is_deleted" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "parentcategory_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"rootcategory_id" integer,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"product_code" varchar NOT NULL,
	"description" varchar NOT NULL,
	"videourl" varchar,
	"is_deleted" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "products_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"products_id" integer,
	"rootcategory_id" integer,
	"city_id" integer,
	"parentcategory_id" integer,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer,
	"customers_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" ("created_at");
CREATE INDEX IF NOT EXISTS "country_created_at_idx" ON "country" ("created_at");
CREATE INDEX IF NOT EXISTS "country_rels_order_idx" ON "country_rels" ("order");
CREATE INDEX IF NOT EXISTS "country_rels_parent_idx" ON "country_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "country_rels_path_idx" ON "country_rels" ("path");
CREATE INDEX IF NOT EXISTS "customers_created_at_idx" ON "customers" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "customers_email_idx" ON "customers" ("email");
CREATE INDEX IF NOT EXISTS "state_created_at_idx" ON "state" ("created_at");
CREATE INDEX IF NOT EXISTS "state_rels_order_idx" ON "state_rels" ("order");
CREATE INDEX IF NOT EXISTS "state_rels_parent_idx" ON "state_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "state_rels_path_idx" ON "state_rels" ("path");
CREATE INDEX IF NOT EXISTS "city_created_at_idx" ON "city" ("created_at");
CREATE INDEX IF NOT EXISTS "city_rels_order_idx" ON "city_rels" ("order");
CREATE INDEX IF NOT EXISTS "city_rels_parent_idx" ON "city_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "city_rels_path_idx" ON "city_rels" ("path");
CREATE INDEX IF NOT EXISTS "rootcategory_created_at_idx" ON "rootcategory" ("created_at");
CREATE INDEX IF NOT EXISTS "rootcategory_rels_order_idx" ON "rootcategory_rels" ("order");
CREATE INDEX IF NOT EXISTS "rootcategory_rels_parent_idx" ON "rootcategory_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "rootcategory_rels_path_idx" ON "rootcategory_rels" ("path");
CREATE INDEX IF NOT EXISTS "parentcategory_created_at_idx" ON "parentcategory" ("created_at");
CREATE INDEX IF NOT EXISTS "parentcategory_rels_order_idx" ON "parentcategory_rels" ("order");
CREATE INDEX IF NOT EXISTS "parentcategory_rels_parent_idx" ON "parentcategory_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "parentcategory_rels_path_idx" ON "parentcategory_rels" ("path");
CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" ("created_at");
CREATE INDEX IF NOT EXISTS "products_rels_order_idx" ON "products_rels" ("order");
CREATE INDEX IF NOT EXISTS "products_rels_parent_idx" ON "products_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "products_rels_path_idx" ON "products_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "country_rels" ADD CONSTRAINT "country_rels_parent_id_country_id_fk" FOREIGN KEY ("parent_id") REFERENCES "country"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "country_rels" ADD CONSTRAINT "country_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "state_rels" ADD CONSTRAINT "state_rels_parent_id_state_id_fk" FOREIGN KEY ("parent_id") REFERENCES "state"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "state_rels" ADD CONSTRAINT "state_rels_country_id_country_id_fk" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "state_rels" ADD CONSTRAINT "state_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "city_rels" ADD CONSTRAINT "city_rels_parent_id_city_id_fk" FOREIGN KEY ("parent_id") REFERENCES "city"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "city_rels" ADD CONSTRAINT "city_rels_state_id_state_id_fk" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "city_rels" ADD CONSTRAINT "city_rels_country_id_country_id_fk" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "city_rels" ADD CONSTRAINT "city_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "rootcategory_rels" ADD CONSTRAINT "rootcategory_rels_parent_id_rootcategory_id_fk" FOREIGN KEY ("parent_id") REFERENCES "rootcategory"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "rootcategory_rels" ADD CONSTRAINT "rootcategory_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "parentcategory_rels" ADD CONSTRAINT "parentcategory_rels_parent_id_parentcategory_id_fk" FOREIGN KEY ("parent_id") REFERENCES "parentcategory"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "parentcategory_rels" ADD CONSTRAINT "parentcategory_rels_rootcategory_id_rootcategory_id_fk" FOREIGN KEY ("rootcategory_id") REFERENCES "rootcategory"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "parentcategory_rels" ADD CONSTRAINT "parentcategory_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_rootcategory_id_rootcategory_id_fk" FOREIGN KEY ("rootcategory_id") REFERENCES "rootcategory"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parentcategory_id_parentcategory_id_fk" FOREIGN KEY ("parentcategory_id") REFERENCES "parentcategory"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_customers_id_customers_id_fk" FOREIGN KEY ("customers_id") REFERENCES "customers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users";
DROP TABLE "pages";
DROP TABLE "country";
DROP TABLE "country_rels";
DROP TABLE "customers";
DROP TABLE "state";
DROP TABLE "state_rels";
DROP TABLE "city";
DROP TABLE "city_rels";
DROP TABLE "rootcategory";
DROP TABLE "rootcategory_rels";
DROP TABLE "parentcategory";
DROP TABLE "parentcategory_rels";
DROP TABLE "products";
DROP TABLE "products_rels";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`);

};
