/*
  Warnings:

  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `MetaSEO` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MetaSEO" DROP CONSTRAINT "MetaSEO_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "image",
ADD COLUMN     "metaSEOId" TEXT;

-- AlterTable
ALTER TABLE "MetaSEO" DROP COLUMN "categoryId";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_metaSEOId_fkey" FOREIGN KEY ("metaSEOId") REFERENCES "MetaSEO"("id") ON DELETE SET NULL ON UPDATE CASCADE;
