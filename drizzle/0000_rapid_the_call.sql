CREATE TABLE "facility" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "facility_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"city" varchar(255),
	"address" varchar(512),
	"state" varchar(255),
	"zipCode" varchar(128),
	"phone" varchar(128),
);
