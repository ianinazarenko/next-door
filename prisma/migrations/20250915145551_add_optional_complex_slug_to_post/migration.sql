-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "complexSlug" TEXT;

-- CreateIndex
CREATE INDEX "Post_complexSlug_idx" ON "public"."Post"("complexSlug");
