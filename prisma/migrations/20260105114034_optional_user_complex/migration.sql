-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_complexId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "complexId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_complexId_fkey" FOREIGN KEY ("complexId") REFERENCES "public"."Complex"("id") ON DELETE SET NULL ON UPDATE CASCADE;
