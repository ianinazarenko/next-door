-- Step 1: Drop the existing foreign key constraint from the Comment table.
-- Prisma's default naming convention is TableName_columnName_fkey.
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- Step 2: Rename the foreign key column in the Comment table.
ALTER TABLE "public"."Comment" RENAME COLUMN "postId" TO "postOldId";

-- Step 3: Rename the primary key column in the Post table.
ALTER TABLE "public"."Post" RENAME COLUMN "id" TO "oldId";

-- Step 4: Re-create the foreign key constraint with the new column names.
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_postOldId_fkey" FOREIGN KEY ("postOldId") REFERENCES "public"."Post"("oldId") ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 5: Rename the index on the Comment table's foreign key column.
-- Prisma's default naming is TableName_columnName_idx.
ALTER INDEX "public"."Comment_postId_idx" RENAME TO "Comment_postOldId_idx";
