-- Add the new integer 'id' column to the Post table.
-- SERIAL is PostgreSQL's way of creating an auto-incrementing integer.
-- This will automatically populate the 'id' for all existing posts.
ALTER TABLE "public"."Post" ADD COLUMN "id" SERIAL NOT NULL;

-- Add a unique constraint to the new 'id' column.
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_id_key" UNIQUE ("id");

-- Add the new, nullable integer 'postId' column to the Comment table.
ALTER TABLE "public"."Comment" ADD COLUMN "postId" INTEGER;

-- Data Migration: Populate the new Comment.postId column.
-- This statement joins the Comment and Post tables on their original string IDs (`postOldId` and `oldId`)
-- and copies the new integer `id` from the Post table into the Comment's new `postId` field.
UPDATE "public"."Comment"
SET "postId" = "public"."Post"."id"
FROM "public"."Post"
WHERE "public"."Comment"."postOldId" = "public"."Post"."oldId";
