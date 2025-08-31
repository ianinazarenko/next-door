-- AlterTable
ALTER TABLE "public"."Complex" ADD COLUMN     "managementCompanyId" TEXT;

-- CreateTable
CREATE TABLE "public"."ManagementCompany" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "ManagementCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UsefulPhone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complexId" TEXT NOT NULL,

    CONSTRAINT "UsefulPhone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ManagementCompany_name_key" ON "public"."ManagementCompany"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ManagementCompany_slug_key" ON "public"."ManagementCompany"("slug");

-- AddForeignKey
ALTER TABLE "public"."Complex" ADD CONSTRAINT "Complex_managementCompanyId_fkey" FOREIGN KEY ("managementCompanyId") REFERENCES "public"."ManagementCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UsefulPhone" ADD CONSTRAINT "UsefulPhone_complexId_fkey" FOREIGN KEY ("complexId") REFERENCES "public"."Complex"("id") ON DELETE CASCADE ON UPDATE CASCADE;
