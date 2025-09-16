-- This migration now only contains the command to drop the oldId column, as the unique constraint did not exist.
ALTER TABLE "public"."Post" DROP COLUMN "oldId";
