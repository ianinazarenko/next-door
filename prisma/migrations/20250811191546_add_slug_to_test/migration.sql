/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Test` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Test" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Test_slug_key" ON "public"."Test"("slug");
