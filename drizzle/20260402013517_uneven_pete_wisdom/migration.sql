ALTER TABLE "communities" ADD COLUMN "created_by" text NOT NULL;--> statement-breakpoint
ALTER TABLE "communities" ALTER COLUMN "description" SET DATA TYPE text USING "description"::text;--> statement-breakpoint
ALTER TABLE "communities" ALTER COLUMN "description" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "communities" ALTER COLUMN "description" SET NOT NULL;