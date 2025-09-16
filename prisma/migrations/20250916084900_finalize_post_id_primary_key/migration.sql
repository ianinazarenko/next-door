-- Step 1: Drop the old foreign key from Comment to Post.
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_postOldId_fkey";

-- Step 2: Drop the old primary key from Post (which is on the 'oldId' column).
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_pkey";

-- Step 3: Add the new primary key to Post using the integer 'id' column.
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- Step 4: Make the new 'postId' column in Comment non-nullable.
-- This is safe because we populated it in the previous migration.
ALTER TABLE "public"."Comment" ALTER COLUMN "postId" SET NOT NULL;

-- Step 5: Add the new foreign key from Comment to Post using the integer columns.
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 6: Drop the old 'postOldId' column from Comment as it's no longer needed.
ALTER TABLE "public"."Comment" DROP COLUMN "postOldId";

-- Step 7: Create an index on the new postId column for performance.
CREATE INDEX "Comment_postId_idx" ON "public"."Comment"("postId");
