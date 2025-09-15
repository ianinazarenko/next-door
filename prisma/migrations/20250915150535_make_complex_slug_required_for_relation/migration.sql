/*
  Warnings:

  - You are about to drop the column `complexId` on the `Post` table. All the data in the column will be lost.
  - Made the column `complexSlug` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_complexId_fkey";

-- DropIndex
DROP INDEX "public"."Post_complexId_idx";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "complexId",
ALTER COLUMN "complexSlug" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_complexSlug_fkey" FOREIGN KEY ("complexSlug") REFERENCES "public"."Complex"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
