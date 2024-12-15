ALTER TABLE "facility" ALTER COLUMN "city" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "facility" ALTER COLUMN "address" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "facility" ALTER COLUMN "state" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "facility" ALTER COLUMN "zipCode" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "facility" ALTER COLUMN "phone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "facility" ALTER COLUMN "photoUrl" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "facility" ADD COLUMN "type" varchar(255);